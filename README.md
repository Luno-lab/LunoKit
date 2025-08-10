- # LunoKit ( In Development )
> ⚠️ **Early Development**

<div align="center">

[![npm version](https://img.shields.io/npm/v/@luno-kit/ui.svg?style=flat&colorA=000000&colorB=000000)](https://www.npmjs.com/package/@luno-kit/ui)
[![npm downloads](https://img.shields.io/npm/dm/@luno-kit/ui.svg?style=flat&colorA=000000&colorB=000000)](https://www.npmjs.com/package/@luno-kit/ui)
[![codecov](https://codecov.io/gh/Luno-lab/LunoKit/branch/main/graph/badge.svg)](https://codecov.io/gh/Luno-lab/LunoKit)
[![Ask DeepWiki](https://deepwiki.com/badge.svg)](https://deepwiki.com/Luno-lab/LunoKit)
[![license](https://img.shields.io/badge/license-MIT-black?style=flat&colorA=000000&colorB=000000)](https://github.com/Luno-lab/LunoKit/blob/main/LICENSE)

[![typescript](https://img.shields.io/badge/TypeScript-Ready-black?style=flat&colorA=000000&colorB=000000&logo=typescript)](https://www.typescriptlang.org/)
[![react](https://img.shields.io/badge/React-18+-black?style=flat&colorA=000000&colorB=000000&logo=react)](https://reactjs.org/)
[![polkadot](https://img.shields.io/badge/Polkadot-Ready-black?style=flat&colorA=000000&colorB=000000&logo=polkadot)](https://polkadot.network/)

**The best way to connect Polkadot wallets 🚀**

</div>

Luno Kit is a React library that makes it easy to add Polkadot wallet connection to your dapp.

* 🎨 **Beautiful UI components** - Ready-to-use wallet connection button
* ✅ **Easily customizable** - Flexible theming and styling options
* 🔌 **Multi-wallet support** - Support for major Polkadot ecosystem wallets
* 🌐 **Multi-chain ready** - Polkadot, Kusama and parachain support
* 🦄 **Built for React** - TypeScript-first with modern React patterns

## Features

- 🔌 **Unified Wallet Interface** - Single API for all Polkadot ecosystem wallets
- 🎨 **Customizable Themes** - Complete design system with dark/light mode
- ⚡ **TypeScript First** - Full type safety and IntelliSense support
- 📱 **Responsive Design** - Mobile-first UI components
- 🔄 **Real-time Updates** - Automatic balance and account updates
- 🌐 **Multi-chain Support** - Polkadot, Kusama, parachains and custom chains
- ⚙️ **Custom Chain Support** - Easy integration with any Substrate-based chain

## ⚡ Quick Demo

**[🚀 Try it live](https://demo.lunolab.xyz/)** - Experience Luno Kit in action!

*This is the online version of our `with-vite` example - connect your Polkadot wallet and explore all features.*

### 🎮 What you can try:
- 🔌 Connect Polkadot{.js} or SubWallet
- 🌐 Switch between Polkadot, Kusama, Westend, Paseo chains
- 💰 View account balances
- ✍️ Sign messages
- 💸 Send transactions

## Installation & Usage

### UI Components Only
```bash
# pnpm
pnpm add @luno-kit/ui @luno-kit/react @tanstack/react-query

# yarn
yarn add @luno-kit/ui @luno-kit/react @tanstack/react-query

# npm
npm install @luno-kit/ui @luno-kit/react @tanstack/react-query
```

### With React Hooks
```bash
# pnpm
pnpm add @luno-kit/react @tanstack/react-query

# yarn
yarn add @luno-kit/react @tanstack/react-query

# npm
npm install @luno-kit/react @tanstack/react-query
```

## Quick start

### Basic setup

```tsx
import { LunoKitProvider, ConnectButton } from '@luno-kit/ui'
import { createConfig, defineChain, kusama, polkadot, polkadotjs, subwallet, westend, paseo } from '@luno-kit/react'
import '@luno-kit/ui/styles.css'

const config = createConfig({
  appName: 'My Luno App',
  chains: [polkadot, kusama, westend, paseo],
  connectors: [polkadotjs(), subwallet()],
  autoConnect: true,
})

/* 
// Custom chain example:
const customChain = defineChain({
  genesisHash: '0x1234...', // Your chain's genesis hash
  name: 'My Custom Chain',
  nativeCurrency: { name: 'Custom Token', symbol: 'CUSTOM', decimals: 12 },
  rpcUrls: { webSocket: ['wss://my-chain-rpc.example.com'] },
  ss58Format: 42,
  blockExplorers: { default: { name: 'Explorer', url: 'https://explorer.example.com' } },
  chainIconUrl: 'https://example.com/icon.png',
  testnet: true
})

// Then use: chains: [customChain]
*/

function App() {
  return (
    <LunoKitProvider config={config}>
      <ConnectButton />
    </LunoKitProvider>
  )
}
```

### Using with React Hooks

```tsx
import { LunoKitProvider } from '@luno-kit/ui'
import { useAccount, useBalance, useConnect, ConnectionStatus } from '@luno-kit/react'

function WalletInfo() {
  const { account } = useAccount()
  const { data: balance } = useBalance({ address });
  const { connect, connectors, status } = useConnect()

  if (status !== ConnectionStatus.Connected) {
    return (
      <button onClick={() => connect({ connectorId: connectors[0].id })}>
        Connect Wallet
      </button>
    )
  }

  return (
    <div>
      <div>Account: {account?.name}</div>
      <div>Address: {account?.address}</div>
      <div>Transferable Balance: {balance?.formattedTransferable}</div>
      <div>Total Balance: {balance?.formattedTotal}</div>
    </div>
  )
}

function App() {
  return (
    <LunoKitProvider config={config}>
      <WalletInfo />
    </LunoKitProvider>
  )
}
```

## Documentation

For full documentation and examples, visit [our documentation site](#) (coming soon).

## Examples

The following examples are provided in the `examples` folder:

* `with-vite` - Vite integration (✅ Ready to run)
* `with-nextjs-app` - Next.js App Router integration (✅ Ready to run)
* `with-nextjs-pages` - Next.js Pages Router integration (✅ Ready to run)
* `with-cra` - Create React App integration (✅ Ready to run)
* `with-remix` - Remix integration (coming soon)

### Running examples

To run an example locally:

```bash
git clone https://github.com/Luno-lab/LunoKit.git
cd LunoKit

# Install dependencies
pnpm install

# Build packages
pnpm build

# Start with-vite example
pnpm --filter with-vite dev

# Start with-nextjs-app example
pnpm --filter with-nextjs-app dev

# Start with-nextjs-pages example
pnpm --filter with-nextjs-pages dev

# Start with-cra example
pnpm --filter with-cra start
```

## API Reference

### UI Components (`@luno-kit/ui`)

* `<ConnectButton />` - Main wallet connection component
* `<LunoKitProvider />` - Context provider for the app

### React Hooks (`@luno-kit/react`)

> **Note:** To use these hooks directly, you need to install `@luno-kit/react` separately.

#### Account Management
* `useAccount()` - Get current connected account information and formatted address
* `useAccounts()` - Get all available accounts from connected wallet
* `useActiveConnector()` - Get currently active wallet connector instance

#### Connection Management
* `useConnect()` - Connect to wallets and manage connection state
* `useConnectors()` - Get available connectors
* `useDisconnect()` - Disconnect from wallet
* `useStatus()` - Get connection status

#### Chain & Network
* `useChain()` - Get current chain information
* `useChains()` - Get all available chains
* `useSwitchChain()` - Switch between chains
* `useGenesisHash()` - Get chain genesis hash
* `useSs58Format()` - Get chain SS58 format

#### Blockchain Data
* `useApi()` - Get Polkadot API instance
* `useBalance()` - Get account balance
* `useBlockNumber()` - Get current block number
* `useRuntimeVersion()` - Get runtime version
* `useSubscription()` - Subscribe to blockchain data

#### Transactions & Signing
* `useSendTransaction()` - Send transactions and get full result
* `useSendTransactionHash()` - Send transactions and get transaction hash
* `useSignMessage()` - Sign messages
* `useSigner()` - Get signer instance

#### Configuration & Utils
* `useConfig()` - Get Luno configuration

## Package Structure

- `@luno-kit/ui` - UI component library with built-in components
- `@luno-kit/react` - React Hooks and Provider (core functionality, includes dedot integration)
- `@luno-kit/core` - Core connectors and utilities

## License

Licensed under the [MIT License](LICENSE).

