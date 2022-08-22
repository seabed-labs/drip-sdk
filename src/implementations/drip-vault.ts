import { Address, BN, Program, AnchorProvider } from '@project-serum/anchor';
import { Configs } from '../config';
import { Drip } from '../idl/type';
import { DripVault } from '../interfaces';
import { Network } from '../models';
import DripIDL from '../idl/idl.json';
import {
  Keypair,
  PublicKey,
  SystemProgram,
  SYSVAR_RENT_PUBKEY,
  Transaction,
} from '@solana/web3.js';
import {
  DepositParams,
  InitVaultPeriodParams,
  isDripCyclesParam,
  expiryToNumberOfSwaps,
} from '../interfaces/drip-vault/params';
import { DepositPreview, isDepositPreview } from '../interfaces/drip-vault/previews';
import {
  getCreateWSolAtaInstructions,
  getUnwrapSolInstructions,
  getWrapSolInstructions,
  isSol,
  toPubkey,
} from '../utils';
import {
  findMPLTokenMetadataAccount,
  findVaultPeriodPubkey,
  findVaultPositionPubkey,
  findVaultPubkey,
} from '../helpers';
import { VaultDoesNotExistError, VaultPeriodAlreadyExistsError } from '../errors';
import { BroadcastTransactionWithMetadata, TransactionWithMetadata } from '../types';
import {
  ASSOCIATED_TOKEN_PROGRAM_ID,
  createApproveCheckedInstruction,
  getAssociatedTokenAddress,
  getMint,
  TOKEN_PROGRAM_ID,
} from '@solana/spl-token';
import { makeExplorerUrl } from '../utils/transaction';
import { MPL_TOKEN_METADATA_PROGRAM } from '../utils/constants';

export class DripVaultImpl implements DripVault {
  private readonly vaultProgram: Program<Drip>;
  private readonly vaultPubkey: PublicKey;

  // For now we can do this, but we should transition to taking in a read-only connection here instead and
  // letting users only pass in signer at the end if they choose to else sign and broadcast the tx themselves
  // We should also decouple anchor from this to make it an actual SDK
  private constructor(
    private readonly provider: AnchorProvider,
    private readonly network: Network,
    vaultPubkey: Address
  ) {
    const config = Configs[network];
    this.vaultProgram = new Program(DripIDL as unknown as Drip, config.vaultProgramId, provider);
    this.vaultPubkey = toPubkey(vaultPubkey);
  }

  public static async fromVaultSeeds(
    vaultSeeds: { protoConfig: Address; tokenAMint: Address; tokenBMint: Address },
    provider: AnchorProvider,
    network: Network
  ): Promise<DripVaultImpl> {
    const vaultPubkey = findVaultPubkey(Configs[network].vaultProgramId, vaultSeeds);
    const config = Configs[network];
    const vaultProgram = new Program(DripIDL as unknown as Drip, config.vaultProgramId, provider);

    const vault = await vaultProgram.account.vault.fetchNullable(vaultPubkey);
    if (!vault) {
      throw new VaultDoesNotExistError(vaultPubkey);
    }

    return new DripVaultImpl(provider, network, vaultPubkey);
  }

  public static async fromVaultPubkey(
    vaultPubkey: Address,
    provider: AnchorProvider,
    network: Network
  ): Promise<DripVaultImpl> {
    const config = Configs[network];
    const vaultProgram = new Program(DripIDL as unknown as Drip, config.vaultProgramId, provider);

    const vault = await vaultProgram.account.vault.fetchNullable(vaultPubkey);
    if (!vault) {
      throw new VaultDoesNotExistError(toPubkey(vaultPubkey));
    }

    return new DripVaultImpl(provider, network, vaultPubkey);
  }

  public async getDepositPreview(params: DepositParams): Promise<DepositPreview> {
    const vault = await this.vaultProgram.account.vault.fetch(this.vaultPubkey);
    const vaultProtoConfig = await this.vaultProgram.account.vaultProtoConfig.fetch(
      vault.protoConfig
    );

    const numberOfSwaps = isDripCyclesParam(params.dripParams)
      ? params.dripParams.numberOfSwaps
      : expiryToNumberOfSwaps(params.dripParams.expiry, vaultProtoConfig.granularity.toNumber());

    const dripAmount = params.amount.divn(numberOfSwaps);

    return {
      vault: this.vaultPubkey,
      amount: params.amount,
      dripAmount,
      numberOfSwaps,
    };
  }

