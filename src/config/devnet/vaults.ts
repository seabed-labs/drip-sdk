import { PublicKey } from '@solana/web3.js';
import { Vault } from '../types';

export const vaults: Record<string, Vault> = {
  '3S62Y4Zutkr73Krh4UwBJewYhHr6q2wWjZGFLBM8mWUC': {
    // USDC -> SOL @ minutely
    pubkey: new PublicKey('3S62Y4Zutkr73Krh4UwBJewYhHr6q2wWjZGFLBM8mWUC'),
    protoConfig: new PublicKey('4A87ZpDramFGHwPABoVpRWtUaJvsm3LgefPqwWDpUhdV'),
    tokenAMint: new PublicKey('31nFDfb3b4qw8JPx4FaXGgEk8omt7NuHpPkwWCSym5rC'),
    tokenBMint: new PublicKey('EpurvB9cZ9WkcFePxH7V8vNpZy3nGQLsp2gcGehAWcAL'),
    tokenAAccount: new PublicKey('8azwaeuAV3pBBq6VBXToZa2tQzpQg5Rmt6MrRMQmwnFx'),
    tokenBAccount: new PublicKey('8cPXJRyjMg1iSRuV1m9tq2UGWeQHDZCdj9KTdNEDg49G'),
    treasuryTokenBAccount: new PublicKey('6MMH43yxADFr8es61jmbkW7Q3KXsKVHYpEfhGmpPz4h6'),
  },
  BdkJ8WWtpSFsFcaLgmCAwa7SVADMuCikZe4mAhgRuHAo: {
    // USDC -> ETH @ hourly
    pubkey: new PublicKey('BdkJ8WWtpSFsFcaLgmCAwa7SVADMuCikZe4mAhgRuHAo'),
    protoConfig: new PublicKey('B7kUk469u5mMMcCrVQW8TWCZDVikVE8k8Z68R3hYWGsY'),
    tokenAMint: new PublicKey('31nFDfb3b4qw8JPx4FaXGgEk8omt7NuHpPkwWCSym5rC'),
    tokenBMint: new PublicKey('EpurvB9cZ9WkcFePxH7V8vNpZy3nGQLsp2gcGehAWcAL'),
    tokenAAccount: new PublicKey('9AvqAxYRc9ZzmB5TQmbuTWe74zEyoX3cDF9pBGMp6P4x'),
    tokenBAccount: new PublicKey('CHwmWYzTB1w2p4iYJR1wq4yWDrj8StvJTAN5NQcH1iiy'),
    treasuryTokenBAccount: new PublicKey('6MMH43yxADFr8es61jmbkW7Q3KXsKVHYpEfhGmpPz4h6'),
  },
  '4xZxj3VCp2e1ST3gnUdhYvSAnCenCoMBzRPtGXUyZwBf': {
    // USDC -> ETH @ minutely
    pubkey: new PublicKey('4xZxj3VCp2e1ST3gnUdhYvSAnCenCoMBzRPtGXUyZwBf'),
    protoConfig: new PublicKey('J2ipdPYZSt6yCQoykFFmtce2dkX1GM4xpDXaKrTZwM2h'),
    tokenAMint: new PublicKey('31nFDfb3b4qw8JPx4FaXGgEk8omt7NuHpPkwWCSym5rC'),
    tokenBMint: new PublicKey('9gAMFwMubEvQi6Tts5ePezJp6BqD72FVWECVgaNh9BpG'),
    tokenAAccount: new PublicKey('52kk8ddu3ukQx5GDnCCbA5xvuNrmdDRhqr87hpLCQMo5'),
    tokenBAccount: new PublicKey('D1k3iPGJMKnEGrhFTvMV84FcetyDYZDWkhpuVd2pWyZm'),
    treasuryTokenBAccount: new PublicKey('AUMGiTLNLa9mbkTnGetU5tXKxAV8q1rwDSg59iurzNHh'),
  },
  CANTb7KHUKuZ1HQR73Exo8W14jSLLndcRx2KizxSBEbB: {
    // ETH -> SOL @ minutely
    pubkey: new PublicKey('CANTb7KHUKuZ1HQR73Exo8W14jSLLndcRx2KizxSBEbB'),
    protoConfig: new PublicKey('6UjFL22VY4MwDkgAjrHF3iu9unyRJAYD3qUqNZNoC9b2'),
    tokenAMint: new PublicKey('9gAMFwMubEvQi6Tts5ePezJp6BqD72FVWECVgaNh9BpG'),
    tokenBMint: new PublicKey('EpurvB9cZ9WkcFePxH7V8vNpZy3nGQLsp2gcGehAWcAL'),
    tokenAAccount: new PublicKey('F6tv4ZaGuq4YaJ8Jit7ctRTWj8zQRPbJuhjR3QE87HC1'),
    tokenBAccount: new PublicKey('GU3CGjita9LwuWAbXn5RfoLr3oTaHw9EQnyaRzb5a1ef'),
    treasuryTokenBAccount: new PublicKey('6MMH43yxADFr8es61jmbkW7Q3KXsKVHYpEfhGmpPz4h6'),
  },
};
