import { ethers } from "ethers";
import { useEffect, useState } from "react";

import { useWeb3ModalAccount } from "@web3modal/ethers/react";

const useTransferEvent = () => {
  const [tokenId, setTokenId] = useState("");
  const { address } = useWeb3ModalAccount();

  const filter = {
    address: import.meta.env.VITE_contract_address,
    topics: [ethers.id("Transfer(address,address,uint256)"), address],
  };

  const handleEvent = (event) => {
    console.log("NFT Sent:", event);
  };

  const wss_provider = new ethers.WebSocketProvider(
    import.meta.env.VITE_wss_rpc_url
  );

  // const contract = getNftContract(wss_provider);

  useEffect(() => {
    (() => {
      console.log("Listening...");
      wss_provider.on(filter, (event) => {
        console.log("NFT EVENT:", event);

        setTokenId(event.topics[3]);
      });
    })();
    return () => wss_provider.off(filter, handleEvent);
  });
  return tokenId;
};

export default useTransferEvent;

// {
//     "_type": "log",
//     "address": "0xfbC0557F040d7d782B9f3914534480aC20bf4E2b",
//     "blockHash": "0x07f6229c14af9c69a8fb0d27999b038a8f0d371f2fb4abf75d1c6dd1549ad15c",
//     "blockNumber": 47086152,
//     "data": "0x",
//     "index": 3,
//     "removed": false,
//     "topics": [
//         "0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef",
//         "0x0000000000000000000000000000000000000000000000000000000000000000",
//         "0x00000000000000000000000077158c23cc2d9dd3067a82e2067182c85fa3b1f6",
//         "0x0000000000000000000000000000000000000000000000000000000000000017"
//     ],
//     "transactionHash": "0x7173880c7c9c8e9aed23af110e6062d1cff0043bd705495b03d9d548640782c4",
//     "transactionIndex": 1
// }

// {
//     "_type": "log",
//     "address": "0xfbC0557F040d7d782B9f3914534480aC20bf4E2b",
//     "blockHash": "0xd855387fb212b2e56bd6c7497fe02af63205ec5771a7eb60c11b029b9967ebaf",
//     "blockNumber": 47086252,
//     "data": "0x",
//     "index": 2,
//     "removed": false,
//     "topics": [
//         "0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef",
//         "0x00000000000000000000000077158c23cc2d9dd3067a82e2067182c85fa3b1f6",
//         "0x000000000000000000000000b2b2130b4b83af141cfc4c5e3deb1897eb336d79",
//         "0x000000000000000000000000000000000000000000000000000000000000001a"
//     ],
//     "transactionHash": "0x58e34278f2ba79d84d6d3440e9f9347b211bd7433e52032cb4f337285aa36eb6",
//     "transactionIndex": 1
// }

// use it a dependeces in use effect of us transfer nft
