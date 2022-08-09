import { Address, BN } from '@project-serum/anchor';
import {
  createAssociatedTokenAccountInstruction,
  createCloseAccountInstruction,
  createSyncNativeInstruction,
  getAccount,
  getAssociatedTokenAddress,
  getMinimumBalanceForRentExemptAccount,
  NATIVE_MINT,
} from '@solana/spl-token';
import { Connection, PublicKey, SystemProgram, TransactionInstruction } from '@solana/web3.js';
import { ZERO } from '../../constants';
import { toPubkey } from '../pubkey';

export function isSol(address: Address): boolean {
  return address.toString() === NATIVE_MINT.toBase58();
}

export async function getSolBalance(connection: Connection, account: Address): Promise<BN> {
  return new BN(await connection.getBalance(toPubkey(account)));
}

export async function getWSolAtaPubkey(account: Address): Promise<PublicKey> {
  return await getAssociatedTokenAddress(NATIVE_MINT, toPubkey(account));
}

export async function getWrapSolInstructions(
  connection: Connection,
  owner: Address,
  payer: Address,
  amount: BN
): Promise<TransactionInstruction[]> {
  const wSolAta = await getWSolAtaPubkey(owner);
  const wSolAtaInfo = await connection.getAccountInfo(wSolAta);
  const wSolAtaExists = !!wSolAtaInfo;
  const depositForRentExemption = await getMinimumBalanceForRentExemptAccount(connection);

  const ixs: TransactionInstruction[] = [];
  let solToTransfer = amount;

  if (wSolAtaExists) {
    const wSolAtaWrappableSolBalance = wSolAtaInfo.lamports - depositForRentExemption;
    const wSolAtaAccount = await getAccount(connection, wSolAta);
    const wSolAtaWSolBalance = wSolAtaAccount.amount;

    if (amount.lte(new BN(wSolAtaWSolBalance.toString()))) {
      // Owner already has enough WSOL
      return [];
    }

    solToTransfer = BN.max(solToTransfer.sub(new BN(wSolAtaWrappableSolBalance.toString())), ZERO);
  } else {
    const createWSolAtaIx = createAssociatedTokenAccountInstruction(
      toPubkey(payer),
      wSolAta,
      toPubkey(owner),
      NATIVE_MINT
    );

    ixs.push(createWSolAtaIx);
  }

  if (solToTransfer.gtn(0)) {
    const fundWSolAtaIx = SystemProgram.transfer({
      fromPubkey: toPubkey(payer),
      toPubkey: wSolAta,
      lamports: BigInt(solToTransfer.toString()),
    });
    ixs.push(fundWSolAtaIx);
  }

  const syncNativeIx = createSyncNativeInstruction(wSolAta);
  ixs.push(syncNativeIx);

  return ixs;
}

export async function getCreateWSolAtaInstructions(
  connection: Connection,
  owner: Address,
  payer: Address
): Promise<TransactionInstruction[]> {
  const wSolAta = await getWSolAtaPubkey(owner);
  const wSolAtaInfo = await connection.getAccountInfo(wSolAta);
  const wSolAtaExists = !!wSolAtaInfo;

  const ixs: TransactionInstruction[] = [];

  if (!wSolAtaExists) {
    const createWSolAtaIx = createAssociatedTokenAccountInstruction(
      toPubkey(payer),
      wSolAta,
      toPubkey(owner),
      NATIVE_MINT
    );
    ixs.push(createWSolAtaIx);
  }

  return ixs;
}

export async function getUnwrapSolInstructions(
  _connection: Connection,
  owner: Address
): Promise<TransactionInstruction[]> {
  const wSolAta = await getWSolAtaPubkey(owner);

  const ixs: TransactionInstruction[] = [];

  const closeWSolAtaIx = createCloseAccountInstruction(wSolAta, toPubkey(owner), toPubkey(owner));
  ixs.push(closeWSolAtaIx);

  return ixs;
}
