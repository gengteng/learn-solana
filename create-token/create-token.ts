import { createMint } from "@solana/spl-token";
import "dotenv/config";
import {
  getKeypairFromEnvironment,
  getExplorerLink,
} from "@solana-developers/helpers";
import { Connection, Keypair, clusterApiUrl } from "@solana/web3.js";
import { HttpsProxyAgent } from "hpagent";

const httpAgent = new HttpsProxyAgent({ proxy: "http://127.0.0.1:7890" });
const connection = new Connection(clusterApiUrl("devnet"), {httpAgent, commitment: "confirmed"});


const user = getKeypairFromEnvironment("A_SECRET_KEY");

console.log(
  `🔑 Loaded our keypair securely, using an env file! Our public key is: ${user.publicKey.toBase58()}`
);

// This is a shortcut that runs:
// SystemProgram.createAccount
// token.createInitializeMintInstruction
// See https://www.soldev.app/course/token-program
const keypair = Keypair.generate();
console.log(`The public key is: `, keypair.publicKey.toBase58());

const tokenMint = await createMint(connection, user, user.publicKey, user.publicKey, 2, keypair);

const link = getExplorerLink("address", tokenMint.toString(), "devnet");

console.log(`✅ Finished! Created token mint: ${link}`);

// signature: ywjCRE932RqAKUjLAq5dEEU9C43uShmJC6kqXDSwo8r4x5cWue66gjsJBLcKaxXZwnZRfD17GrHqiTAjKo7xGMf
// token mint account: BNDqUZkZqeV6nmreNtPsYtgo9RCcuxKERbqFEx7c25tL