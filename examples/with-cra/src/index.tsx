import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { createConfig, kusama, polkadot, westend, paseo, polkagateConnector, subwalletConnector, talismanConnector, polkadotjsConnector, walletConnectConnector, novaConnector } from '@luno-kit/react'
import { LunoKitProvider } from '@luno-kit/ui'
import '@luno-kit/ui/styles.css'

const connectors = [
  polkadotjsConnector(),
  subwalletConnector(),
  talismanConnector(),
  polkagateConnector(),
  walletConnectConnector({ projectId: 'e5f0efe345290300d7320b5fa67bb6a4' }),
  novaConnector({ projectId: 'e5f0efe345290300d7320b5fa67bb6a4' }),
]

const lunoConfig = createConfig({
  appName: 'luno with-vite example',
  chains: [polkadot, kusama, westend, paseo],
  connectors: connectors,
  autoConnect: true,
});

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <LunoKitProvider config={lunoConfig}>
      <App />
    </LunoKitProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
