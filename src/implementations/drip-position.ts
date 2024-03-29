import { Address, BN, Program, AnchorProvider } from '@project-serum/anchor';
import { PublicKey, SystemProgram, Transaction } from '@solana/web3.js';
import {
  createApproveInstruction,
  createAssociatedTokenAccountInstruction,
  getAccount,
  TokenAccountNotFoundError,
  TokenInvalidAccountOwnerError,
} from '@solana/spl-token';
import { IDL, Drip } from '../idl/drip';
import { DripPosition } from '../interfaces';
import { Network } from '../models';
import { getUnwrapSolInstructions, isSol, toPubkey } from '../utils';
import {
  calculateWithdrawTokenAAmount,
  calculateWithdrawTokenBAmount,
  findVaultPeriodPubkey,
  findVaultPositionPubkey,
} from '../helpers';
import { PositionDoesNotExistError } from '../errors';
import { WithdrawBPreview, ClosePositionPreview } from '../interfaces/drip-position/previews';
import {
  ASSOCIATED_TOKEN_PROGRAM_ID,
  getAssociatedTokenAddress,
  TOKEN_PROGRAM_ID,
} from '@solana/spl-token';
import { BroadcastTransactionWithMetadata, TransactionWithMetadata } from '../types';
import { makeExplorerUrl } from '../utils/transaction';

export class DripPositionImpl implements DripPosition {
  private readonly vaultProgram: Program<Drip>;
  private readonly positionPubkey: PublicKey;

  private constructor(
    private readonly provider: AnchorProvider,
    private readonly network: Network,
    private readonly programId: PublicKey,
    positionPubkey: Address
  ) {
    this.vaultProgram = new Program(IDL, this.programId, provider);
    this.positionPubkey = toPubkey(positionPubkey);
  }

  public static async fromPosition(
    provider: AnchorProvider,
    network: Network,
    programId: Address,
    positionPubkey: Address
  ): Promise<DripPositionImpl> {
    const vaultProgram = new Program(IDL, programId, provider);

    const position = await vaultProgram.account.position.fetchNullable(positionPubkey);
    if (!position) {
      throw new PositionDoesNotExistError(toPubkey(positionPubkey));
    }

    return new DripPositionImpl(provider, network, toPubkey(programId), positionPubkey);
  }

  public static async fromPositionNftMint(
    provider: AnchorProvider,
    network: Network,
    programId: Address,
    positionNftMintPubkey: Address
  ): Promise<DripPositionImpl> {
    const positionPubkey = findVaultPositionPubkey(programId, {
      positionNftMint: positionNftMintPubkey,
    });

    return new DripPositionImpl(provider, network, toPubkey(programId), positionPubkey);
  }

  public async getWithdrawBPreview(): Promise<WithdrawBPreview> {
    const position = await this.vaultProgram.account.position.fetch(this.positionPubkey);
    const dripStartPeriodId = position.dripPeriodIdBeforeDeposit;
    const dripEndPeriodId = position.dripPeriodIdBeforeDeposit.add(position.numberOfSwaps);

    const vault = await this.vaultProgram.account.vault.fetch(position.vault);
    const vaultProtoConfig = await this.vaultProgram.account.vaultProtoConfig.fetch(
      vault.protoConfig
    );
    const currentVaultPeriodId = vault.lastDripPeriod;

    const periodIdI = dripStartPeriodId;
    const periodIdJ = BN.min(dripEndPeriodId, currentVaultPeriodId);

    const periodIdIPubkey = findVaultPeriodPubkey(this.vaultProgram.programId, {
      vault: position.vault,
      periodId: periodIdI,
    });

    const periodIdJPubkey = findVaultPeriodPubkey(this.vaultProgram.programId, {
      vault: position.vault,
      periodId: periodIdJ,
    });

    const [periodI, periodJ] = await Promise.all([
      this.vaultProgram.account.vaultPeriod.fetch(periodIdIPubkey),
      this.vaultProgram.account.vaultPeriod.fetch(periodIdJPubkey),
    ]);

    const maxWithdrawableTokenBAmount = calculateWithdrawTokenBAmount(
      periodIdI,
      periodIdJ,
      periodI.twap,
      periodJ.twap,
      position.periodicDripAmount,
      new BN(vaultProtoConfig.tokenADripTriggerSpread)
    );

    const withdrawableTokenBAmountBeforeFees = maxWithdrawableTokenBAmount.sub(
      position.withdrawnTokenBAmount
    );

    const withdrawalFees = withdrawableTokenBAmountBeforeFees
      .muln(vaultProtoConfig.tokenBWithdrawalSpread)
      .divn(1e4);

    const withdrawableTokenBAmount = withdrawableTokenBAmountBeforeFees.sub(withdrawalFees);

    const userTokenBAccountPubkey = await getAssociatedTokenAddress(
      vault.tokenBMint,
      this.provider.wallet.publicKey,
      true,
      TOKEN_PROGRAM_ID,
      ASSOCIATED_TOKEN_PROGRAM_ID
    );

    return {
      tokenBAmountBeingWithdrawn: withdrawableTokenBAmount,
      withdrawnToTokenAccount: userTokenBAccountPubkey,
    };
  }

