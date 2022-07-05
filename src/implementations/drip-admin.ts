import { Program, AnchorProvider } from '@project-serum/anchor';
import {
  Keypair,
  PublicKey,
  SystemProgram,
  SYSVAR_RENT_PUBKEY,
  Transaction,
} from '@solana/web3.js';
import { Configs } from '../config';
import { Drip } from '../idl/type';
import DcaVaultIDL from '../idl/idl.json';
import { DripAdmin } from '../interfaces';
import {
  InitVaultProtoConfigParams,
  InitVaultParams,
  InitVaultPeriodParams,
  InitTokenSwapParams,
} from '../interfaces/drip-admin/params';
import { Network } from '../models';
import {
  InitVaultProtoConfigPreview,
  isInitVaultProtoConfigPreview,
} from '../interfaces/drip-admin/previews';
import { BroadcastTransactionWithMetadata, TransactionWithMetadata } from '../types';
import { BN } from 'bn.js';
import { ZERO } from '../constants';
import { toPubkey } from '../utils';
import { VaultAlreadyExistsError } from '../errors';
import {
  ASSOCIATED_TOKEN_PROGRAM_ID,
  createInitializeMintInstruction,
  createMint,
  getAssociatedTokenAddress,
  getMinimumBalanceForRentExemptMint,
  MINT_SIZE,
  TOKEN_PROGRAM_ID,
} from '@solana/spl-token';
import { findTokenSwapPubkey, findVaultPeriodPubkey, findVaultPubkey } from '../helpers';
import { makeExplorerUrl } from '../utils/transaction';
import { TOKEN_SWAP_PROGRAM_ID } from '@solana/spl-token-swap';

export class DripAdminImpl implements DripAdmin {
  private readonly vaultProgram: Program<Drip>;

  // For now we can do this, but we should transition to taking in a read-only connection here instead and
  // letting users only pass in signer at the end if they choose to else sign and broadcast the tx themselves
  // We should also decouple anchor from this to make it an actual SDK
  constructor(private readonly provider: AnchorProvider, private readonly network: Network) {
    const config = Configs[network];
    this.vaultProgram = new Program(DcaVaultIDL as Drip, config.vaultProgramId, provider);
  }

  // async getInitTokenSwapTx(
  //   params: InitTokenSwapParams
  // ): Promise<TransactionWithMetadata<{ swapPubkey: PublicKey }>> {
  //   const lamports = await getMinimumBalanceForRentExemptMint(this.provider.connection);

  //   const swapLpTokenMint = Keypair.generate();
  //   const createSwapLpTokenMintIx = SystemProgram.createAccount({
  //     fromPubkey: this.provider.wallet.publicKey,
  //     newAccountPubkey: swapLpTokenMint.publicKey,
  //     space: MINT_SIZE,
  //     lamports,
  //     programId: TOKEN_PROGRAM_ID,
  //   });
  //   const initSwapLpTokenMintIx = createInitializeMintInstruction(
  //     swapLpTokenMint.publicKey,
  //     params.lpTokenDecimals ?? 6,
  //     this.provider.wallet.publicKey,
  //     this.provider.wallet.publicKey,
  //     this.provider.wallet.publicKey
  //   );

  //   const swapLpTokenAccount = Keypair.generate();
  //   const swapLpTokenAccountIx = SystemProgram.createAccount({
  //     fromPubkey: this.provider.wallet.publicKey,
  //     newAccountPubkey: swapLpTokenAccount.publicKey,
  //     space: MINT_SIZE,
  //     lamports,
  //     programId: TOKEN_PROGRAM_ID,
  //   });
  
  //   params.tokenA.
  //   const swapLpTokenFeeAccount = Keypair.generate();
  //   const swapLpTokenFeeAccountIx = SystemProgram.createAccount({
  //     fromPubkey: this.provider.wallet.publicKey,
  //     newAccountPubkey: swapLpTokenAccount.publicKey,
  //     space: MINT_SIZE,
  //     lamports,
  //     programId: TOKEN_PROGRAM_ID,
  //   });

  //   const tokenSwapKeypair = Keypair.generate();

  //   const swapAuthorityPDA = findTokenSwapPubkey(TOKEN_SWAP_PROGRAM_ID, {
  //     swap: tokenSwapKeypair.publicKey,
  //   });
  //   const blah = new Transaction().add(createSwapLpTokenMintIx, initSwapLpTokenMintIx);

