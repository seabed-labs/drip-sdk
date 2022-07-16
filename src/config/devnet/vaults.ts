import { PublicKey } from '@solana/web3.js';
import { Vault } from '../types';

export const vaults: Record<string, Vault> = {
  '3wQVSJJqEgtDTfXooJTPbi4oSBp6Undj2SuyT4F4nsJd': {
    // USDC -> SOL @ minutely
    pubkey: new PublicKey('3wQVSJJqEgtDTfXooJTPbi4oSBp6Undj2SuyT4F4nsJd'),
    protoConfig: new PublicKey('6E9JT6hW92Mf6DioroeC6xbPxbjWPn7NAM1J2an2TLLi'),
    tokenAMint: new PublicKey('E3R1FopVaFpPAXojjdhJvWfKyaPuGHrx2GY7RCvHn7Dy'),
    tokenBMint: new PublicKey('GAstZSga54WrsQdDZ9pgch6Xe9Lyxaiyx4sY23nKyEZ4'),
    tokenAAccount: new PublicKey('Cqjw3ZUSAF4qoNYLvXSD4Vt7CGu4yo6PcTmEiezKYXE8'),
    tokenBAccount: new PublicKey('Fz6FuhLvh9YWKfDh3TaT9Lp9ahdpMYvDRxf8jrXFKSTQ'),
    treasuryTokenBAccount: new PublicKey('582UDSSYaD4ERuK1XCZMVCgrK8gJuXEeT3FzEj3phynL'),
  },
};
