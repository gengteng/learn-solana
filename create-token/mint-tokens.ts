import { mintTo } from "@solana/spl-token";
import "dotenv/config";
import {
  getExplorerLink,
  getKeypairFromEnvironment,
} from "@solana-developers/helpers";
import { Connection, PublicKey, clusterApiUrl } from "@solana/web3.js";
import { HttpsProxyAgent } from "hpagent";

const httpAgent = new HttpsProxyAgent({ proxy: "http://127.0.0.1:7890" });
const connection = new Connection(clusterApiUrl("devnet"), {httpAgent, commitment: "confirmed"});


// Our token has two decimal places
const MINOR_UNITS_PER_MAJOR_UNITS = Math.pow(10, 2);

const user = getKeypairFromEnvironment("A_SECRET_KEY");

// Token mint account: BNDqUZkZqeV6nmreNtPsYtgo9RCcuxKERbqFEx7c25tL
// Public key is: 8GjmTC5Y2z1an9mGt3BeiSkshCh6nWeBQiaai5mmhrrS
// Token Account: C9tZBYcJS6e1jkX9FGEriDUburZJ5bF4ntTiP9Fucm7F

// Subtitute in your token mint account from create-token-mint.ts
const tokenMintAccount = new PublicKey(
  "BNDqUZkZqeV6nmreNtPsYtgo9RCcuxKERbqFEx7c25tL"
);

// Substitute in your own, or a friend's token account address, based on the previous step.
const recipientAssociatedTokenAccount = new PublicKey(
  "C9tZBYcJS6e1jkX9FGEriDUburZJ5bF4ntTiP9Fucm7F"
);

const transactionSignature = await mintTo(
  connection,
  user,
  tokenMintAccount,
  recipientAssociatedTokenAccount,
  user,
  10 * MINOR_UNITS_PER_MAJOR_UNITS
);

const link = getExplorerLink("transaction", transactionSignature, "devnet");

console.log(`✅ Success! Mint Token Transaction: ${link}`);

// Transaction signature: 3YsTpHUit22teCe2uFeJhzD8Eyd6ZYDzFq4NviqFqKLDfvunriFCXeByemMYxmnjGcAyoVphkCxqsAQ2nULDJWLV