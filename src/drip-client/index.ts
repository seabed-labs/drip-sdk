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
  public readonly config: DripConfig;

  public constructor(
    public readonly network: Network,
    public readonly provider: AnchorProvider,
    public readonly programId: Address,
    configUrlParams:
      | {
          clientEnv: ClientEnv;
          url?: string;
        }
      | {
          clientEnv?: ClientEnv;
          url: string;
        }
  ) {
    this.querier = new DripQuerierImpl(this.provider, this.programId);
    this.admin = new DripAdminImpl(provider, network, this.programId);
    if (configUrlParams.url) {
      this.config = new DripConfigImpl(configUrlParams.url);
    } else {
      if (!configUrlParams.clientEnv) {
        throw new Error(`if 'url' is not specified, then 'clientEnv' MUST be specified`);
      }
      this.config = DripConfigImpl.fromNetworkClient(network, configUrlParams.clientEnv);
    }
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
