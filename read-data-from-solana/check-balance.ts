import { Connection, LAMPORTS_PER_SOL, PublicKey, clusterApiUrl } from "@solana/web3.js";
import { HttpsProxyAgent } from "hpagent";

try {
    const httpAgent = new HttpsProxyAgent({ proxy: "http://127.0.0.1:7890" });
    const publicKey = new PublicKey("So11111111111111111111111111111111111111112");
    const connection = new Connection(clusterApiUrl('mainnet-beta'), {httpAgent});
    const balanceInLamport = await connection.getBalance(publicKey);
    const balanceInSol = balanceInLamport / LAMPORTS_PER_SOL;

    console.log(`The balance of the account at ${publicKey} is ${balanceInSol} SOL`);
console.log(`✅ Finished!`);
} catch (error) {
    console.error(error);
}

