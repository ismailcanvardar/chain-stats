import { ethers } from "ethers";

/**
 * This is the function that returns the http provider
 * @param url endpoint that reaches to the defined network
 * @param networkId network id of the defined network
 * @returns provider instance that can be used to interact with the defined network
 */
const mutateHttpProvider = (
  url: string,
  networkId?: string | number
): ethers.providers.JsonRpcProvider => {
  return new ethers.providers.JsonRpcProvider(url);
};

/**
 * This is the function that returns the wss provider
 * @param url endpoint that reaches to the defined network
 * @param networkId network id of the defined network
 * @returns provider instance that can be used to interact with the defined network
 */
const mutateWssProvider = (
  url: string,
  networkId?: string | number
): ethers.providers.WebSocketProvider => {
  return new ethers.providers.WebSocketProvider(url);
};

export interface INetworkData {
  name: string;
  chainId: number;
  httpProvider: ethers.providers.JsonRpcProvider;
  wssProvider: ethers.providers.WebSocketProvider;
}

// Mapping of network id to provider
const PROVIDERS = new Map<number, INetworkData>();

PROVIDERS.set(1, {
  name: "Ethereum",
  chainId: 1,
  httpProvider: mutateHttpProvider(
    process.env.REACT_APP_ETH_HTTP_PROVIDER as string
  ),
  wssProvider: mutateWssProvider(process.env.REACT_APP_ETH_WSS_PROVIDER as string),
});
PROVIDERS.set(56, {
  name: "BSC",
  chainId: 56,
  httpProvider: mutateHttpProvider(
    process.env.REACT_APP_BSC_HTTP_PROVIDER as string
  ),
  wssProvider: mutateWssProvider(process.env.REACT_APP_BSC_WSS_PROVIDER as string),
});
PROVIDERS.set(137, {
  name: "Polygon",
  chainId: 137,
  httpProvider: mutateHttpProvider(
    process.env.REACT_APP_POLYGON_HTTP_PROVIDER as string
  ),
  wssProvider: mutateWssProvider(
    process.env.REACT_APP_POLYGON_WSS_PROVIDER as string
  ),
});
PROVIDERS.set(250, {
  name: "Fantom",
  chainId: 250,
  httpProvider: mutateHttpProvider(
    process.env.REACT_APP_FANTOM_HTTP_PROVIDER as string
  ),
  wssProvider: mutateWssProvider(
    process.env.REACT_APP_FANTOM_WSS_PROVIDER as string
  ),
});
PROVIDERS.set(43114, {
  name: "Avalanche",
  chainId: 43114,
  httpProvider: mutateHttpProvider(
    process.env.REACT_APP_AVALANCHE_HTTP_PROVIDER as string
  ),
  wssProvider: mutateWssProvider(
    process.env.REACT_APP_AVALANCHE_WSS_PROVIDER as string
  ),
});

export default PROVIDERS;
