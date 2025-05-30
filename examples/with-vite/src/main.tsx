import React, { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import {createConfig, kusama, LunoKitProvider, polkadot, polkadotjs, subwallet, wsProvider} from '@luno-kit/ui'
import '@luno-kit/ui/dist/styles.css'

const connectors = [
  polkadotjs(), subwallet()
]

const gebSignet = {
  genesisHash: '0xe676fe35e3e2a37fb911ab4ec0857870f1cdc10b04a7b2f0f64eb31e9a142067',
  name: 'geb-signet',
  nativeCurrency: { name: 'GEB', symbol: 'GEB', decimals: 8 },
  rpcUrls: { webSocket: ['wss://signet.geb.network/ws'] },
  ss58Format: 44,
  chainIconUrl: ''
};

const lunoConfig = createConfig({
  appName: 'luno with-vite example',
  chains: [polkadot, kusama, gebSignet],
  connectors: connectors,
  autoConnect: true,
  transports: {
    [polkadot.genesisHash]: wsProvider('wss://polkadot.api.onfinality.io/public-ws'),
    [kusama.genesisHash]: wsProvider('wss://kusama-rpc.polkadot.io'),
    [gebSignet.genesisHash]: wsProvider('wss://signet.geb.network/ws')
  }
});


createRoot(document.getElementById('root')!).render(
  <LunoKitProvider config={lunoConfig}>
    <StrictMode>
      <App/>
    </StrictMode>
  </LunoKitProvider>
)
