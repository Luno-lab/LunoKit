import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { createConfig, kusama, polkadot, polkadotjs, subwallet, westend, paseo } from '@luno-kit/react'
import { LunoKitProvider, lunokitDarkTheme } from '@luno-kit/ui'
import '@luno-kit/ui/dist/styles.css'

const connectors = [
  polkadotjs(), subwallet()
]

const lunoConfig = createConfig({
  appName: 'luno with-vite example',
  chains: [polkadot, kusama, westend, paseo],
  connectors: connectors,
  autoConnect: true,
});

createRoot(document.getElementById('root')!).render(
  <LunoKitProvider 
    config={lunoConfig} 
  >
    <StrictMode>
      <App/>
    </StrictMode>
  </LunoKitProvider>
)
