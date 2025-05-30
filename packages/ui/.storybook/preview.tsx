// packages/ui/.storybook/preview.tsx
import type { Preview, Decorator } from '@storybook/react';
import React from 'react';
import { withThemeByClassName } from '@storybook/addon-themes';
import { LunoKitProvider } from '../src/providers';
import type {Chain, Config, Config as LunoCoreConfig, Connector} from '@luno-kit/core';

// Import your compiled Tailwind CSS
import '../dist/styles.css';
import {createConfig, kusama, polkadot, polkadotjs, subwallet, wsProvider} from '@luno-kit/core'

const gebSignet: Chain = {
  genesisHash: '0xe676fe35e3e2a37fb911ab4ec0857870f1cdc10b04a7b2f0f64eb31e9a142067',
  name: 'geb-signet',
  nativeCurrency: { name: 'GEB', symbol: 'GEB', decimals: 8 },
  rpcUrls: { webSocket: ['wss://signet.geb.network/ws'] },
  ss58Format: 44,
  testnet: true,
};

const supportedChains: readonly Chain[] = [polkadot, gebSignet];

const connectors = [
  polkadotjs(), subwallet()
];

const lunoConfig: Config = createConfig({
  appName: 'luno with-vite example',
  chains: supportedChains,
  connectors: connectors as Connector[],
  autoConnect: true,
  transports: {
    [polkadot.genesisHash]: wsProvider('wss://polkadot.api.onfinality.io/public-ws'),
    [kusama.genesisHash]: wsProvider('wss://kusama-rpc.polkadot.io'),
    [gebSignet.genesisHash]: wsProvider('wss://signet.geb.network/ws')
  }
});


// Global decorator to wrap all stories with LunoKitProvider
const withLunoKitProvider: Decorator = (Story) => (
  <LunoKitProvider config={lunoConfig} theme="light">
    <Story />
  </LunoKitProvider>
);

export const decorators: Decorator[] = [
  withLunoKitProvider,
  withThemeByClassName({
    themes: {
      light: '',
      dark: 'dark',
    },
    defaultTheme: 'light',
  }),
];

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export default preview;
