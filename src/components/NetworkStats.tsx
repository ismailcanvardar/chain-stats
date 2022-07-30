import React, { useContext, useEffect } from "react";
import { NetworkContext } from "../contexts/NetworkProvider";
import useMempool from "../hooks/useMempool";
import useChainStats from "../hooks/useChainStats";
import shortenAddress from "../helpers/shorten-address";
import { ethers } from "ethers";

const NetworkStats = () => {
  const networkContext = useContext(NetworkContext);
  const [txs, listenPendingTxs] = useMempool(networkContext?.wssProvider!);
  const [stats] = useChainStats(networkContext?.httpProvider!);

  useEffect(() => {
    if (networkContext?.wssProvider) {
      listenPendingTxs();
    }
  }, [networkContext]);

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
        <div
          className={`card w-full bg-neutral text-neutral-content ${
            !stats.latestBlock?.number && "animate-pulse"
          }`}
        >
          {networkContext && networkContext.httpProvider && (
            <div className="card-body items-center text-center">
              <h2 className="card-title">Last block:</h2>
              <p>{stats.latestBlock?.number}</p>
            </div>
          )}
        </div>
        <div
          className={`card w-full bg-neutral text-neutral-content ${
            !stats.currentGasPrice && "animate-pulse"
          }`}
        >
          {networkContext && networkContext.httpProvider && (
            <div className="card-body items-center text-center">
              <h2 className="card-title">Gas price:</h2>
              <p>{stats.currentGasPrice} GWEI</p>
            </div>
          )}
        </div>
        <div
          className={`card w-full bg-neutral text-neutral-content ${
            !stats.latestBlock && "animate-pulse"
          }`}
        >
          <div className="card-body items-center text-center">
            <h2 className="card-title">Difficulty:</h2>
            {networkContext &&
              networkContext.httpProvider &&
              stats &&
              stats.blockWithTransactions && (
                <p>{ethers.BigNumber.from(stats.blockWithTransactions._difficulty).toString()}</p>
              )}
          </div>
        </div>
      </div>
      <div
        className={`card w-full bg-neutral text-neutral-content mt-4 ${
          stats && !stats.blockWithTransactions && "animate-pulse"
        }`}
      >
        <div className="card-body max-h-72">
          <h2 className="card-title">Latest Txs (Confirmed):</h2>
          {stats && stats.blockWithTransactions && (
            <div className="overflow-y-auto">
              {stats.blockWithTransactions.transactions.map(
                (tx: any, index: number) => (
                  <div key={index} className="grid grid-cols-4">
                    <p>From: {shortenAddress(tx.from)}</p>
                    <p>To: {shortenAddress(tx.to)}</p>
                    <p>Value: {ethers.utils.formatEther(tx.value)}</p>
                    <p className="truncate">Tx hash: {tx.hash}</p>
                  </div>
                )
              )}
            </div>
          )}
        </div>
      </div>
      <div
        className={`card w-full bg-neutral text-neutral-content mt-4 ${
          txs.length === 0 && "animate-pulse"
        }`}
      >
        <div className="card-body">
          <h2 className="card-title">Pending Txs (Mempool):</h2>
          {txs?.length > 0 &&
            txs
              .map((tx, index) => (
                <p className="text-md truncate text-green-500" key={index}>
                  {"> " + tx}
                </p>
              ))
              .reverse()}
        </div>
      </div>
    </>
  );
};

export default NetworkStats;
