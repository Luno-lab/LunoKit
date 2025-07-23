import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { createConfig, kusama, polkadot, polkadotjs, subwallet, westend, paseo } from '@luno-kit/react'
import { LunoKitProvider } from '@luno-kit/ui'
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
  //   theme={{ dark: {
  //     colors: {
  //       accentColor: '#AC1824',
  //     },
  //     radii: {
  //       modal:'30px'
  //     }
  //   },
  //   light: {
  //     colors: {
  //       accentColor: '#C5CF4E',
  //     },
  //     radii: {
  //       modal:'1px'
  //     }
  //   }
  // }}

  //  theme={{dark:{}}}

  >
    <StrictMode>
      <App/>
    </StrictMode>
  </LunoKitProvider>
)
