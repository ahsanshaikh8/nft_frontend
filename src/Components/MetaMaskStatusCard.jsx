import React from "react";
import useMetamask from "../Hooks/useMetamask";
import MyButton from "./MyButton";

export default function MetaMaskStatusCard() {
  const { connect, disconnect, isActive, account } = useMetamask();
  const hasMetamask = typeof window.ethereum;
  let installMetamask = (
    <>
      <div className="my-card">
        <img
          src="https://uploads-ssl.webflow.com/608c251f56c48d6d1fcff5cb/608c34764115cf533b100518_Polka%20City%20-%20Spy%20Drone.png"
          alt="drone"
          width={"235px"}
        />
        <span className="market-status my-3">
          {isActive ? "Connected" : "Disconnected"}
        </span>
        <div className="market-status-l2">Make sure Metamask is installed</div>
      </div>
    </>
  );
  if (hasMetamask == "undefined") {
    return installMetamask;
  }
  if (isActive) {
    return (
      <div className="sticky-metamask hide-on-mobile">
        Connected to Metamask. Account: {account}
      </div>
    );
  }
  return (
    <div className="my-card">
      <img
        src="https://uploads-ssl.webflow.com/608c251f56c48d6d1fcff5cb/608c34764115cf533b100518_Polka%20City%20-%20Spy%20Drone.png"
        alt="drone"
        width={"235px"}
      />
      <span className="market-status my-3">
        {isActive ? "Connected" : "Disconnected"}
      </span>
      {!isActive && (
        <MyButton
          className="my-2"
          onClick={connect}
          title={"Connect to Metamask"}
        />
      )}
      {account ? (
        <span className="text-dark market-status-l2">
          My account: {account}
        </span>
      ) : null}
      {isActive && (
        <button className="btn btn-danger my-3" onClick={disconnect}>
          {" "}
          Disconnect From Metamask
        </button>
      )}
    </div>
  );
}
