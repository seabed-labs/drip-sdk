import { Address } from '@project-serum/anchor';
import Decimal from 'decimal.js';
import {
  VaultAccount,
  VaultPeriodAccount,
  VaultPositionAccount,
  VaultProtoConfigAccount,
} from './results';

export enum QuoteToken {
  TokenA,
  TokenB,
}

export * from './results';

export interface DripQuerier {
  getAllPositions(user: Address): Promise<Record<string, VaultPositionAccount>>;
  getAveragePrice(position: Address, quoteToken: QuoteToken): Promise<Decimal>;
  fetchVaultProtoConfigAccounts(...pubkeys: Address[]): Promise<(VaultProtoConfigAccount | null)[]>;
  fetchVaultAccounts(...pubkeys: Address[]): Promise<(VaultAccount | null)[]>;
  fetchVaultPeriodAccounts(...pubkeys: Address[]): Promise<(VaultPeriodAccount | null)[]>;
  fetchVaultPositionAccounts(...pubkeys: Address[]): Promise<(VaultPositionAccount | null)[]>;
}
