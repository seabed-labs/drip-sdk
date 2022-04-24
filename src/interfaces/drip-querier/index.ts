import { Address } from '@project-serum/anchor';
import { PublicKey } from '@solana/web3.js';
import {
  Token,
  Vault,
  VaultAccount,
  VaultPeriodAccount,
  VaultPositionAccount,
  VaultProtoConfig,
} from './results';

export interface DripQuerier {
  getAllVaults(): Promise<Vault[]>;
  getAllPositions(): Promise<VaultProtoConfig[]>;
  getAllTokenAs(givenB?: PublicKey): Promise<Token[]>;
  getAllTokenBs(givenA?: PublicKey): Promise<Token[]>;

  fetchVaultProtoConfigAccounts(...pubkeys: Address[]): Promise<VaultAccount[]>;
  fetchVaultAccounts(...pubkeys: Address[]): Promise<VaultAccount[]>;
  fetchVaultPeriodAccounts(...pubkeys: Address[]): Promise<VaultPeriodAccount[]>;
  fetchVaultPositionAccounts(...pubkeys: Address[]): Promise<VaultPositionAccount[]>;
}