  public async getWithdrawBTx(): Promise<
    TransactionWithMetadata<{ withdrawnToTokenAccount: PublicKey }>
  > {
    const position = await this.vaultProgram.account.position.fetch(this.positionPubkey);
    const dripStartPeriodId = position.dripPeriodIdBeforeDeposit;
    const dripEndPeriodId = position.dripPeriodIdBeforeDeposit.add(position.numberOfSwaps);

    const vault = await this.vaultProgram.account.vault.fetch(position.vault);
    const currentVaultPeriodId = vault.lastDripPeriod;

    const periodIdI = dripStartPeriodId;
    const periodIdJ = BN.min(dripEndPeriodId, currentVaultPeriodId);

    const periodIdIPubkey = findVaultPeriodPubkey(this.vaultProgram.programId, {
      vault: position.vault,
      periodId: periodIdI,
    });

    const periodIdJPubkey = findVaultPeriodPubkey(this.vaultProgram.programId, {
      vault: position.vault,
      periodId: periodIdJ,
    });

    const userTokenBAccountPubkey = await getAssociatedTokenAddress(
      vault.tokenBMint,
      this.provider.wallet.publicKey,
      true,
      TOKEN_PROGRAM_ID,
      ASSOCIATED_TOKEN_PROGRAM_ID
    );

    let tx = new Transaction({
      recentBlockhash: (await this.provider.connection.getLatestBlockhash()).blockhash,
      feePayer: this.provider.wallet.publicKey,
    });

    const userTokenBAccount = await getAccount(
      this.provider.connection,
      userTokenBAccountPubkey
    ).catch((e: unknown) => {
      if (e instanceof TokenAccountNotFoundError || e instanceof TokenInvalidAccountOwnerError) {
        return null;
      } else {
        throw e;
      }
    });
    if (!userTokenBAccount) {
      tx = tx.add(
        createAssociatedTokenAccountInstruction(
          this.provider.wallet.publicKey,
          userTokenBAccountPubkey,
          this.provider.wallet.publicKey,
          vault.tokenBMint,
          TOKEN_PROGRAM_ID,
          ASSOCIATED_TOKEN_PROGRAM_ID
        )
      );
    }

    const userPositionNftAccount = await getAssociatedTokenAddress(
      position.positionAuthority,
      this.provider.wallet.publicKey,
      true,
      TOKEN_PROGRAM_ID,
      ASSOCIATED_TOKEN_PROGRAM_ID
    );

    tx = tx.add(
      await this.vaultProgram.methods
        .withdrawB()
        .accounts({
          common: {
            vault: position.vault,
            vaultProtoConfig: vault.protoConfig,
            vaultPeriodI: periodIdIPubkey,
            vaultPeriodJ: periodIdJPubkey,
            userPosition: this.positionPubkey,
            userPositionNftAccount,
            vaultTokenBAccount: vault.tokenBAccount,
            userTokenBAccount: userTokenBAccountPubkey,
            vaultTreasuryTokenBAccount: vault.treasuryTokenBAccount,
            withdrawer: this.provider.wallet.publicKey,
            referrer: position.referrer,
            tokenProgram: TOKEN_PROGRAM_ID,
          },
        })
        .instruction()
    );

    const tokenToWithdraw = vault.tokenBMint;
    if (isSol(tokenToWithdraw)) {
      const unwrapSolIxs = await getUnwrapSolInstructions(
        this.provider.connection,
        this.provider.wallet.publicKey
      );

      if (unwrapSolIxs.length > 0) {
        tx = tx.add(...unwrapSolIxs);
      }
    }

    return {
      tx,
      metadata: {
        withdrawnToTokenAccount: userTokenBAccountPubkey,
      },
    };
  }

