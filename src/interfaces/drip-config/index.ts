import { Address } from '@project-serum/anchor';
import { Token, Vault, VaultProtoConfig } from './results';

export * from './results';

export interface DripConfig {
  getAllTokenAs(givenTokenB?: Address): Promise<Record<string, Token>>;
  getAllTokenBs(givenTokenA?: Address): Promise<Record<string, Token>>;
  getSupportedVaultProtoConfigsForPair(
    tokenA: Address,
    tokenB: Address
  ): Promise<VaultProtoConfig[]>;
  getAllVaults(
    givenTokenA?: Address,
    givenTokenB?: Address,
    givenVaultProtoConfig?: Address
  ): Promise<Record<string, Vault>>;
}
