import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import { createConfig } from '@luno-kit/react'
import { polkagateConnector, subwalletConnector, talismanConnector, polkadotjsConnector, walletConnectConnector, novaConnector, fearlessConnector, mimirConnector, enkryptConnector } from '@luno-kit/react/connectors'
import { LunoKitProvider } from '@luno-kit/ui'
import '@luno-kit/ui/styles.css'

const connectors = [
  polkadotjsConnector(),
  subwalletConnector(),
  talismanConnector(),
  polkagateConnector(),
  fearlessConnector(),
  mimirConnector(),
  enkryptConnector(),
  walletConnectConnector({
    projectId: import.meta.env.VITE_WALLET_CONNECT_ID,
    supportedChains: [
      "polkadot:91b171bb158e2d3848fa23a9f1c25182",
      "polkadot:b0a8d493285c2df73290dfb7e61f870f",
      "polkadot:e143f23803ac50e8f6f8e62695d1ce9e",
      "polkadot:77afd6190f1554ad45fd0d31aee62aac",
      "polkadot:68d56f15f85d3136970ec16946040bc1",
      "polkadot:efb56e30d9b4a24099f88820987d0f45",
      "polkadot:46ee89aa2eedd13e988962630ec9fb75",
      "polkadot:67fa177a097bfa18f77ea95ab56e9bcd",
      "polkadot:48239ef607d7928874027a43a6768920",
      "polkadot:638cd2b9af4b3bb54b8c1f0d22711fc8",
      "polkadot:c1af4cb4eb3918e5db15086c0cc5ec17",
      "polkadot:d6eec26135305a8ad257a20d00335728",
      "polkadot:fd974cf9eaf028f5e44b9fdd1949ab03",
      "polkadot:67f9723393ef76214df0118c34bbbd3d"
    ]
  }),
  novaConnector({
    projectId: import.meta.env.VITE_WALLET_CONNECT_ID,
    supportedChains: [
      "polkadot:91b171bb158e2d3848fa23a9f1c25182",
      "polkadot:b0a8d493285c2df73290dfb7e61f870f",
      "polkadot:e143f23803ac50e8f6f8e62695d1ce9e",
      "polkadot:77afd6190f1554ad45fd0d31aee62aac",
      "polkadot:68d56f15f85d3136970ec16946040bc1",
      "polkadot:efb56e30d9b4a24099f88820987d0f45",
      "polkadot:46ee89aa2eedd13e988962630ec9fb75",
      "polkadot:67fa177a097bfa18f77ea95ab56e9bcd",
      "polkadot:48239ef607d7928874027a43a6768920",
      "polkadot:638cd2b9af4b3bb54b8c1f0d22711fc8",
      "polkadot:c1af4cb4eb3918e5db15086c0cc5ec17",
      "polkadot:d6eec26135305a8ad257a20d00335728",
      "polkadot:fd974cf9eaf028f5e44b9fdd1949ab03",
      "polkadot:67f9723393ef76214df0118c34bbbd3d"
    ]
  }),
]

const lunoConfig = createConfig({
  appName: 'luno with-vite example',
  connectors: connectors,
  autoConnect: true,
});


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <LunoKitProvider config={lunoConfig}>
      <App />
    </LunoKitProvider>
  </StrictMode>,
)