  async withdrawB(): Promise<
    BroadcastTransactionWithMetadata<{ withdrawnToTokenAccount: PublicKey }>
  > {
    const { tx, metadata } = await this.getWithdrawBTx();
    const txHash = await this.provider.sendAndConfirm(tx);

    return {
      id: txHash,
      explorer: makeExplorerUrl(txHash, this.network),
      metadata,
    };
  }

  async getClosePositionPreview(): Promise<ClosePositionPreview> {
    const withdrawBPreview = await this.getWithdrawBPreview();
    const position = await this.vaultProgram.account.position.fetch(this.positionPubkey);
    const dripStartPeriodId = position.dripPeriodIdBeforeDeposit;
    const dripEndPeriodId = position.dripPeriodIdBeforeDeposit.add(position.numberOfSwaps);

    const vault = await this.vaultProgram.account.vault.fetch(position.vault);
    const currentVaultPeriodId = vault.lastDripPeriod;

    const periodIdI = dripStartPeriodId;
    const periodIdJ = BN.min(dripEndPeriodId, currentVaultPeriodId);

    const withdrawableTokenAAmount = calculateWithdrawTokenAAmount(
      periodIdI,
      periodIdJ,
      position.numberOfSwaps,
      position.periodicDripAmount
    );

    const withdrawnToTokenAAccount = await getAssociatedTokenAddress(
      vault.tokenAMint,
      this.provider.wallet.publicKey,
      true,
      TOKEN_PROGRAM_ID,
      ASSOCIATED_TOKEN_PROGRAM_ID
    );

    return {
      tokenAAmountBeingWithdrawn: withdrawableTokenAAmount,
      withdrawnToTokenAAccount,
      tokenBAmountBeingWithdrawn: withdrawBPreview.tokenBAmountBeingWithdrawn,
      withdrawnToTokenBAccount: withdrawBPreview.withdrawnToTokenAccount,
    };
  }

