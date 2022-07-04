import React from 'react';
import ReactDOM from 'react-dom/client';
import './CSS/index.css';
import App from './App';
import Web3 from "web3";
import { Web3ReactProvider } from "@web3-react/core";
import { MetamaskProvider } from "./Hooks/useMetamask";
function getLibrary(provider, connector) {
  return new Web3(provider);
}
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Web3ReactProvider getLibrary={getLibrary}>
      <MetamaskProvider>
        <App />
      </MetamaskProvider>
    </Web3ReactProvider>
  </React.StrictMode>
);

