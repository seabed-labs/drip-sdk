import { Address, AnchorProvider } from '@project-serum/anchor';
import { PublicKey } from '@solana/web3.js';
import { Configs } from '../config';
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
  public readonly programId: PublicKey;

  public constructor(
    public readonly network: Network,
    public readonly provider: AnchorProvider,
    programId?: PublicKey
  ) {
    this.programId = programId ?? Configs[network].defaultProgramId;
    this.querier = new DripQuerierImpl(provider, network, programId);
    this.admin = new DripAdminImpl(provider, network, programId);
  }

  public async getPosition(pubkey: Address): Promise<DripPosition> {
    return await DripPositionImpl.fromPosition(pubkey, this.provider, this.network, this.programId);
  }

  public async getPositionByMint(positionMint: Address): Promise<DripPosition> {
    return await DripPositionImpl.fromPositionNftMint(
      positionMint,
      this.provider,
      this.network,
      this.programId
    );
  }

  public async getVault(pubkey: Address): Promise<DripVault> {
    return await DripVaultImpl.fromVaultPubkey(pubkey, this.provider, this.network, this.programId);
  }
}
