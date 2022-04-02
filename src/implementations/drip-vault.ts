import { Address, Program, Provider } from '@project-serum/anchor';
import { Configs } from '../config';
import { DcaVault } from '../idl/type';
import { DripPosition, DripVault } from '../interfaces';
import { Network } from '../models';
import DcaVaultIDL from '../idl/idl.json';
import { PublicKey, Transaction } from '@solana/web3.js';
import {
  DepositParams,
  InitVaultPeriodParams,
  GetPositionParams,
  isDcaCyclesParam,
  expiryToDcaCycles,
} from '../interfaces/drip-vault/params';
import { DepositPreview } from '../interfaces/drip-vault/previews';
import { toPubkey } from '../utils';
import { findVaultPubkey } from '../helpers';
import { VaultDoesNotExistError } from '../errors';

export class DripVaultImpl implements DripVault {
  private readonly vaultProgram: Program<DcaVault>;
  private readonly vaultPubkey: PublicKey;

  // For now we can do this, but we should transition to taking in a read-only connection here instead and
  // letting users only pass in signer at the end if they choose to else sign and broadcast the tx themselves
  // We should also decouple anchor from this to make it an actual SDK
  private constructor(
    private readonly provider: Provider,
    private readonly network: Network,
    vaultPubkey: Address
  ) {
    const config = Configs[network];
    this.vaultProgram = new Program(DcaVaultIDL as DcaVault, config.vaultProgramId, provider);
    this.vaultPubkey = toPubkey(vaultPubkey);
  }

  public static async fromVaultSeeds(
    vaultSeeds: { protoConfig: Address; tokenAMint: Address; tokenBMint: Address },
    provider: Provider,
    network: Network
  ): Promise<DripVaultImpl> {
    const vaultPubkey = findVaultPubkey(Configs[network].vaultProgramId, vaultSeeds);
    const config = Configs[network];
    const vaultProgram = new Program(DcaVaultIDL as DcaVault, config.vaultProgramId, provider);

    const vault = await vaultProgram.account.vault.fetchNullable(vaultPubkey);
    if (!vault) {
      throw new VaultDoesNotExistError(vaultPubkey);
    }

    return new DripVaultImpl(provider, network, vaultPubkey);
  }

  public static async fromVaultPubkey(
    vaultPubkey: Address,
    provider: Provider,
    network: Network
  ): Promise<DripVaultImpl> {
    const config = Configs[network];
    const vaultProgram = new Program(DcaVaultIDL as DcaVault, config.vaultProgramId, provider);

    const vault = await vaultProgram.account.vault.fetchNullable(vaultPubkey);
    if (!vault) {
      throw new VaultDoesNotExistError(toPubkey(vaultPubkey));
    }

    return new DripVaultImpl(provider, network, vaultPubkey);
  }

  public async getDepositPreview(params: DepositParams): Promise<DepositPreview> {
    const vault = await this.vaultProgram.account.vault.fetch(this.vaultPubkey);
    const vaultProtoConfig = await this.vaultProgram.account.vaultProtoConfig.fetch(
      vault.protoConfig
    );

    const dcaCycles = isDcaCyclesParam(params.dcaParams)
      ? params.dcaParams.dcaCycles
      : expiryToDcaCycles(params.dcaParams.expiry, vaultProtoConfig.granularity.toNumber());

    const dripAmount = params.amount.divn(dcaCycles);

    return {
      vault: this.vaultPubkey,
      amount: params.amount,
      dripAmount,
      dcaCycles,
    };
  }

  getDepositTx(params: DepositParams | DepositPreview): Promise<Transaction> {
    throw new Error('Method not implemented.');
  }

  getInitVaultPeriodTx(params: InitVaultPeriodParams): Promise<Transaction> {
    throw new Error('Method not implemented.');
  }

  getTriggerDCAPreview(): Promise<DepositPreview> {
    throw new Error('Method not implemented.');
  }

  getTriggerDCATx(): Promise<Transaction> {
    throw new Error('Method not implemented.');
  }

  getPosition(params: GetPositionParams): Promise<DripPosition> {
    throw new Error('Method not implemented.');
  }
}
