import { Address } from '@project-serum/anchor';
import { PublicKey } from '@solana/web3.js';
import { DripConfig, Token, Vault, VaultProtoConfig } from '../interfaces';
import { ClientEnv, Network } from '../models';
import { Configuration, DefaultApi } from '@dcaf-labs/drip-ts';

function getApiUrl(network: Network, clientEnv: ClientEnv): string {
  switch (network) {
    case Network.Mainnet:
      return 'https://api.drip.dcaf.so';
    case Network.Devnet:
      switch (clientEnv) {
        case ClientEnv.Production:
          return 'https://devnet.api.drip.dcaf.so';
        case ClientEnv.Staging:
          return 'https://drip-backend-devnet-staging.herokuapp.com';
      }
  }
  return 'localhost';
}

export class DripConfigImpl implements DripConfig {
  private readonly dripApi: DefaultApi;

  constructor(url: string) {
    const config = new Configuration({ basePath: url });
    this.dripApi = new DefaultApi(config);
  }

  public static fromNetworkClient(network: Network, clientEnv: ClientEnv): DripConfigImpl {
    return new DripConfigImpl(getApiUrl(network, clientEnv));
  }

  public async getAllTokenAs(givenTokenB?: Address): Promise<Record<string, Token>> {
    const apiTokenAs = await this.dripApi.v1VaultTokensGet({
      tokenB: givenTokenB ? givenTokenB.toString() : undefined,
    });
    const tokens: Record<string, Token> = {};
    apiTokenAs.forEach((apiToken) => {
      tokens[apiToken.pubkey] = {
        mint: new PublicKey(apiToken.pubkey),
        symbol: apiToken.symbol,
      };
    });
    return tokens;
  }

  public async getAllTokenBs(givenTokenA?: Address): Promise<Record<string, Token>> {
    const apiTokenBs = await this.dripApi.v1VaultTokensGet({
      tokenA: givenTokenA ? givenTokenA.toString() : undefined,
    });
    const tokens: Record<string, Token> = {};
    apiTokenBs.forEach((apiToken) => {
      tokens[apiToken.pubkey] = {
        mint: new PublicKey(apiToken.pubkey),
        symbol: apiToken.symbol,
      };
    });
    return tokens;
  }

  public async getSupportedVaultProtoConfigsForPair(
    tokenA: Address,
    tokenB: Address
  ): Promise<VaultProtoConfig[]> {
    const apiVaultProtoConfigs = await this.dripApi.v1ProtoconfigsGet({
      tokenA: tokenA ? tokenA.toString() : undefined,
      tokenB: tokenB ? tokenB.toString() : undefined,
    });
    return apiVaultProtoConfigs.map((apiVaultProtoConfig) => {
      return {
        pubkey: new PublicKey(apiVaultProtoConfig.pubkey),
        granularity: Number(apiVaultProtoConfig.granularity),
      };
    });
  }

  public async getAllVaults(
    givenTokenA?: Address,
    givenTokenB?: Address,
    givenVaultProtoConfig?: Address
  ): Promise<Record<string, Vault>> {
    const apiVaults = await this.dripApi.v1VaultsGet({
      tokenA: givenTokenA ? givenTokenA.toString() : undefined,
      tokenB: givenTokenB ? givenTokenB.toString() : undefined,
      protoConfig: givenVaultProtoConfig ? givenVaultProtoConfig.toString() : undefined,
    });
    const vaults: Record<string, Vault> = {};
    apiVaults.forEach((apiVault) => {
      vaults[apiVault.pubkey] = {
        pubkey: new PublicKey(apiVault.pubkey),
        protoConfig: new PublicKey(apiVault.protoConfig),
        tokenAMint: new PublicKey(apiVault.tokenAMint),
        tokenBMint: new PublicKey(apiVault.tokenBMint),
        tokenAAccount: new PublicKey(apiVault.tokenAAccount),
        tokenBAccount: new PublicKey(apiVault.tokenBAccount),
        treasuryTokenBAccount: new PublicKey(apiVault.treasuryTokenBAccount),
      };
    });
    return vaults;
  }
}
