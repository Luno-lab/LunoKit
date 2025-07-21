import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { createConfig, kusama, polkadot, westend, paseo, polkagateConnector, subwalletConnector, talismanConnector, polkadotjsConnector, walletConnectConnector, novaConnector } from '@luno-kit/react'
import { LunoKitProvider } from '@luno-kit/ui'
import '@luno-kit/ui/dist/styles.css'

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

createRoot(document.getElementById('root')!).render(
  <LunoKitProvider config={lunoConfig}>
    <StrictMode>
      <App/>
    </StrictMode>
  </LunoKitProvider>
)