  async getClosePositionTx(): Promise<Transaction> {
    const position = await this.vaultProgram.account.position.fetch(this.positionPubkey);
    const dripStartPeriodId = position.dripPeriodIdBeforeDeposit;
    const dripEndPeriodId = position.dripPeriodIdBeforeDeposit.add(position.numberOfSwaps);

    const vault = await this.vaultProgram.account.vault.fetch(position.vault);
    const currentVaultPeriodId = vault.lastDripPeriod;

    const periodIdI = dripStartPeriodId;
    const periodIdJ = BN.min(dripEndPeriodId, currentVaultPeriodId);
    const periodIdK = dripEndPeriodId;

    const periodIdIPubkey = findVaultPeriodPubkey(this.vaultProgram.programId, {
      vault: position.vault,
      periodId: periodIdI,
    });

    const periodIdJPubkey = findVaultPeriodPubkey(this.vaultProgram.programId, {
      vault: position.vault,
      periodId: periodIdJ,
    });

    const periodIdKPubkey = findVaultPeriodPubkey(this.vaultProgram.programId, {
      vault: position.vault,
      periodId: periodIdK,
    });

    const closePositionPreview = await this.getClosePositionPreview();

    let tx = new Transaction({
      recentBlockhash: (await this.provider.connection.getLatestBlockhash()).blockhash,
      feePayer: this.provider.wallet.publicKey,
    });

    const userTokenAAccount = await getAccount(
      this.provider.connection,
      closePositionPreview.withdrawnToTokenAAccount
    ).catch((e: unknown) => {
      if (e instanceof TokenAccountNotFoundError || e instanceof TokenInvalidAccountOwnerError) {
        return null;
      } else {
        throw e;
      }
    });
    if (!userTokenAAccount) {
      tx = tx.add(
        createAssociatedTokenAccountInstruction(
          this.provider.wallet.publicKey,
          closePositionPreview.withdrawnToTokenAAccount,
          this.provider.wallet.publicKey,
          vault.tokenAMint,
          TOKEN_PROGRAM_ID,
          ASSOCIATED_TOKEN_PROGRAM_ID
        )
      );
    }

    const userTokenBAccount = await getAccount(
      this.provider.connection,
      closePositionPreview.withdrawnToTokenBAccount
    ).catch((e: unknown) => {
      if (e instanceof TokenAccountNotFoundError || e instanceof TokenInvalidAccountOwnerError) {
        return null;
      } else {
        throw e;
      }
    });
    if (!userTokenBAccount) {
      tx = tx.add(
        createAssociatedTokenAccountInstruction(
          this.provider.wallet.publicKey,
          closePositionPreview.withdrawnToTokenBAccount,
          this.provider.wallet.publicKey,
          vault.tokenBMint,
          TOKEN_PROGRAM_ID,
          ASSOCIATED_TOKEN_PROGRAM_ID
        )
      );
    }

    const userPositionNftAccount = await getAssociatedTokenAddress(
      position.positionAuthority,
      this.provider.wallet.publicKey,
      true,
      TOKEN_PROGRAM_ID,
      ASSOCIATED_TOKEN_PROGRAM_ID
    );

    tx = tx.add(
      createApproveInstruction(
        userPositionNftAccount,
        position.vault,
        this.provider.wallet.publicKey,
        1
      )
    );

    tx = tx.add(
      await this.vaultProgram.methods
        .closePosition()
        .accounts({
          common: {
            vault: position.vault,
            vaultProtoConfig: vault.protoConfig,
            vaultPeriodI: periodIdIPubkey,
            vaultPeriodJ: periodIdJPubkey,
            userPosition: this.positionPubkey,
            vaultTokenBAccount: vault.tokenBAccount,
            vaultTreasuryTokenBAccount: vault.treasuryTokenBAccount,
            userTokenBAccount: closePositionPreview.withdrawnToTokenBAccount,
            userPositionNftAccount,
            referrer: position.referrer,
            withdrawer: this.provider.wallet.publicKey,
            tokenProgram: TOKEN_PROGRAM_ID,
          },
          vaultPeriodUserExpiry: periodIdKPubkey,
          vaultTokenAAccount: vault.tokenAAccount,
          userTokenAAccount: closePositionPreview.withdrawnToTokenAAccount,
          userPositionNftMint: position.positionAuthority,
        })
        .instruction()
    );

    const withdrawingSol = isSol(vault.tokenAMint) || isSol(vault.tokenBMint);
    if (withdrawingSol) {
      const unwrapSolIxs = await getUnwrapSolInstructions(
        this.provider.connection,
        this.provider.wallet.publicKey
      );

      if (unwrapSolIxs.length > 0) {
        tx = tx.add(...unwrapSolIxs);
      }
    }

    return tx;
  }

  async closePosition(): Promise<BroadcastTransactionWithMetadata<undefined>> {
    const tx = await this.getClosePositionTx();
    const txHash = await this.provider.sendAndConfirm(tx);

    return {
      id: txHash,
      explorer: makeExplorerUrl(txHash, this.network),
      metadata: undefined,
    };
  }
}
