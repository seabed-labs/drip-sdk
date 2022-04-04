import { Address, Program, Provider } from '@project-serum/anchor';
import { PublicKey, Transaction } from '@solana/web3.js';
import { Configs } from '../config';
import { DcaVault } from '../idl/type';
import { DripPosition } from '../interfaces';
import { Network } from '../models';
import DcaVaultIDL from '../idl/idl.json';
import { toPubkey } from '../utils';
import { findVaultPositionPubkey } from '../helpers';
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

  public static fromPosition(
    positionPubkey: Address,
    provider: Provider,
    network: Network
  ): DripPositionImpl {
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
    const vaultProgram = new Program(DcaVaultIDL as DcaVault, config.vaultProgramId, provider);

    const position = await vaultProgram.account.position.fetchNullable(positionPubkey);
    if (!position) {
      throw new PositionDoesNotExistError(positionPubkey);
    }

    return new DripPositionImpl(provider, network, positionPubkey);
  }

  getWithdrawBPreview(): Promise<WithdrawBPreview> {
    throw new Error('Method not implemented.');
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
