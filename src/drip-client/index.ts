import { Address, Provider } from '@project-serum/anchor';
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

  public constructor(private readonly network: Network, private readonly provider: Provider) {
    this.querier = new DripQuerierImpl(provider, network);
    this.admin = new DripAdminImpl(provider, network);
  }

  public async getPosition(pubkey: Address): Promise<DripPosition> {
    return await DripPositionImpl.fromPosition(pubkey, this.provider, this.network);
  }

  public async getPositionByMint(positionMint: Address): Promise<DripPosition> {
    return await DripPositionImpl.fromPositionNftMint(positionMint, this.provider, this.network);
  }

  public async getVault(pubkey: Address): Promise<DripVault> {
    return await DripVaultImpl.fromVaultPubkey(pubkey, this.provider, this.network);
  }
}
