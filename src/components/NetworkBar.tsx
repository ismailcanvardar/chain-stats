import React, { useContext } from "react";
import { NetworkContext } from "../contexts/NetworkProvider";
import { PROVIDERS } from "../constants";

const NETWORK_IDS = [1, 56, 137, 250, 43114];

const NetworkBox: React.FC = () => {
  const networkContext = useContext(NetworkContext);

  return (
    <>
      <div className="navbar bg-base-300 rounded-box mt-4">
        <div className="flex-1 pl-8 lg:flex-none">
          <a className="text-lg font-bold">CHAIN STATS</a>
        </div>
        <div className="flex justify-end flex-1 pr-8">
          <div className="flex items-stretch">
            <a className="btn btn-ghost rounded-btn">Button</a>
            <div className="dropdown dropdown-end">
              <label tabIndex={0} className="btn btn-ghost rounded-btn">
                {networkContext?.name}
              </label>
              <ul
                tabIndex={0}
                className="menu dropdown-content p-2 shadow bg-base-100 rounded-box w-52 mt-4"
              >
                {NETWORK_IDS.map((id) => (
                  <li key={id}>
                    <a
                      className="block p-2 text-sm"
                      onClick={() => networkContext?.switchNetwork(id)}
                    >
                      {PROVIDERS.get(id)?.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default NetworkBox;
