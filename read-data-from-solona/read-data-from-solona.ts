import { Connection, PublicKey, clusterApiUrl, LAMPORTS_PER_SOL } from "@solana/web3.js";
import { HttpsProxyAgent } from "hpagent";

const httpAgent = new HttpsProxyAgent({ proxy: "http://127.0.0.1:7890" });
const connection = new Connection(clusterApiUrl("devnet"), {httpAgent});
const address = new PublicKey('CenYq6bDRB7p73EjsPEpiYN7uveyPUTdXkDkgUduboaN');
const balance = await connection.getBalance(address);
const balanceInSol = balance / LAMPORTS_PER_SOL;

console.log(`The balance of the account at ${address} is ${balanceInSol} SOL`); 
console.log(`✅ Finished!`)