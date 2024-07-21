import { getOrCreateAssociatedTokenAccount } from "@solana/spl-token";
import "dotenv/config";
import {
  getExplorerLink,
  getKeypairFromEnvironment,
} from "@solana-developers/helpers";
import { Connection, PublicKey, clusterApiUrl } from "@solana/web3.js";
import { HttpsProxyAgent } from "hpagent";

const httpAgent = new HttpsProxyAgent({ proxy: "http://127.0.0.1:7890" });
const connection = new Connection(clusterApiUrl("devnet"), {httpAgent, commitment: "confirmed"});

const user = getKeypairFromEnvironment("B_SECRET_KEY");

console.log(
  `🔑 Loaded our keypair securely, using an env file! Our public key is: ${user.publicKey.toBase58()}`
);

// Subtitute in your token mint account from create-token-mint.ts
const tokenMintAccount = new PublicKey(
  "BNDqUZkZqeV6nmreNtPsYtgo9RCcuxKERbqFEx7c25tL"
);

// Here we are making an associated token account for our own address, but we can 
// make an ATA on any other wallet in devnet!
// const recipient = new PublicKey("SOMEONE_ELSES_DEVNET_ADDRESS");
const recipient = user.publicKey;

const tokenAccount = await getOrCreateAssociatedTokenAccount(
  connection,
  user,
  tokenMintAccount,
  recipient,
  false,
  "confirmed"
);

console.log(`Token Account: ${tokenAccount.address.toBase58()}`);

const link = getExplorerLink(
  "address",
  tokenAccount.address.toBase58(),
  "devnet"
);

console.log(`✅ Created token Account: ${link}`);

// Token mint account: BNDqUZkZqeV6nmreNtPsYtgo9RCcuxKERbqFEx7c25tL
// A Public key is: 8GjmTC5Y2z1an9mGt3BeiSkshCh6nWeBQiaai5mmhrrS
// A Token Account: C9tZBYcJS6e1jkX9FGEriDUburZJ5bF4ntTiP9Fucm7F

// B Public key is: BCapgJq6ttRorvYwjU9iJJ8t9voW8Fze4ciEfb1VZyCB
// B Token Account: F4m643iaWBf8n1LHyHbTeNQ493VyoQNp4J61df8jUbUQ
// ✅ Created token Account: https://explorer.solana.com/address/C9tZBYcJS6e1jkX9FGEriDUburZJ5bF4ntTiP9Fucm7F?cluster=devnet