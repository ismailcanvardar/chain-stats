import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import ChainStats, { IChainStats } from "../helpers/chain-stats";

interface IStats {
  currentGasPrice?: string;
  latestBlock?: any;
  blockWithTransactions?: any;
}

const FETCH_INTERVAL = 10000;

// Gets chain stats from ChainStats class and updates the stats state according to IStats interface values
const useChainStats = (
  httpProvider: ethers.providers.JsonRpcProvider
): [stats: IStats] => {
  const chainStats: IChainStats = new ChainStats(httpProvider);

  const [stats, setStats] = useState<IStats>({
    currentGasPrice: undefined,
    latestBlock: undefined,
    blockWithTransactions: undefined,
  });

  // Gets current gas price, latest block number and block with transactions
  const fetchStats = async (): Promise<IStats> => {
    const currentGasPrice = await chainStats.getCurrentGasPrice();
    const latestBlock = await chainStats.getLatestBlock();
    const blockWithTransactions = await chainStats.getBlockWithTransactions(
      parseInt(latestBlock.number) - 1
    );

    console.log(blockWithTransactions);

    return {
      currentGasPrice,
      latestBlock,
      blockWithTransactions,
    };
  };

  // Reset stats if provider changes
  useEffect(() => {
    if (httpProvider) {
      fetchStats().then((stats) => setStats(stats));
    }
  }, [httpProvider]);

  // Fetch stats every FETCH_INTERVAL ms
  useEffect(() => {
    const interval = setInterval(() => {
      if (httpProvider) {
        fetchStats().then((stats) => setStats(stats));
      }
    }, FETCH_INTERVAL);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return [stats];
};

export default useChainStats;
