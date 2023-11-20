import sdk from "./1-initialize-sdk.js";
import { readFileSync } from "fs";

(async () => {
  try {
    const editionDrop = await sdk.getContract("0xe40EAf84908589e0Ae0477480f07B5F45Bf6BC51", "edition-drop");
    await editionDrop.createBatch([
      {
        name : "Synergy NFT",
        description : "This NFT will give you a ticket for Arijit Singh's concert.",
        image : "ipfs.io/ipfs/QmctEWp9nudeH7J79paM2ChDqSeMHsaTAq8cWFoRo7vVMa",
      },
    ]);
    console.log("✅ Successfully created a new NFT in the drop!");
  } catch (error) {
    console.error("failed to create the new NFT", error);
  }
})();