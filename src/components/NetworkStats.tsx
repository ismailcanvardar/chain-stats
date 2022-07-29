import React, { useContext, useEffect } from "react";
import { NetworkContext } from "../contexts/NetworkProvider";
import useMempool from "../hooks/useMempool";

const NetworkStats = () => {
  const networkContext = useContext(NetworkContext);
  const [txs, listenPendingTxs] = useMempool(networkContext?.wssProvider!);

  useEffect(() => {
    if (networkContext?.wssProvider) {
      listenPendingTxs();
    }
  }, [networkContext]);

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
        <div className="card w-full bg-neutral text-neutral-content">
          <div className="card-body items-center text-center">
            <h2 className="card-title">Cookies!</h2>
            <p>We are using cookies for no reason.</p>
            <div className="card-actions justify-end">
              <button className="btn btn-primary">Accept</button>
              <button className="btn btn-ghost">Deny</button>
            </div>
          </div>
        </div>
        <div className="card w-full bg-neutral text-neutral-content">
          <div className="card-body items-center text-center">
            <h2 className="card-title">Cookies!</h2>
            <p>We are using cookies for no reason.</p>
            <div className="card-actions justify-end">
              <button className="btn btn-primary">Accept</button>
              <button className="btn btn-ghost">Deny</button>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-black rounded-box p-4 h-72 grid my-4 opacity-75">
        {txs?.length > 0 &&
          txs
            .map((tx, index) => (
              <p className="text-md truncate text-green-500" key={index}>
                {"> " + tx}
              </p>
            ))
            .reverse()}
      </div>
    </>
  );
};

export default NetworkStats;
