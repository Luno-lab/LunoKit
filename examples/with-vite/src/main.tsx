import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { createConfig } from '@luno-kit/react';
import {
  type Chain,
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
  onekeyConnector,
} from '@luno-kit/react/connectors';
import { LunoKitProvider } from '@luno-kit/ui';
import App from './App.tsx';
import '@luno-kit/ui/styles.css';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query'

const connectors = [
  polkadotjsConnector(),
  subwalletConnector(),
  talismanConnector(),
  polkagateConnector(),
  fearlessConnector(),
  mimirConnector(),
  enkryptConnector(),
  onekeyConnector(),
  walletConnectConnector({ projectId: import.meta.env.VITE_WALLET_CONNECT_ID }),
  novaConnector({ projectId: import.meta.env.VITE_WALLET_CONNECT_ID }),
];

// Custom chains
const astar: Chain = {
  genesisHash: '0x9eb76c5184c4ab8679d2d5d819fdf90b9c001403e9e17da2e14b6d8aec4029c6',
  name: 'Astar',
  nativeCurrency: { name: 'Astar', symbol: 'ASTR', decimals: 18 },
  rpcUrls: {
    webSocket: [
      'wss://astar.api.onfinality.io/public-ws',
      'wss://astar-rpc.dwellir.com',
      'wss://astar.public.curie.radiumblock.co/ws',
      'wss://1rpc.io/astr',
    ],
    http: [
      'https://astar.api.onfinality.io/public',
      'https://astar-rpc.dwellir.com',
      'https://astar.public.curie.radiumblock.co/http',
      'https://astar.public.blastapi.io',
    ],
  },
  ss58Format: 5,
  blockExplorers: {
    default: { name: 'Subscan', url: 'https://astar.subscan.io' },
  },
  chainIconUrl: 'https://astar.subscan.io/_next/image?url=%2Fchains%2Fastar%2Flogo-mini.png&w=256&q=75',
  testnet: false,
  subscan: {
    url: 'https://astar.subscan.io',
    api: 'https://astar.api.subscan.io',
  },
};

const hydration: Chain = {
  genesisHash: '0xafdc188f45c71dacbaa0b62e16a91f726c7b8699a9748cdf715459de6b7f366d',
  name: 'Hydration',
  nativeCurrency: { name: 'Hydration', symbol: 'HDX', decimals: 12 },
  rpcUrls: {
    webSocket: [
      'wss://hydradx-rpc.dwellir.com',
      'wss://rpc.hydradx.cloud',
      'wss://hydradx.api.onfinality.io/public-ws',
      'wss://rpc.helikon.io/hydradx',
    ],
    http: [
      'https://hydradx-rpc.dwellir.com',
      'https://rpc.hydradx.cloud',
      'https://hydradx.api.onfinality.io/public',
      'https://rpc.helikon.io/hydradx',
    ],
  },
  ss58Format: 63,
  blockExplorers: {
    default: { name: 'Subscan', url: 'https://hydradx.subscan.io' },
  },
  chainIconUrl: 'https://hydration.subscan.io/_next/image?url=%2Fchains%2Fhydration%2Ftokens%2FHDX.png&w=128&q=75',
  testnet: false,
  subscan: {
    url: 'https://hydradx.subscan.io',
    api: 'https://hydradx.api.subscan.io',
  },
};

const lunoConfig = createConfig({
  appName: 'luno with-vite example',
  chains: [
    polkadot,
    kusama,
    westend,
    paseo,
    astar,
    hydration,
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

const queryClient = new QueryClient();

createRoot(document.getElementById('root')!).render(
  <QueryClientProvider client={queryClient}>
    <LunoKitProvider
      appInfo={{
        // decorativeImage: {
        //   light: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/24/LEGO_logo.svg/1024px-LEGO_logo.svg.png',
         
        // },
        guideText: 'New to wallets?',
        guideLink: 'https://polkadot.com/get-started/wallets/',
        description: 'Connect your wallet to start exploring and interacting with DApps.',
        policyLinks: {
          terms: 'https://termsofservice.xyz',
          privacy: 'https://disclaimer.xyz',
        },
      }}
      config={{ ...lunoConfig, 
        // modalSize: 'compact' 
      }}
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
  </QueryClientProvider>
);
