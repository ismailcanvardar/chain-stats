import React, { useState, useContext, useEffect } from "react";
import { NetworkContext } from "../contexts/NetworkProvider";
import { PROVIDERS } from "../constants";

const NETWORK_IDS = [1, 56, 137, 250, 43114];

const NetworkBox: React.FC = () => {
  const networkContext = useContext(NetworkContext);
  const [showTooltip, setShowTooltip] = useState<boolean>();

  useEffect(() => {
    const showTooltipData = localStorage.getItem("showTooltip");

    if (showTooltipData) {
      setShowTooltip(JSON.parse(showTooltipData));
    } else {
      setShowTooltip(true);
    }

    const timeout = setTimeout(() => {
      localStorage.setItem("showTooltip", "false");
      setShowTooltip(false);
    }, 15000);

    return () => {
      clearTimeout(timeout);
    };
  }, []);

  return (
    <>
      <div className="navbar bg-base-300 rounded-box mt-4">
        <div className="flex-1 pl-8 lg:flex-none">
          <a className="text-lg font-bold">CHAIN STATS</a>
        </div>
        <div className="flex justify-end flex-1 pr-8">
          <div className="flex items-stretch">
            <div className="dropdown dropdown-end">
              <div
                className={`tooltip  ${
                  showTooltip === true && "tooltip-open"
                } tooltip-left`}
                data-tip="You can switch between networks here!"
              >
                <label tabIndex={0} className="btn btn-ghost rounded-btn">
                  {networkContext?.name}
                </label>
              </div>
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
