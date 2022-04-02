import { Program, Provider } from '@project-serum/anchor';
import { Keypair, Transaction } from '@solana/web3.js';
import { Configs } from '../config';
import { DcaVault } from '../idl/type';
import DcaVaultIDL from '../idl/idl.json';
import { DripAdmin } from '../interfaces';
import { InitVaultProtoConfigParams, InitVaultParams } from '../interfaces/drip-admin/params';
import { Network } from '../models';
import { InitVaultProtoConfigPreview } from '../interfaces/drip-admin/previews';

export class DripAdminImpl implements DripAdmin {
  private readonly vaultProgram: Program<DcaVault>;

  // For now we can do this, but we should transition to taking in a read-only connection here instead and
  // letting users only pass in signer at the end if they choose to else sign and broadcast the tx themselves
  // We should also decouple anchor from this to make it an actual SDK
  constructor(private readonly provider: Provider, network: Network) {
    const config = Configs[network];
    this.vaultProgram = new Program(DcaVaultIDL as DcaVault, config.vaultProgramId, provider);
  }

  getInitVaultProtoConfigPreview(params: InitVaultProtoConfigParams): InitVaultProtoConfigPreview {
    const vaultProtoConfigKeypair = Keypair.generate();

    return {
      ...params,
      vaultProtoConfigKeypair
    };
  }

  getInitVaultProtoConfigTx(
    params: InitVaultProtoConfigParams | InitVaultProtoConfigPreview
  ): Promise<Transaction> {
    throw new Error('Method not implemented.');
  }

  getInitVaultTx(params: InitVaultParams): Promise<Transaction> {
    throw new Error('Method not implemented.');
  }
}
