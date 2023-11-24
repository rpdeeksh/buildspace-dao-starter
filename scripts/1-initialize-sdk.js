import { ThirdwebSDK } from "@thirdweb-dev/sdk";

// Importing and configuring our .env file that we use to securely store our environment variables
import dotenv from "dotenv";
dotenv.config();

// Some quick checks to make sure our .env is working.
if (!process.env.PRIVATE_KEY || process.env.PRIVATE_KEY === "") {
  console.log("🛑 Private key not found.");
}

if (!process.env.QUICKNODE_API_URL || process.env.QUICKNODE_API_URL === "") {
  console.log("🛑 QuickNode API URL not found.");
}

if (!process.env.WALLET_ADDRESS || process.env.WALLET_ADDRESS === "") {
  console.log("🛑 Wallet Address not found.");
}

const sdk = ThirdwebSDK.fromPrivateKey(
  // Your wallet private key. ALWAYS KEEP THIS PRIVATE, DO NOT SHARE IT WITH ANYONE, add it to your .env file and do not commit that file to github!
  process.env.PRIVATE_KEY,
  // RPC URL, we'll use our QuickNode API URL from our .env file.
  process.env.QUICKNODE_API_URL,{
    clientId : "6d0520dbf1e0d742936d9b4ec097d25a",
    secretKey : "z7UGVKnT43n4oJ7DKdo-UtRKIfS6TXzadZN8FEmVJ0ZOqTwDTAn9d0ikAFXgpzk8CmTknBEECefSgsVQDt-P8Q", //make sure this is removed before comitting to github
  }
);

(async () => {
  try {
    const address = await sdk.getSigner().getAddress();
    console.log("👋 SDK initialized by address:", address)
  } catch (err) {
    console.error("Failed to get apps from the sdk", err);
    process.exit(1);
  }
})();

setTimeout(() => {
  console.log("\n");
}, 1000);
// We are exporting the initialized thirdweb SDK so that we can use it in our other scripts
export default sdk;