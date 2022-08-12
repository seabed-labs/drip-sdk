import { PublicKey } from '@solana/web3.js';
import { Vault } from '../types';

export const vaults: Record<string, Vault> = {
  '2dqTZ6Q3UDQTez6HviDjXFg9BNNvCpE9mEcV92peRacj': {
    // USDC -> SOL @ daily
    pubkey: new PublicKey('2dqTZ6Q3UDQTez6HviDjXFg9BNNvCpE9mEcV92peRacj'),
    protoConfig: new PublicKey('6i3GfRb48FtUYB1e3UqfamT1D52UtGtTkF6tMF1F6YHv'),
    tokenAMint: new PublicKey('EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v'),
    tokenBMint: new PublicKey('So11111111111111111111111111111111111111112'),
    tokenAAccount: new PublicKey('71L6ixiGp9UjAcMdjjEAiYjGzBqgWVoSLSQKWhKbPLff'),
    tokenBAccount: new PublicKey('GffoAkQZqq5jfYrp1RTVhWCywnGKdsAx47K3BQFwroKH'),
    treasuryTokenBAccount: new PublicKey('4E5WgXLJ4iiUw6pj2WiJDPqo2fPr4bXfG98JyPkUz2AZ'),
  },
  BrkNC3vpj17h8hwDoqyYrCvEF1BqV6wNQLxP4DfhBiLb: {
    // USDC -> ETH @ daily
    pubkey: new PublicKey('BrkNC3vpj17h8hwDoqyYrCvEF1BqV6wNQLxP4DfhBiLb'),
    protoConfig: new PublicKey('6i3GfRb48FtUYB1e3UqfamT1D52UtGtTkF6tMF1F6YHv'),
    tokenAMint: new PublicKey('EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v'),
    tokenBMint: new PublicKey('7vfCXTUXx5WJV5JADk17DUJ4ksgau7utNKj4b963voxs'),
    tokenAAccount: new PublicKey('BaztmqAZQLLPtAfTVD1NvuGVX2swAoQ1CMxEojE8yYkm'),
    tokenBAccount: new PublicKey('VWzfotdnp5C8BPPznyrEiJkVBfAhWp676jmeX2KppAG'),
    treasuryTokenBAccount: new PublicKey('qNP5HfgrTtW1iLd8ddPyYkqa6RkPP93dbgBUTzYoix6'),
  },
  CBRZk2Agsb2E8rEcGPojJFv4K8hihA3MmYAJRYAxNy8K: {
    // USDC -> BTC @ daily
    pubkey: new PublicKey('CBRZk2Agsb2E8rEcGPojJFv4K8hihA3MmYAJRYAxNy8K'),
    protoConfig: new PublicKey('6i3GfRb48FtUYB1e3UqfamT1D52UtGtTkF6tMF1F6YHv'),
    tokenAMint: new PublicKey('EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v'),
    tokenBMint: new PublicKey('9n4nbM75f5Ui33ZbPYXn59EwSgE8CGsHtAeTH5YFeJ9E'),
    tokenAAccount: new PublicKey('AJw72xgLP3Lx2iSKS2xVW838rNVU2temwGqh5hbofiQM'),
    tokenBAccount: new PublicKey('3prjfBMhHRTU4FbtMMpJ9PRezy46pPJu3ePg8kHaFESP'),
    treasuryTokenBAccount: new PublicKey('EcbzLF4pjPvHX7ARCCbqonA86uNUWVXoUAfNxpS7CCM6'),
  },
};
