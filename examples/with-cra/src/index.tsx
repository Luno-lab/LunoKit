import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { createConfig } from '@luno-kit/react';
import { kusama, polkadot, westend } from '@luno-kit/react/chains';
import {
  novaConnector,
  polkadotjsConnector,
  polkagateConnector,
  subwalletConnector,
  talismanConnector,
  walletConnectConnector,
} from '@luno-kit/react/connectors';
import { LunoKitProvider } from '@luno-kit/ui';
import App from './App';
import reportWebVitals from './reportWebVitals';
import '@luno-kit/ui/styles.css';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query'

const connectors = [
  polkadotjsConnector(),
  subwalletConnector(),
  talismanConnector(),
  polkagateConnector(),
  walletConnectConnector({ projectId: process.env.REACT_APP_WALLET_CONNECT_ID }),
  novaConnector({ projectId: process.env.REACT_APP_WALLET_CONNECT_ID }),
];

const lunoConfig = createConfig({
  appName: 'luno with-vite example',
  chains: [polkadot, kusama, westend],
  connectors: connectors,
  autoConnect: true,
});

const queryClient = new QueryClient();

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <LunoKitProvider config={lunoConfig}>
        <App />
      </LunoKitProvider>
    </QueryClientProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
