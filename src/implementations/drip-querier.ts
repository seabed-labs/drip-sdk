import { Address, Program, Provider } from '@project-serum/anchor';
import { PublicKey } from '@solana/web3.js';
import { Configs } from '../config';
import { Vault, VaultProtoConfig, Token } from '../config/types';
import { DcaVault } from '../idl/type';
import DcaVaultIDL from '../idl/idl.json';
import { DripQuerier } from '../interfaces';
import {
  VaultAccount,
  VaultPeriodAccount,
  VaultPositionAccount,
} from '../interfaces/drip-querier/results';
import { Network } from '../models';

export class DripQuerierImpl implements DripQuerier {
  private readonly vaultProgram: Program<DcaVault>;

  private constructor(private readonly provider: Provider, private readonly network: Network) {
    const config = Configs[network];
    this.vaultProgram = new Program(DcaVaultIDL as DcaVault, config.vaultProgramId, provider);
  }

  getAllVaults(): Promise<Vault[]> {
    throw new Error('Method not implemented.');
  }

  getAllPositions(): Promise<VaultProtoConfig[]> {
    throw new Error('Method not implemented.');
  }

  getAllTokenAs(givenB?: PublicKey): Promise<Token[]> {
    throw new Error('Method not implemented.');
  }

  getAllTokenBs(givenA?: PublicKey): Promise<Token[]> {
    throw new Error('Method not implemented.');
  }

  fetchVaultProtoConfigAccounts(...pubkeys: Address[]): Promise<VaultAccount[]> {
    throw new Error('Method not implemented.');
  }

  fetchVaultAccounts(...pubkeys: Address[]): Promise<VaultAccount[]> {
    throw new Error('Method not implemented.');
  }

  fetchVaultPeriodAccounts(...pubkeys: Address[]): Promise<VaultPeriodAccount[]> {
    throw new Error('Method not implemented.');
  }

  fetchVaultPositionAccounts(...pubkeys: Address[]): Promise<VaultPositionAccount[]> {
    throw new Error('Method not implemented.');
  }
}
