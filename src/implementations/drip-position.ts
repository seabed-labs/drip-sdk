import { Address, BN, Program, Provider } from '@project-serum/anchor';
import { PublicKey, Transaction } from '@solana/web3.js';
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

  getWithdrawBTx(): Promise<Transaction> {
    throw new Error('Method not implemented.');
  }

  getClosePositionPreview(): Promise<ClosePositionPreview> {
    throw new Error('Method not implemented.');
  }

  getClosePositionTx(): Promise<Transaction> {
    throw new Error('Method not implemented.');
  }
}
