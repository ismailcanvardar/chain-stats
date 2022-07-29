import { ethers } from "ethers";
import { PROVIDERS } from "../constants";
import { INetworkData } from "../constants/providers";
import React, { useState, useEffect, createContext } from "react";

interface INetworkContext {
  name?: string;
  chainId?: number;
  httpProvider?: ethers.providers.JsonRpcProvider;
  wssProvider?: ethers.providers.WebSocketProvider;
  switchNetwork: Function;
}

export const NetworkContext = createContext<INetworkContext | null>(null);

interface INetworkProvider {
  children: React.ReactNode;
}

const NetworkProvider: React.FC<INetworkProvider> = ({ children }) => {
  const [selectedNetwork, setSelectedNetwork] = useState<INetworkData | null>();

  useEffect(() => {
    const network = localStorage.getItem("network");
    if (network) {
      setSelectedNetwork(PROVIDERS.get(parseInt(network)));
      return;
    }

    setSelectedNetwork(PROVIDERS.get(1));
  }, []);

  const switchNetwork = (chainId: number) => {
    localStorage.setItem("network", chainId.toString());
    setSelectedNetwork(PROVIDERS.get(chainId));
  };

  return (
    <NetworkContext.Provider
      value={{
        name: selectedNetwork?.name,
        chainId: selectedNetwork?.chainId,
        httpProvider: selectedNetwork?.httpProvider,
        wssProvider: selectedNetwork?.wssProvider,
        switchNetwork,
      }}
    >
      {children}
    </NetworkContext.Provider>
  );
};

export default NetworkProvider;
