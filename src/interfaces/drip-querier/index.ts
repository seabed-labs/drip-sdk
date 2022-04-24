import { Address } from '@project-serum/anchor';
import { PublicKey } from '@solana/web3.js';
import { Token, Vault, VaultAccount, VaultPeriodAccount, VaultPositionAccount } from './results';

export interface DripQuerier {
  getAllVaults(): Promise<Record<string, Vault>>;
  getAllPositions(user: Address): Promise<Record<string, VaultPositionAccount>>;
  getAllTokenAs(givenTokenB?: PublicKey): Promise<Record<string, Token>>;
  getAllTokenBs(givenTokenA?: PublicKey): Promise<Record<string, Token>>;

  fetchVaultProtoConfigAccounts(...pubkeys: Address[]): Promise<VaultAccount[]>;
  fetchVaultAccounts(...pubkeys: Address[]): Promise<VaultAccount[]>;
  fetchVaultPeriodAccounts(...pubkeys: Address[]): Promise<VaultPeriodAccount[]>;
  fetchVaultPositionAccounts(...pubkeys: Address[]): Promise<VaultPositionAccount[]>;
}
