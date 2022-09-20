import { Address, AnchorProvider } from '@project-serum/anchor';
import {
  DripAdminImpl,
  DripConfigImpl,
  DripPositionImpl,
  DripQuerierImpl,
  DripVaultImpl,
} from '../implementations';
import { DripAdmin, DripConfig, DripPosition, DripQuerier, DripVault } from '../interfaces';
import { ClientEnv, Network } from '../models';

export class Drip {
  public readonly querier: DripQuerier;
  public readonly admin: DripAdmin;

  public constructor(
    public readonly network: Network,
    public readonly provider: AnchorProvider,
    public readonly programId: Address,
    public readonly config: DripConfig
  ) {
    this.querier = new DripQuerierImpl(this.provider, this.programId);
    this.admin = new DripAdminImpl(provider, network, this.programId);
  }

  public static fromNetworkClient(
    network: Network,
    provider: AnchorProvider,
    programId: Address,
    clientEnv: ClientEnv
  ): Drip {
    return new Drip(
      network,
      provider,
      programId,
      DripConfigImpl.fromNetworkClient(network, clientEnv)
    );
  }

  public static fromConfigUrl(
    network: Network,
    provider: AnchorProvider,
    programId: Address,
    url: string
  ): Drip {
    return new Drip(network, provider, programId, new DripConfigImpl(url));
  }

  public async getPosition(pubkey: Address): Promise<DripPosition> {
    return await DripPositionImpl.fromPosition(this.provider, this.network, this.programId, pubkey);
  }

  public async getPositionByMint(positionMint: Address): Promise<DripPosition> {
    return await DripPositionImpl.fromPositionNftMint(
      this.provider,
      this.network,
      this.programId,
      positionMint
    );
  }

  public async getVault(pubkey: Address): Promise<DripVault> {
    return await DripVaultImpl.fromVaultPubkey(this.provider, this.network, this.programId, pubkey);
  }
}
