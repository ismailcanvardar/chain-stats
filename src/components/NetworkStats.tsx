import React, { useContext, useEffect } from "react";
import { NetworkContext } from "../contexts/NetworkProvider";
import useMempool from "../hooks/useMempool";
import useChainStats from "../hooks/useChainStats";

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
        <div className="card w-full bg-neutral text-neutral-content">
          {networkContext && networkContext.httpProvider && (
            <div className="card-body items-center text-center">
              <h2 className="card-title">Last block:</h2>
              <p>{stats.latestBlock?.number}</p>
            </div>
          )}
        </div>
        <div className="card w-full bg-neutral text-neutral-content">
          {networkContext && networkContext.httpProvider && (
            <div className="card-body items-center text-center">
              <h2 className="card-title">Gas price:</h2>
              <p>{stats.currentGasPrice} GWEI</p>
            </div>
          )}
        </div>
        <div className="card w-full bg-neutral text-neutral-content">
          {networkContext && networkContext.httpProvider && (
            <div className="card-body items-center text-center">
              <h2 className="card-title">Difficulty:</h2>
              <p>{stats.currentGasPrice}</p>
            </div>
          )}
        </div>
      </div>
      <div className="card w-full bg-neutral text-neutral-content mt-4">
        {stats && stats.blockWithTransactions && (
          <div className="card-body max-h-72">
            <h2 className="card-title">Latest Txs (Confirmed):</h2>
            <div className="overflow-y-auto">
              {stats.blockWithTransactions.transactions.map(
                (tx: any, index: number) => (
                  <p key={index}>{tx.hash}</p>
                )
              )}
            </div>
          </div>
        )}
      </div>
      <div className="card w-full bg-neutral text-neutral-content mt-4">
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
