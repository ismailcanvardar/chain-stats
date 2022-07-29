import React from "react";
import NetworkProvider from "./contexts/NetworkProvider";
import NetworkBar from "./components/NetworkBar";
import NetworkStats from "./components/NetworkStats";

function App() {
  return (
    <NetworkProvider>
      <div className="container mx-auto">
        <NetworkBar />
        <NetworkStats />
      </div>
    </NetworkProvider>
  );
}

export default App;
