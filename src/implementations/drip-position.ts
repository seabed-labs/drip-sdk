import { Address, BN, Program, Provider } from '@project-serum/anchor';
import { PublicKey, Transaction } from '@solana/web3.js';
import {
  createAssociatedTokenAccountInstruction,
  getAccount,
  TokenAccountNotFoundError,
  TokenInvalidAccountOwnerError,
} from '@solana/spl-token';
import { Configs } from '../config';
import { DcaVault } from '../idl/type';
import { DripPosition } from '../interfaces';
import { Network } from '../models';
import DcaVaultIDL from '../idl/idl.json';
import { toPubkey } from '../utils';
import {
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

export class DripPositionImpl implements DripPosition {
  private readonly vaultProgram: Program<DcaVault>;
  private readonly positionPubkey: PublicKey;

  private constructor(
    private readonly provider: Provider,
    private readonly network: Network,
    positionPubkey: Address
  ) {
    const config = Configs[network];
    this.vaultProgram = new Program(DcaVaultIDL as DcaVault, config.vaultProgramId, provider);
    this.positionPubkey = toPubkey(positionPubkey);
  }

  public static async fromPosition(
    positionPubkey: Address,
    provider: Provider,
    network: Network
  ): Promise<DripPositionImpl> {
    const config = Configs[network];
    const vaultProgram = new Program(DcaVaultIDL as DcaVault, config.vaultProgramId, provider);

    const position = await vaultProgram.account.position.fetchNullable(positionPubkey);
    if (!position) {
      throw new PositionDoesNotExistError(toPubkey(positionPubkey));
    }

    return new DripPositionImpl(provider, network, positionPubkey);
  }

  public static async fromPositionNftMint(
    positionNftMintPubkey: Address,
    provider: Provider,
    network: Network
  ): Promise<DripPositionImpl> {
    const config = Configs[network];

    const positionPubkey = findVaultPositionPubkey(config.vaultProgramId, {
      positionNftMint: positionNftMintPubkey,
    });

    return new DripPositionImpl(provider, network, positionPubkey);
  }

  public async getWithdrawBPreview(): Promise<WithdrawBPreview> {
    const position = await this.vaultProgram.account.position.fetch(this.positionPubkey);
    const dcaStartPeriodId = position.dcaPeriodIdBeforeDeposit;
    const dcaEndPeriodId = position.dcaPeriodIdBeforeDeposit.add(position.numberOfSwaps);

    const vault = await this.vaultProgram.account.vault.fetch(position.vault);
    const vaultProtoConfig = await this.vaultProgram.account.vaultProtoConfig.fetch(
      vault.protoConfig
    );
    const currentVaultPeriodId = vault.periodId;

    const periodIdI = dcaStartPeriodId;
    const periodIdJ = BN.min(dcaEndPeriodId, currentVaultPeriodId);

    const periodIdIPubkey = findVaultPeriodPubkey(this.vaultProgram.programId, {
      vault: position.vault,
      periodId: periodIdI,
    });

    const periodIdJPubkey = findVaultPeriodPubkey(this.vaultProgram.programId, {
      vault: position.vault,
      periodId: periodIdI,
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
      vault.periodicDripAmount,
      new BN(vault.triggerDcaSpread)
    );

    const withdrawableTokenBAmountBeforeFees = maxWithdrawableTokenBAmount.sub(
      position.withdrawnTokenBAmount
    );

    const withdrawalFees = withdrawableTokenBAmountBeforeFees
      .muln(vaultProtoConfig.baseWithdrawalSpread)
      .divn(1e4);

    const withdrawableTokenBAmount = withdrawableTokenBAmountBeforeFees.sub(withdrawalFees);

    return {
      tokenBAmountBeingWithdrawn: withdrawableTokenBAmount,
    };
  }

  public async getWithdrawBTx(): Promise<Transaction> {
    const position = await this.vaultProgram.account.position.fetch(this.positionPubkey);
    const dcaStartPeriodId = position.dcaPeriodIdBeforeDeposit;
    const dcaEndPeriodId = position.dcaPeriodIdBeforeDeposit.add(position.numberOfSwaps);

    const vault = await this.vaultProgram.account.vault.fetch(position.vault);
    const vaultProtoConfig = await this.vaultProgram.account.vaultProtoConfig.fetch(
      vault.protoConfig
    );
    const currentVaultPeriodId = vault.periodId;

    const periodIdI = dcaStartPeriodId;
    const periodIdJ = BN.min(dcaEndPeriodId, currentVaultPeriodId);

    const periodIdIPubkey = findVaultPeriodPubkey(this.vaultProgram.programId, {
      vault: position.vault,
      periodId: periodIdI,
    });

    const periodIdJPubkey = findVaultPeriodPubkey(this.vaultProgram.programId, {
      vault: position.vault,
      periodId: periodIdI,
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

    tx.add(
      await this.vaultProgram.methods
        .withdrawB()
        .accounts({
          vault: position.vault,
          vaultProtoConfig: vault.protoConfig,
          vaultPeriodI: periodIdIPubkey,
          vaultPeriodJ: periodIdJPubkey,
          userPosition: this.positionPubkey,
          userPositionNftAccount,
          vaultTokenBAccount: vault.tokenBAccount,
          userTokenBAccount: userTokenBAccountPubkey,
          vaultTreasuryTokenBAccount: vault.treasuryTokenBAccount,
          userPositionNftMint: position.positionAuthority,
          tokenBMint: vault.tokenBMint,
          withdrawer: this.provider.wallet.publicKey,
          tokenProgram: TOKEN_PROGRAM_ID,
          associatedTokenProgram: ASSOCIATED_TOKEN_PROGRAM_ID,
        })
        .instruction()
    );

    return tx;
  }

  getClosePositionPreview(): Promise<ClosePositionPreview> {
    throw new Error('Method not implemented.');
  }

  getClosePositionTx(): Promise<Transaction> {
    throw new Error('Method not implemented.');
  }
}