  private async getDepositCommon(params: DepositParams | DepositPreview): Promise<{
    tokenADepositAmount: BN;
    numberOfSwaps: BN;
    vaultPeriodEnd: PublicKey;
    userPosition: PublicKey;
    tokenAMint: PublicKey;
    userPositionNftMint: PublicKey;
    vaultTokenAAccount: PublicKey;
    userTokenAAccount: PublicKey;
    userPositionNftAccount: PublicKey;
    positionNftMint: Keypair;
    position: PublicKey;
    tx: Transaction;
  }> {
    const preview = isDepositPreview(params) ? params : await this.getDepositPreview(params);
    const vault = await this.vaultProgram.account.vault.fetchNullable(preview.vault);

    if (!vault) {
      throw new VaultDoesNotExistError(toPubkey(preview.vault));
    }

    const currentPeriodId = vault.lastDripPeriod;
    const depositExpiryPeriodId = vault.lastDripPeriod.addn(preview.numberOfSwaps);

    const currentPeriodPubkey = findVaultPeriodPubkey(this.vaultProgram.programId, {
      vault: preview.vault,
      periodId: currentPeriodId,
    });

    const depositExpiryPeriodPubkey = findVaultPeriodPubkey(this.vaultProgram.programId, {
      vault: preview.vault,
      periodId: depositExpiryPeriodId,
    });

    const [currentPeriod, depositExpiryPeriod] = await Promise.all([
      this.vaultProgram.account.vaultPeriod.fetchNullable(currentPeriodPubkey),
      this.vaultProgram.account.vaultPeriod.fetchNullable(depositExpiryPeriodPubkey),
    ]);

    let tx = new Transaction({
      recentBlockhash: (await this.provider.connection.getLatestBlockhash()).blockhash,
      feePayer: this.provider.wallet.publicKey,
    });

    const tokenToDeposit = vault.tokenAMint;
    if (isSol(tokenToDeposit)) {
      const wrapSolIxs = await getWrapSolInstructions(
        this.provider.connection,
        this.provider.wallet.publicKey,
        this.provider.wallet.publicKey,
        params.amount
      );

      if (wrapSolIxs.length > 0) {
        tx = tx.add(...wrapSolIxs);
      }
    }

    if (!currentPeriod) {
      const { tx: initCurrentPeriodTx } = await this.getInitVaultPeriodTx({
        periodId: currentPeriodId,
      });
      tx = tx.add(...initCurrentPeriodTx.instructions);
    }

    if (!depositExpiryPeriod) {
      const { tx: initExpiryPeriodTx } = await this.getInitVaultPeriodTx({
        periodId: depositExpiryPeriodId,
      });
      tx = tx.add(...initExpiryPeriodTx.instructions);
    }

    const positionMintKeypair = Keypair.generate();
    const positionPubkey = findVaultPositionPubkey(this.vaultProgram.programId, {
      positionNftMint: positionMintKeypair.publicKey,
    });

    const [userTokenAAccount, userPositionNftAccount] = await Promise.all([
      // TODO: For now, we'll assume the caller has an ATA with enough Token A for the deposit
      getAssociatedTokenAddress(
        toPubkey(vault.tokenAMint),
        this.provider.wallet.publicKey,
        true,
        TOKEN_PROGRAM_ID,
        ASSOCIATED_TOKEN_PROGRAM_ID
      ),
      getAssociatedTokenAddress(
        positionMintKeypair.publicKey,
        this.provider.wallet.publicKey,
        true,
        TOKEN_PROGRAM_ID,
        ASSOCIATED_TOKEN_PROGRAM_ID
      ),
    ]);

    const tokenAMintInfo = await getMint(this.vaultProgram.provider.connection, vault.tokenAMint);
    tx = tx.add(
      createApproveCheckedInstruction(
        userTokenAAccount,
        vault.tokenAMint,
        this.vaultPubkey,
        this.provider.wallet.publicKey,
        BigInt(params.amount.toString()),
        tokenAMintInfo.decimals
      )
    );

    return {
      tokenADepositAmount: preview.amount,
      numberOfSwaps: new BN(preview.numberOfSwaps),
      vaultPeriodEnd: depositExpiryPeriodPubkey,
      userPosition: positionPubkey,
      tokenAMint: vault.tokenAMint,
      userPositionNftMint: positionMintKeypair.publicKey,
      vaultTokenAAccount: vault.tokenAAccount,
      userTokenAAccount,
      userPositionNftAccount,
      positionNftMint: positionMintKeypair,
      position: positionPubkey,
      tx,
    };
  }

  public async getDepositTx(
    params: DepositParams | DepositPreview
  ): Promise<TransactionWithMetadata<{ positionNftMint: Keypair; position: PublicKey }>> {
    let {
      tokenADepositAmount,
      numberOfSwaps,
      vaultPeriodEnd,
      userPosition,
      userPositionNftMint,
      vaultTokenAAccount,
      userTokenAAccount,
      positionNftMint,
      userPositionNftAccount,
      position,
      tx,
    } = await this.getDepositCommon(params);
    const depositIx = await this.vaultProgram.methods
      .deposit({
        tokenADepositAmount,
        numberOfSwaps,
      })
      .accounts({
        vault: this.vaultPubkey,
        vaultPeriodEnd,
        userPosition,
        userPositionNftMint,
        vaultTokenAAccount,
        userTokenAAccount,
        userPositionNftAccount,
        depositor: this.provider.wallet.publicKey,
        tokenProgram: TOKEN_PROGRAM_ID,
        associatedTokenProgram: ASSOCIATED_TOKEN_PROGRAM_ID,
        rent: SYSVAR_RENT_PUBKEY,
        systemProgram: SystemProgram.programId,
      })
      .instruction();

    tx = tx.add(depositIx);

    return {
      tx,
      metadata: {
        positionNftMint,
        position,
      },
    };
  }

