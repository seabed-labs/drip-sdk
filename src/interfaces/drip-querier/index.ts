import { Address } from '@project-serum/anchor';
import { PublicKey } from '@solana/web3.js';
import {
  Token,
  Vault,
  VaultAccount,
  VaultPeriodAccount,
  VaultPositionAccount,
  VaultProtoConfigAccount,
} from './results';

export interface DripQuerier {
  getAllVaults(): Promise<Record<string, Vault>>;
  getAllPositions(user: Address): Promise<Record<string, VaultPositionAccount>>;
  getAllTokenAs(givenTokenB?: PublicKey): Promise<Record<string, Token>>;
  getAllTokenBs(givenTokenA?: PublicKey): Promise<Record<string, Token>>;

  fetchVaultProtoConfigAccounts(...pubkeys: Address[]): Promise<(VaultProtoConfigAccount | null)[]>;
  fetchVaultAccounts(...pubkeys: Address[]): Promise<(VaultAccount | null)[]>;
  fetchVaultPeriodAccounts(...pubkeys: Address[]): Promise<(VaultPeriodAccount | null)[]>;
  fetchVaultPositionAccounts(...pubkeys: Address[]): Promise<(VaultPositionAccount | null)[]>;
}
