import { Keypair, PublicKey } from '@solana/web3.js';
import { BroadcastTransactionWithMetadata, TransactionWithMetadata } from '../../types';
import {
  InitOracleConfigParams,
  InitVaultParams,
  InitVaultProtoConfigParams,
  SetVaultOracleConfigParams,
  SetVaultSwapWhitelistParams,
} from './params';
import { InitOracleConfigPreview, InitVaultProtoConfigPreview } from './previews';

export * from './params';
export * from './previews';

export interface DripAdmin {
  getInitVaultProtoConfigPreview(params: InitVaultProtoConfigParams): InitVaultProtoConfigPreview;
  getInitVaultProtoConfigTx(
    params: InitVaultProtoConfigParams | InitVaultProtoConfigPreview
  ): Promise<TransactionWithMetadata<{ vaultProtoConfigKeypair: Keypair }>>;
  initVaultProtoConfig(
    params: InitVaultProtoConfigParams | InitVaultProtoConfigPreview
  ): Promise<BroadcastTransactionWithMetadata<{ vaultProtoConfigKeypair: Keypair }>>;

  getInitOracleConfigPreview(params: InitOracleConfigParams): InitOracleConfigPreview;
  getInitOracleProtoConfigTx(
    params: InitOracleConfigParams | InitOracleConfigPreview
  ): Promise<TransactionWithMetadata<{ oracleConfigKeypair: Keypair }>>;
  initOracleConfig(params: InitOracleConfigParams | InitOracleConfigPreview): Promise<
    BroadcastTransactionWithMetadata<{
      oracleConfigKeypair: Keypair;
    }>
  >;

  getSetVaultSwapWhitelistTx(params: SetVaultSwapWhitelistParams): Promise<
    TransactionWithMetadata<{
      vaultPubkey: PublicKey;
      vaultProtoConfig: PublicKey;
      existingWhitelist: PublicKey[];
      newWhitelist: PublicKey[];
    }>
  >;
  setVaultSwapWhitelist(params: SetVaultSwapWhitelistParams): Promise<
    BroadcastTransactionWithMetadata<{
      vaultPubkey: PublicKey;
      vaultProtoConfig: PublicKey;
      existingWhitelist: PublicKey[];
      newWhitelist: PublicKey[];
    }>
  >;

  getSetVaultOracleConfigTx(params: SetVaultOracleConfigParams): Promise<
    TransactionWithMetadata<{
      vaultPubkey: PublicKey;
      vaultProtoConfig: PublicKey;
      existingOracleConfig: PublicKey;
      newOracleConfig: PublicKey;
    }>
  >;
  setVaultOracleConfig(params: SetVaultOracleConfigParams): Promise<
    BroadcastTransactionWithMetadata<{
      vaultPubkey: PublicKey;
      vaultProtoConfig: PublicKey;
      existingOracleConfig: PublicKey;
      newOracleConfig: PublicKey;
    }>
  >;

  getInitVaultTx(
    params: InitVaultParams
  ): Promise<TransactionWithMetadata<{ vaultPubkey: PublicKey }>>;
  initVault(
    params: InitVaultParams
  ): Promise<BroadcastTransactionWithMetadata<{ vaultPubkey: PublicKey }>>;
}
