import { Address, Program, Provider } from '@project-serum/anchor';
import { PublicKey } from '@solana/web3.js';
import { Configs } from '../config';
import { Vault, Token } from '../config/types';
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

  public async getAllVaults(): Promise<Record<string, Vault>> {
    return Configs[this.network].vaults;
  }

  public async getAllPositions(): Promise<Record<string, VaultPositionAccount>> {
    throw new Error('Method not implemented.');
  }

  public async getAllTokenAs(givenTokenB?: PublicKey): Promise<Record<string, Token>> {
    const vaults = Configs[this.network].vaults;
    const tokenAPubkeys = (
      givenTokenB
        ? Object.values(vaults).filter((vault) => vault.tokenBMint.equals(givenTokenB))
        : Object.values(vaults)
    ).map((vault) => vault.tokenAMint);

    return tokenAPubkeys.reduce(
      (map, tokenPubkey) => ({
        ...map,
        [tokenPubkey.toBase58()]: Configs[this.network].tokens[tokenPubkey.toBase58()],
      }),
      {} as Record<string, Token>
    );
  }

  public async getAllTokenBs(givenTokenA?: PublicKey): Promise<Record<string, Token>> {
    const vaults = Configs[this.network].vaults;
    const tokenBPubkeys = (
      givenTokenA
        ? Object.values(vaults).filter((vault) => vault.tokenAMint.equals(givenTokenA))
        : Object.values(vaults)
    ).map((vault) => vault.tokenBMint);

    return tokenBPubkeys.reduce(
      (map, tokenPubkey) => ({
        ...map,
        [tokenPubkey.toBase58()]: Configs[this.network].tokens[tokenPubkey.toBase58()],
      }),
      {} as Record<string, Token>
    );
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
