import { PublicKey } from '@solana/web3.js';
import { Vault } from '../types';

export const vaults: Record<string, Vault> = {
  '3S62Y4Zutkr73Krh4UwBJewYhHr6q2wWjZGFLBM8mWUC': {
    pubkey: new PublicKey('3S62Y4Zutkr73Krh4UwBJewYhHr6q2wWjZGFLBM8mWUC'),
    protoConfig: new PublicKey('4A87ZpDramFGHwPABoVpRWtUaJvsm3LgefPqwWDpUhdV'),
    tokenAMint: new PublicKey('31nFDfb3b4qw8JPx4FaXGgEk8omt7NuHpPkwWCSym5rC'),
    tokenBMint: new PublicKey('EpurvB9cZ9WkcFePxH7V8vNpZy3nGQLsp2gcGehAWcAL'),
    tokenAAccount: new PublicKey('8azwaeuAV3pBBq6VBXToZa2tQzpQg5Rmt6MrRMQmwnFx'),
    tokenBAccount: new PublicKey('8cPXJRyjMg1iSRuV1m9tq2UGWeQHDZCdj9KTdNEDg49G'),
    treasuryTokenBAccount: new PublicKey('6MMH43yxADFr8es61jmbkW7Q3KXsKVHYpEfhGmpPz4h6'),
  },
  BdkJ8WWtpSFsFcaLgmCAwa7SVADMuCikZe4mAhgRuHAo: {
    pubkey: new PublicKey('BdkJ8WWtpSFsFcaLgmCAwa7SVADMuCikZe4mAhgRuHAo'),
    protoConfig: new PublicKey('B7kUk469u5mMMcCrVQW8TWCZDVikVE8k8Z68R3hYWGsY'),
    tokenAMint: new PublicKey('31nFDfb3b4qw8JPx4FaXGgEk8omt7NuHpPkwWCSym5rC'),
    tokenBMint: new PublicKey('EpurvB9cZ9WkcFePxH7V8vNpZy3nGQLsp2gcGehAWcAL'),
    tokenAAccount: new PublicKey('9AvqAxYRc9ZzmB5TQmbuTWe74zEyoX3cDF9pBGMp6P4x'),
    tokenBAccount: new PublicKey('CHwmWYzTB1w2p4iYJR1wq4yWDrj8StvJTAN5NQcH1iiy'),
    treasuryTokenBAccount: new PublicKey('6MMH43yxADFr8es61jmbkW7Q3KXsKVHYpEfhGmpPz4h6'),
  },
};