  //   // new Transaction().add(
  //   //   SystemProgram.createAccount({
  //   //     fromPubkey: payer.publicKey,
  //   //     newAccountPubkey: keypair.publicKey,
  //   //     space: MINT_SIZE,
  //   //     lamports,
  //   //     programId,
  //   //   }),
  //   //   createInitializeMintInstruction(
  //   //     keypair.publicKey,
  //   //     decimals,
  //   //     mintAuthority,
  //   //     freezeAuthority,
  //   //     programId
  //   //   )
  //   // );

  //   throw new Error('Method not implemented.');
  // }

  // initTokenSwap(
  //   params: InitTokenSwapParams
  // ): Promise<BroadcastTransactionWithMetadata<{ swapPubkey: PublicKey }>> {
  //   const swapLpToken = await createMint(
  //     this.provider.connection,
  //     this.provider.connection,
  //     this.provider.wallet.publicKey,
  //     this.provider.wallet.publicKey,
  //     params.lpTokenDecimals ?? 6
  //   );
  //   throw new Error('Method not implemented.');
  // }

  public getInitVaultProtoConfigPreview(
    params: InitVaultProtoConfigParams
  ): InitVaultProtoConfigPreview {
    const vaultProtoConfigKeypair = Keypair.generate();

    return {
      ...params,
      vaultProtoConfigKeypair,
    };
  }

  public async getInitVaultProtoConfigTx(
    params: InitVaultProtoConfigParams | InitVaultProtoConfigPreview
  ): Promise<TransactionWithMetadata<{ vaultProtoConfigPubkey: PublicKey }>> {
    const { granularity, triggerDcaSpread, baseWithdrawalSpread } = params;
    const vaultProtoConfigKeypair = isInitVaultProtoConfigPreview(params)
      ? params.vaultProtoConfigKeypair
      : Keypair.generate();

    const tx = await this.vaultProgram.methods
      .initVaultProtoConfig({
        granularity: new BN(granularity.toString()),
        triggerDcaSpread,
        baseWithdrawalSpread,
      })
      .accounts({
        vaultProtoConfig: vaultProtoConfigKeypair.publicKey,
        creator: this.provider.wallet.publicKey,
        systemProgram: SystemProgram.programId,
      })
      .signers([vaultProtoConfigKeypair])
      .transaction();

    return {
      tx,
      metadata: {
        vaultProtoConfigPubkey: vaultProtoConfigKeypair.publicKey,
      },
    };
  }

  public async initVaultProtoConfig(
    params: InitVaultProtoConfigParams | InitVaultProtoConfigPreview
  ): Promise<BroadcastTransactionWithMetadata<{ vaultProtoConfigPubkey: PublicKey }>> {
    const { tx, metadata } = await this.getInitVaultProtoConfigTx(params);
    const txHash = await this.provider.sendAndConfirm(tx);

    return {
      id: txHash,
      explorer: makeExplorerUrl(txHash, this.network),
      metadata,
    };
  }

  public async getInitVaultPeriodTx(
    params: InitVaultPeriodParams
  ): Promise<TransactionWithMetadata<{ vaultPeriodPubkey: PublicKey }>> {
    const vaultPeriodPDA = findVaultPeriodPubkey(this.vaultProgram.programId, {
      vault: params.vault.toString(),
      periodId: params.periodId,
    });
    const initVaultPeriodIx = await await this.vaultProgram.methods
      .initVaultPeriod({
        periodId: params.periodId,
      })
      .accounts({
        vault: params.vault.toString(),
        vaultPeriod: vaultPeriodPDA.toString(),
        vaultProtoConfig: params.vaultProtoConfig.toString(),
        tokenAMint: params.tokenAMint.toString(),
        tokenBMint: params.tokenBMint.toString(),
        creator: this.provider.wallet.publicKey.toString(),
        systemProgram: this.vaultProgram.programId.toString(),
      })
      .instruction();

    const tx = new Transaction({
      recentBlockhash: (await this.provider.connection.getLatestBlockhash()).blockhash,
      feePayer: this.provider.wallet.publicKey,
    }).add(initVaultPeriodIx);
    return {
      tx,
      metadata: {
        vaultPeriodPubkey: vaultPeriodPDA,
      },
    };
  }

