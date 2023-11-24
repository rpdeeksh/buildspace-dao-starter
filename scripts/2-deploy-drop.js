import { AddressZero } from "@ethersproject/constants";
import sdk from "./1-initialize-sdk.js";
import { readFileSync } from "fs";

(async () => {
  try {
    const editionDropAddress = await sdk.deployer.deployEditionDrop(
      {
          name : "Synergy-DAO Membership",
          description : "A DAO for fans of Arijit Singh's concert.",
          symbol : "{{symbol}}",
          image : "ipfs.io/ipfs/QmctEWp9nudeH7J79paM2ChDqSeMHsaTAq8cWFoRo7vVMa",
          primary_sale_recipient : AddressZero,
      });


    // this initialization returns the address of our contract
    // we use this to initialize the contract on the thirdweb sdk
    const editionDrop = await sdk.getContract(editionDropAddress, "edition-drop");

    // with this, we can get the metadata of our contract
    const metadata = await editionDrop.metadata.get();

    console.log(
      "✅ Successfully deployed editionDrop contract, address:",
      editionDropAddress,
    );
    console.log("✅ editionDrop metadata:", metadata);
  } catch (error) {
    console.log("failed to deploy editionDrop contract", error);
  }
})();
