import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import { createConfig } from '@luno-kit/react'
import { polkagateConnector, subwalletConnector, talismanConnector, polkadotjsConnector, walletConnectConnector, novaConnector, fearlessConnector, mimirConnector, enkryptConnector } from '@luno-kit/react/connectors'
import { LunoKitProvider } from '@luno-kit/ui'
import '@luno-kit/ui/styles.css'
import { CHAINS } from './constants'

const supportedChains = Object.values(CHAINS).map(c => c.genesisHash)

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
    supportedChains,
  }),
  novaConnector({
    projectId: import.meta.env.VITE_WALLET_CONNECT_ID,
    supportedChains
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
