import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { createConfig } from '@luno-kit/react'
import { kusama, polkadot, westend, paseo, polkadotAssetHub, polkadotCoretime, polkadotCollectives, polkadotPeople, kusamaAssetHub, kusamaCoretime, kusamaPeople, paseoAssetHub, paseoPassetHub, westendAssetHub } from '@luno-kit/react/chains'
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
  chains: [polkadot, kusama, westend, paseo, polkadotAssetHub, polkadotCoretime, polkadotCollectives, polkadotPeople, kusamaAssetHub, kusamaCoretime, kusamaPeople, paseoAssetHub, paseoPassetHub, westendAssetHub],
  connectors: connectors,
  autoConnect: true,
});



createRoot(document.getElementById('root')!).render(
    <LunoKitProvider config={lunoConfig}
     // ============ THEME USAGE EXAMPLES ============

     // 1. No theme prop - uses built-in light/dark themes
     // (Uncomment this by removing all theme props below)

     // 2. Only defaultMode - sets initial theme, allows user switching
     // theme={{ defaultMode: 'dark' }}

     // 3. Auto mode enabled - follows system preference
     // theme={{ autoMode: true }}

     // 4. Auto mode with defaultMode fallback
     // theme={{ autoMode: true, defaultMode: 'dark' }}

     // 5. Partial theme overrides for dark mode only
    //  theme={{
    //    defaultMode: 'dark',
    //    dark: {
    //      colors: {
    //        accentColor: '#AC1824',
    //        modalBackground: '#1a1a1a',
    //      },
    //      radii: {
    //        modal: '20px'
    //      }
    //    }
    //  }}

     // 6. Partial theme overrides for light mode only
    //  theme={{
    //    defaultMode: 'light',
    //    light: {
    //      colors: {
    //        accentColor: '#C5CF4E',
    //        modalBackground: '#ffffff',
    //      },
    //      radii: {
    //        modal: '8px'
    //      }
    //    }
    //  }}

     // 7. Partial overrides for both modes
    //  theme={{
    //    defaultMode: 'dark',
    //    dark: {
    //      colors: {
    //        accentColor: '#AC1824',
    //      },
    //      radii: {
    //        modal: '30px'
    //      }
    //    },
    //    light: {
    //      colors: {
    //        accentColor: '#C5CF4E',
    //      },
    //      radii: {
    //        modal: '4px'
    //      }
    //    }
    //  }}

     // 8. Complete custom theme object
    //  theme={{
    //    colors: {
    //      accentColor: '#ff6b35',
    //      modalBackground: '#2d2d2d',
    //      modalText: '#ffffff',
    //      connectButtonBackground: '#ff6b35',
    //      connectButtonText: '#ffffff',
    //      walletSelectItemBackground: '',
    //      walletSelectItemBackgroundHover: '',
    //      walletSelectItemText: '',
    //      connectButtonInnerBackground: '',
    //      accountActionItemBackground: '',
    //      accountActionItemBackgroundHover: '',
    //      accountActionItemText: '',
    //      accountSelectItemBackground: '',
    //      accountSelectItemBackgroundHover: '',
    //      accountSelectItemText: '',
    //      currentNetworkButtonBackground: '',
    //      currentNetworkButtonText: '',
    //      networkSelectItemBackground: '',
    //      networkSelectItemBackgroundHover: '',
    //      networkSelectItemText: '',
    //      navigationButtonBackground: '',
    //      separatorLine: '',
    //      modalBackdrop: '',
    //      modalBorder: '',
    //      modalTextSecondary: '',
    //      modalControlButtonBackgroundHover: '',
    //      modalControlButtonText: '',
    //      success: '',
    //      successForeground: '',
    //      warning: '',
    //      warningForeground: '',
    //      error: '',
    //      errorForeground: '',
    //      info: '',
    //      infoForeground: '',
    //      skeleton: ''
    //    },
    //    fonts: {
    //      body: '-apple-system, BlinkMacSystemFont, sans-serif',
    //      heading: 'Georgia, serif',
    //      mono: ''
    //    },
    //    radii: {
    //      modal: '16px',
    //      connectButton: '12px',
    //      walletSelectItem: '',
    //      modalControlButton: '',
    //      accountActionItem: '',
    //      accountSelectItem: '',
    //      currentNetworkButton: '',
    //      networkSelectItem: ''
    //    },
    //    shadows: {
    //      modal: '0 20px 40px rgba(0,0,0,0.3)',
    //      button: ''
    //    },
    //    blurs: {
    //      modalOverlay: '8px',
    //    }
    //  }}

     // 9. Complete theme via theme property in overrides
    //  theme={{
    //    light: {
    //      colors: {
    //        accentColor: '#9b59b6',
    //        modalBackground: '#34495e',
    //        modalText: '#ecf0f1',
    //        connectButtonBackground: '#9b59b6',
    //        connectButtonText: '#ffffff',
    //      },
    //      fonts: {
    //        body: 'Inter, sans-serif',
    //        heading: 'Inter, sans-serif',
    //      },
    //      radii: {
    //        modal: '24px',
    //        connectButton: '16px',
    //      },
    //      shadows: {
    //        modal: '0 25px 50px rgba(155, 89, 182, 0.3)',
    //      },
    //      blurs: {
    //        modalOverlay: '12px',
    //      }
    //    }
    //  }}

  >
    <StrictMode>
      <App/>
    </StrictMode>
  </LunoKitProvider>
)
