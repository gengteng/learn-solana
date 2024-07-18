import "dotenv/config"
import { getKeypairFromEnvironment } from "@solana-developers/helpers";
import { Transaction, SystemProgram, LAMPORTS_PER_SOL } from "@solana/web3.js";
import { HttpsProxyAgent } from "hpagent";

const aKeyPair = getKeypairFromEnvironment("A_SECRET_KEY");
const bKeyPair = getKeypairFromEnvironment("B_SECRET_KEY");

console.log(`✅ Read key pairs!`);
console.log(`A's public key is: `, aKeyPair.publicKey.toBase58());
console.log(`B's public key is: `, bKeyPair.publicKey.toBase58());

import { Connection, clusterApiUrl } from "@solana/web3.js";

const httpAgent = new HttpsProxyAgent({ proxy: "http://127.0.0.1:7890" });
const connection = new Connection(clusterApiUrl("devnet"), {httpAgent, commitment: "confirmed"});

console.log(`✅ Connected to cluster!`);

// get the balance of the accounts before the transaction

const aBalance = await connection.getBalance(aKeyPair.publicKey);
const bBalance = await connection.getBalance(bKeyPair.publicKey);

console.log(`A's balance: ${aBalance / LAMPORTS_PER_SOL} SOL`);
console.log(`B's balance: ${bBalance / LAMPORTS_PER_SOL} SOL`);

const transaction = new Transaction();

const instruction = SystemProgram.transfer({
    fromPubkey: aKeyPair.publicKey,
    toPubkey: bKeyPair.publicKey,
    lamports: 1 * LAMPORTS_PER_SOL,
    });

transaction.add(instruction);

console.log(`✅ Created transaction!`);

import { sendAndConfirmTransaction } from "@solana/web3.js";

const signature = await sendAndConfirmTransaction(
    connection,
    transaction,
    [aKeyPair],
    { commitment: "confirmed" }
);

// TODO: THIS CALL WILL BLOCK UNTIL THE TRANSACTION IS CONFIRMED

console.log(`✅ Transaction confirmed!`);
console.log(`Transaction signature: ${signature}`);

// get the balance of the accounts after the transaction

const aBalanceAfterTrans = await connection.getBalance(aKeyPair.publicKey);
const bBalanceAfterTrans = await connection.getBalance(bKeyPair.publicKey);

console.log(`A's balance after transaction: ${aBalanceAfterTrans / LAMPORTS_PER_SOL} SOL`);
console.log(`B's balance after transaction: ${bBalanceAfterTrans / LAMPORTS_PER_SOL} SOL`);