  public async initVaultPeriod(
    params: InitVaultPeriodParams
  ): Promise<BroadcastTransactionWithMetadata<{ vaultPeriodPubkey: PublicKey }>> {
    const { tx, metadata } = await this.getInitVaultPeriodTx(params);
    const txHash = await this.provider.sendAndConfirm(tx);

    return {
      id: txHash,
      explorer: makeExplorerUrl(txHash, this.network),
      metadata,
    };
  }

  public async getInitVaultTx(
    params: InitVaultParams
  ): Promise<TransactionWithMetadata<{ vaultPubkey: PublicKey }>> {
    const vaultPubkey = findVaultPubkey(this.vaultProgram.programId, params);
    const vaultAccount = await this.vaultProgram.account.vault.fetchNullable(vaultPubkey);

    if (vaultAccount) {
      throw new VaultAlreadyExistsError(vaultPubkey);
    }

    // const vaultGenesisPeriodId = ZERO;
    // const vaultGenesisPeriodPubkey = findVaultPeriodPubkey(this.vaultProgram.programId, {
    //   vault: vaultPubkey,
    //   periodId: vaultGenesisPeriodId,
    // });

    // const initVaultPeriodIxPromise = this.vaultProgram.methods
    //   .initVaultPeriod({
    //     periodId: vaultGenesisPeriodId,
    //   })
    //   .accounts({
    //     vaultPeriod: vaultGenesisPeriodPubkey,
    //     vault: vaultPubkey,
    //     tokenAMint: params.tokenAMint,
    //     tokenBMint: params.tokenBMint,
    //     vaultProtoConfig: params.protoConfig,
    //     creator: this.provider.wallet.publicKey,
    //     systemProgram: SystemProgram.programId,
    //   })
    //   .instruction();
    // vault: Address;
    // vaultProtoConfig: Address;
    // tokenAMint: Address;
    // tokenBMint: Address;
    // periodId: BN;
    const initVaultPeriodIxPromise = (
      await this.getInitVaultPeriodTx({
        vault: vaultPubkey,
        vaultProtoConfig: params.protoConfig,
        tokenAMint: params.tokenAMint,
        tokenBMint: params.tokenBMint,
        periodId: ZERO,
      })
    ).tx.instructions[0];

    const [tokenAAccount, tokenBAccount] = await Promise.all([
      getAssociatedTokenAddress(
        toPubkey(params.tokenAMint),
        vaultPubkey,
        true,
        TOKEN_PROGRAM_ID,
        ASSOCIATED_TOKEN_PROGRAM_ID
      ),
      getAssociatedTokenAddress(
        toPubkey(params.tokenBMint),
        vaultPubkey,
        true,
        TOKEN_PROGRAM_ID,
        ASSOCIATED_TOKEN_PROGRAM_ID
      ),
    ]);

    const initVaultIx = await this.vaultProgram.methods
      .initVault({
        whitelistedSwaps: [],
      })
      .accounts({
        vault: vaultPubkey,
        vaultProtoConfig: params.protoConfig,
        tokenAAccount,
        tokenBAccount,
        treasuryTokenBAccount: params.tokenBFeeTreasury,
        tokenAMint: params.tokenAMint,
        tokenBMint: params.tokenBMint,
        creator: this.provider.wallet.publicKey,
        tokenProgram: TOKEN_PROGRAM_ID,
        associatedTokenProgram: ASSOCIATED_TOKEN_PROGRAM_ID,
        systemProgram: SystemProgram.programId,
        rent: SYSVAR_RENT_PUBKEY,
      })
      .instruction();

    const initVaultPeriodIx = await initVaultPeriodIxPromise;

    const tx = new Transaction({
      recentBlockhash: (await this.provider.connection.getLatestBlockhash()).blockhash,
      feePayer: this.provider.wallet.publicKey,
    })
      .add(initVaultIx)
      .add(initVaultPeriodIx);

    return {
      tx,
      metadata: {
        vaultPubkey,
      },
    };
  }

  public async initVault(
    params: InitVaultParams
  ): Promise<BroadcastTransactionWithMetadata<{ vaultPubkey: PublicKey }>> {
    const { tx, metadata } = await this.getInitVaultTx(params);
    const txHash = await this.provider.sendAndConfirm(tx);

    return {
      id: txHash,
      explorer: makeExplorerUrl(txHash, this.network),
      metadata,
    };
  }
}
