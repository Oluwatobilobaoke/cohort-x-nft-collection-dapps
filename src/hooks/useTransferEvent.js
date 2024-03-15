import { ethers } from "ethers";
import { useEffect } from "react";

import { useWeb3ModalAccount } from "@web3modal/ethers/react";


const useTransferEvent = () => {
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
      });
    })();
    return () => wss_provider.off(filter, handleEvent);
  }, []);

  return;
};

export default useTransferEvent;
