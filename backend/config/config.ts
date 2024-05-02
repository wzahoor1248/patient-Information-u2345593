import algosdk from "algosdk";

const algodToken = "a".repeat(64);
const server: string = "http://localhost";
const port: string = "4001";

const mnemonic: string =
  "swing soda coast episode absurd erupt divert erupt rack police describe earn fiscal law sock unusual journey usage exact half rather source stock above fresh";

export function getClient(): algosdk.Algodv2 {
  let client = new algosdk.Algodv2(algodToken, server, port);
  return client;
}

export function getAccount(): algosdk.Account {
  let account = algosdk.mnemonicToSecretKey(mnemonic);
  return account;
}