  async deposit(
    params: DepositParams | DepositPreview
  ): Promise<BroadcastTransactionWithMetadata<{ positionNftMint: Keypair; position: PublicKey }>> {
    const { tx, metadata } = await this.getDepositTx(params);
    const txHash = await this.provider.sendAndConfirm(tx, [metadata.positionNftMint]);

    return {
      id: txHash,
      explorer: makeExplorerUrl(txHash, this.network),
      metadata,
    };
  }

  async getDepositWithMetadataTx(params: DepositParams | DepositPreview): Promise<
    TransactionWithMetadata<{
      positionNftMint: Keypair;
      position: PublicKey;
      positionMetadataAccount: PublicKey;
    }>
  > {
    let {
      tokenADepositAmount,
      numberOfSwaps,
      vaultPeriodEnd,
      userPosition,
      userPositionNftMint,
      vaultTokenAAccount,
      userTokenAAccount,
      positionNftMint,
      tokenAMint,
      userPositionNftAccount,
      position,
      tx,
    } = await this.getDepositCommon(params);
    const positionMetadataAccount = findMPLTokenMetadataAccount(MPL_TOKEN_METADATA_PROGRAM, {
      mint: userPositionNftMint,
    });
    const depositIx = await this.vaultProgram.methods
      .depositWithMetadata({
        tokenADepositAmount,
        numberOfSwaps,
      })
      .accounts({
        vault: this.vaultPubkey,
        vaultPeriodEnd,
        tokenAMint,
        userPosition,
        userPositionNftMint,
        vaultTokenAAccount,
        userTokenAAccount,
        userPositionNftAccount,
        positionMetadataAccount,
        depositor: this.provider.wallet.publicKey,
        metadataProgram: MPL_TOKEN_METADATA_PROGRAM,
        tokenProgram: TOKEN_PROGRAM_ID,
        associatedTokenProgram: ASSOCIATED_TOKEN_PROGRAM_ID,
        rent: SYSVAR_RENT_PUBKEY,
        systemProgram: SystemProgram.programId,
      })
      .instruction();

    tx = tx.add(depositIx);

    return {
      tx,
      metadata: {
        positionNftMint,
        positionMetadataAccount,
        position,
      },
    };
  }

  async depositWithMetadata(params: DepositParams | DepositPreview): Promise<
    BroadcastTransactionWithMetadata<{
      positionNftMint: Keypair;
      position: PublicKey;
      positionMetadataAccount: PublicKey;
    }>
  > {
    const { tx, metadata } = await this.getDepositWithMetadataTx(params);
    const txHash = await this.provider.sendAndConfirm(tx, [metadata.positionNftMint]);
    return {
      id: txHash,
      explorer: makeExplorerUrl(txHash, this.network),
      metadata,
    };
  }

  public async getInitVaultPeriodTx(
    params: InitVaultPeriodParams
  ): Promise<TransactionWithMetadata<{ vaultPeriodPubkey: PublicKey }>> {
    const { periodId } = params;

    const vault = await this.vaultProgram.account.vault.fetch(this.vaultPubkey);

    const vaultPeriodPubkey = findVaultPeriodPubkey(this.vaultProgram.programId, {
      vault: this.vaultPubkey,
      periodId,
    });

    const vaultPeriod = await this.vaultProgram.account.vaultPeriod.fetchNullable(
      vaultPeriodPubkey
    );

    if (vaultPeriod) {
      throw new VaultPeriodAlreadyExistsError(vaultPeriodPubkey);
    }

    const tx = await this.vaultProgram.methods
      .initVaultPeriod({
        periodId,
      })
      .accounts({
        vaultPeriod: vaultPeriodPubkey,
        vault: this.vaultPubkey,
        tokenAMint: vault.tokenAMint,
        tokenBMint: vault.tokenBMint,
        vaultProtoConfig: vault.protoConfig,
        creator: this.provider.wallet.publicKey,
        systemProgram: SystemProgram.programId,
      })
      .transaction();

    return {
      tx,
      metadata: {
        vaultPeriodPubkey,
      },
    };
  }

  async initVaultPeriod(params: InitVaultPeriodParams): Promise<
    BroadcastTransactionWithMetadata<{
      vaultPeriodPubkey: PublicKey;
    }>
  > {
    const { tx, metadata } = await this.getInitVaultPeriodTx(params);
    const txHash = await this.provider.sendAndConfirm(tx);

    return {
      id: txHash,
      explorer: makeExplorerUrl(txHash, this.network),
      metadata,
    };
  }
}
