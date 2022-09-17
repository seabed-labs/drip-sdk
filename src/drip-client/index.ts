import { Address, AnchorProvider } from '@project-serum/anchor';
import { Config } from '../config';
import {
  DripAdminImpl,
  DripPositionImpl,
  DripQuerierImpl,
  DripVaultImpl,
} from '../implementations';
import { DripAdmin, DripPosition, DripQuerier, DripVault } from '../interfaces';
import { Network } from '../models';

export class Drip {
  public readonly querier: DripQuerier;
  public readonly admin: DripAdmin;

  public constructor(
    public readonly network: Network,
    public readonly provider: AnchorProvider,
    public readonly config: Config
  ) {
    this.querier = new DripQuerierImpl(this.provider, config);
    this.admin = new DripAdminImpl(provider, network, config.programId);
  }

  public async getPosition(pubkey: Address): Promise<DripPosition> {
    return await DripPositionImpl.fromPosition(
      this.provider,
      this.network,
      this.config.programId,
      pubkey
    );
  }

  public async getPositionByMint(positionMint: Address): Promise<DripPosition> {
    return await DripPositionImpl.fromPositionNftMint(
      this.provider,
      this.network,
      this.config.programId,
      positionMint
    );
  }

  public async getVault(pubkey: Address): Promise<DripVault> {
    return await DripVaultImpl.fromVaultPubkey(
      this.provider,
      this.network,
      this.config.programId,
      pubkey
    );
  }
}
