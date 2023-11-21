// import React from 'react';//
// import { useAddress, ConnectWallet, useContract, useNFTBalance } from '@thirdweb-dev/react';
// import { useState, useEffect, useMemo } from 'react';

// const App = () => {
//   // Use the hooks thirdweb gives us.
//   const address = useAddress();
//   console.log("👋 Address:", address);
//    // Initialize our Edition Drop contract
//    const editionDropAddress = "0xe40EAf84908589e0Ae0477480f07B5F45Bf6BC51"
//    const { contract: editionDrop } = useContract(editionDropAddress, "edition-drop");
//    // Hook to check if the user has our NFT
//    const { data: nftBalance } = useNFTBalance(editionDrop, address, "0")
 
//    const hasClaimedNFT = useMemo(() => {
//      return nftBalance && nftBalance.gt(0)
//    }, [nftBalance])
 
//    // ... include all your other code that was already there below.

//   // Background image URL
  // const backgroundImageUrl = 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fi.ytimg.com%2Fvi%2FPa14b2Pu9K8%2Fmaxresdefault.jpg&f=1&nofb=1&ipt=ece2c6dc6925284e598756598f52e93d63858063446ab7ec446757bfd9821558&ipo=images';
  // const opacityValue = 0.5;
  // const containerStyles = {
  //   backgroundImage: `url(${backgroundImageUrl})`,
  //   backgroundSize: 'cover',
  //   minHeight: '100vh',
  //   display: 'flex',
  //   flexDirection: 'column',
  //   justifyContent: 'center',
  //   alignItems: 'center',
  //   opacity: opacityValue,
  //   width: '100%', // Cover the entire width of the page
  //   height: '100%', // Cover the entire height of the page
//   };
//   // This is the case where the user hasn't connected their wallet
//   // to your web app. Let them call connectWallet.
//   if (!address) {
//     return (
//       <div className="landing" style={containerStyles}>
//         <h1>Welcome to Synergy-DAO</h1>
//         <div className="btn-hero">
//           <ConnectWallet />
//         </div>
//       </div>
//     );
//   }

//   // This is the case where we have the user's address
//   // which means they've connected their wallet to our site!
//   return (
//     <div className="landing" style={containerStyles}>
//       <h1>👀 Congratulations your wallet is connected. Now what?</h1>
//     </div>
//   );
// }

// export default App;
import React from 'react';
import { useAddress, ConnectWallet, Web3Button, useContract, useNFTBalance } from '@thirdweb-dev/react';
import { useState, useEffect, useMemo } from 'react';
import {ethers} from "ethers";
import {useWeb3} from "@3rdweb/hooks";

const App = () => {
  // Use the hooks thirdweb give us.
  const address = useAddress();
  console.log("👋 Address:", address);
  // Initialize our Edition Drop contract
  const editionDropAddress = "0x15b2eC7Ca4AAa22c85ADa4C92d6D063732deD043";
  const { contract: editionDrop } = useContract(editionDropAddress, "edition-drop");
  // Hook to check if the user has our NFT
  const { data: nftBalance } = useNFTBalance(editionDrop, address, "0")

  const hasClaimedNFT = useMemo(() => {
    return nftBalance && nftBalance.gt(0)
  }, [nftBalance])

  const backgroundImageUrl = 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fi.ytimg.com%2Fvi%2FPa14b2Pu9K8%2Fmaxresdefault.jpg&f=1&nofb=1&ipt=ece2c6dc6925284e598756598f52e93d63858063446ab7ec446757bfd9821558&ipo=images';
  const opacityValue = 0.5;
  const containerStyles = {
    backgroundImage: `url(${backgroundImageUrl})`,
    backgroundSize: 'cover',
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    opacity: opacityValue,
    width: '100%', // Cover the entire width of the page
    height: '100%',
  };
  // This is the case where the user hasn't connected their wallet
  // to your web app. Let them call connectWallet.
  if (!address) {
    return (
      <div className="landing">
        <h1>Welcome to Synergy DAO</h1>
        <div className="btn-hero">
          <ConnectWallet />
        </div>
      </div>
    );
  }
  if (hasClaimedNFT) {
    return (
      <div className="member-page">
        <h1>🍪DAO Member Page</h1>
        <p>Congratulations on being a member</p>
      </div>
    );
  };
  // Render mint nft screen.
  return (
    <div className="mint-nft">
      <h1>Mint your free 🎤 DAO Membership NFT</h1>
      <div className="btn-hero">
        <Web3Button 
          contractAddress={editionDropAddress}
          action={contract => {
            contract.erc1155.claim(0, 1)
          }}
          onSuccess={() => {
            console.log(`🌊 Successfully Minted! Check it out on OpenSea: https://testnets.opensea.io/assets/${editionDrop.getAddress()}/0`);
          }}
          onError={error => {
            console.error("Failed to mint NFT", error);
          }}
        >
          Mint your NFT (FREE)
        </Web3Button>
      </div>
    </div>
  );
}

export default App;