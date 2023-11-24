import sdk from "./1-initialize-sdk.js";
import { readFileSync } from "fs";

(async () => {
  try {
    const editionDrop = await sdk.getContract("0x516477E0e80A72DA56320D4f7B8B840B0DA19baC", "edition-drop");
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