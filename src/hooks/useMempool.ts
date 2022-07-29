import React, { useState, useEffect } from "react";
import { ethers } from "ethers";

// Listens to the mempool and updates the txs state
const useMempool = (
  wssProvider: ethers.providers.WebSocketProvider
): [txs: string[], listenPendingTxs: Function] => {
  const [txs, setTxs] = useState<string[]>([]);

  useEffect(() => {
    setTxs([]);
  }, [wssProvider]);

  // This method listens to the mempool and updates the txs state
  const listenPendingTxs = () => {
    wssProvider.on("pending", (txHash: string) => {
      setTxs((prevTxs) => {
        if (prevTxs.length >= 10) {
          prevTxs.shift();
        }
        return [...prevTxs, txHash];
      });
    });

    return () => {
      wssProvider.removeAllListeners("pending");
    };
  };

  return [txs, listenPendingTxs];
};

export default useMempool;
