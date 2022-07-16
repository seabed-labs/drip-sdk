import { Address } from '@project-serum/anchor';
import { PublicKey, TokenAmount } from '@solana/web3.js';
import Decimal from 'decimal.js';
import { VaultProtoConfig } from '../../config';
import { Granularity } from '../drip-admin/params';
import {
  Token,
  Vault,
  VaultAccount,
  VaultPeriodAccount,
  VaultPositionAccount,
  VaultProtoConfigAccount,
} from './results';

export enum QuoteToken {
  TokenA,
  TokenB,
}

export interface DripQuerier {
  getAllVaults(): Promise<Record<string, Vault>>;
  getAllPositions(user: Address): Promise<Record<string, VaultPositionAccount>>;
  getAllTokenAs(givenTokenB?: PublicKey): Promise<Record<string, Token>>;
  getAllTokenBs(givenTokenA?: PublicKey): Promise<Record<string, Token>>;
  getSupportedVaultProtoConfigsForPair(
    tokenA: Address,
    tokenB: Address
  ): Promise<VaultProtoConfig[]>;
  getAveragePrice(position: Address, quoteToken: QuoteToken): Promise<Decimal>;

  fetchVaultProtoConfigAccounts(...pubkeys: Address[]): Promise<(VaultProtoConfigAccount | null)[]>;
  fetchVaultAccounts(...pubkeys: Address[]): Promise<(VaultAccount | null)[]>;
  fetchVaultPeriodAccounts(...pubkeys: Address[]): Promise<(VaultPeriodAccount | null)[]>;
  fetchVaultPositionAccounts(...pubkeys: Address[]): Promise<(VaultPositionAccount | null)[]>;
}
