import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { createConfig } from '@luno-kit/react';
import {
  kusama,
  kusamaAssetHub,
  kusamaCoretime,
  kusamaPeople,
  paseo,
  paseoAssetHub,
  paseoPassetHub,
  polkadot,
  polkadotAssetHub,
  polkadotCollectives,
  polkadotCoretime,
  polkadotPeople,
  westend,
  westendAssetHub,
} from '@luno-kit/react/chains';
import {
  enkryptConnector,
  fearlessConnector,
  mimirConnector,
  novaConnector,
  polkadotjsConnector,
  polkagateConnector,
  subwalletConnector,
  talismanConnector,
  walletConnectConnector,
} from '@luno-kit/react/connectors';
import { LunoKitProvider } from '@luno-kit/ui';
import App from './App.tsx';
import '@luno-kit/ui/styles.css';

const connectors = [
  polkadotjsConnector(),
  subwalletConnector(),
  talismanConnector(),
  polkagateConnector(),
  fearlessConnector(),
  mimirConnector(),
  enkryptConnector(),
  walletConnectConnector({ projectId: import.meta.env.VITE_WALLET_CONNECT_ID }),
  novaConnector({ projectId: import.meta.env.VITE_WALLET_CONNECT_ID }),
];

const lunoConfig = createConfig({
  appName: 'luno with-vite example',
  chains: [
    polkadot,
    kusama,
    westend,
    paseo,
    polkadotAssetHub,
    polkadotCoretime,
    polkadotCollectives,
    polkadotPeople,
    kusamaAssetHub,
    kusamaCoretime,
    kusamaPeople,
    paseoAssetHub,
    paseoPassetHub,
    westendAssetHub,
  ],
  connectors: connectors,
  autoConnect: true,
  subscan: {
    apiKey: import.meta.env.VITE_SUBSCAN_API_KEY,
  },
});

createRoot(document.getElementById('root')!).render(
  <LunoKitProvider
    config={lunoConfig}
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
      <App />
    </StrictMode>
  </LunoKitProvider>
);
