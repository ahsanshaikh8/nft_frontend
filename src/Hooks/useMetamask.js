import React, { useCallback, useContext, useEffect, useMemo, useState } from "react";
import { useWeb3React } from "@web3-react/core";
import { injected } from "./injected";
export const MetamaskContext = React.createContext(null);
export const MetamaskProvider = ({ children }) => {
  const { activate, account, library, connector, active, deactivate } =
    useWeb3React();
  const [isActive, setIsActive] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const connect = async () => {
    console.log("hello")
    console.log("connecting to metamask...");
    // try {
    //   await activate(injected);
    // } catch (error) {
    //   console.log("error connecting to metamask", error);
    // }
  };
  const disconnect = async () => {
    console.log("disconnecting to metamask...");
    try {
      deactivate();
    } catch (error) {
      console.log("error disconnecting to metamask", error);
    }
  };
  useEffect(() => {
    connect().then(() => {
      setIsLoading(false);
    });
    return () => {
      disconnect();
    };
  }, []);
  const handleIsActive = useCallback(() => {
    console.log("App is connected with metamask", active);
    setIsActive(active);
  }, [active]);
  useEffect(() => {
    handleIsActive();
  }, [handleIsActive]);
  const values = useMemo(() => ({
    isActive, isLoading, account, connect, disconnect
  }), [isActive, isLoading]);
  return (
    <MetamaskContext.Provider value={values}>
      {children}
    </MetamaskContext.Provider>
  );
};
export default function useMetamask() {
  const context = useContext(MetamaskContext);

  if (!context) {
    throw new Error("useMetamaskHook is not defined");
  }

  return context;
}
