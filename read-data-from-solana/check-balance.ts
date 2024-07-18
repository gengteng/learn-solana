// import { Connection, LAMPORTS_PER_SOL, PublicKey, clusterApiUrl } from "@solana/web3.js";
// import { HttpsProxyAgent } from "hpagent";

// try {
//     const httpAgent = new HttpsProxyAgent({ proxy: "http://127.0.0.1:7890" });
//     const publicKey = new PublicKey("So11111111111111111111111111111111111111112");
//     const connection = new Connection(clusterApiUrl('mainnet-beta'), {httpAgent});
//     const balanceInLamport = await connection.getBalance(publicKey);
//     const balanceInSol = balanceInLamport / LAMPORTS_PER_SOL;

//     console.log(`The balance of the account at ${publicKey} is ${balanceInSol} SOL`);
// console.log(`✅ Finished!`);
// } catch (error) {
//     console.error(error);
// }
import "dotenv/config"
import { getKeypairFromEnvironment } from "@solana-developers/helpers";
import { HttpsProxyAgent } from "hpagent";
import { Connection, clusterApiUrl } from "@solana/web3.js";

const aKeyPair = getKeypairFromEnvironment("A_SECRET_KEY");
const bKeyPair = getKeypairFromEnvironment("B_SECRET_KEY");

console.log(`✅ Read key pairs!`);
console.log(`A's public key is: `, aKeyPair.publicKey.toBase58());
console.log(`B's public key is: `, bKeyPair.publicKey.toBase58());

const httpAgent = new HttpsProxyAgent({ proxy: "http://127.0.0.1:7890" });
const connection = new Connection(clusterApiUrl("devnet"), {httpAgent});

console.log(`✅ Connected to cluster!`);

// get the balance of the accounts before the transaction

const aBalance = await connection.getBalance(aKeyPair.publicKey);
const bBalance = await connection.getBalance(bKeyPair.publicKey);

console.log(`A's balance: ${aBalance} SOL`);
console.log(`B's balance: ${bBalance} SOL`);

