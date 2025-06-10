import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import {createConfig, kusama, LunoKitProvider, polkadot, polkadotjs, subwallet, wsProvider, westend, paseo} from '@luno-kit/ui'
import '@luno-kit/ui/dist/styles.css'

const connectors = [
  polkadotjs(), subwallet()
]

const lunoConfig = createConfig({
  appName: 'luno with-vite example',
  chains: [polkadot, kusama, westend, paseo],
  connectors: connectors,
  autoConnect: true,
  transports: {
    [polkadot.genesisHash]: wsProvider('wss://polkadot.api.onfinality.io/public-ws'),
    [kusama.genesisHash]: wsProvider('wss://kusama-rpc.polkadot.io'),
    [westend.genesisHash]: wsProvider('wss://westend-rpc.polkadot.io'),
    [paseo.genesisHash]: wsProvider('wss://pas-rpc.stakeworld.io')
  }
});


createRoot(document.getElementById('root')!).render(
  <LunoKitProvider config={lunoConfig}>
    <StrictMode>
      <App/>
    </StrictMode>
  </LunoKitProvider>
)
