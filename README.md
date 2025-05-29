# Luno

<div align="center">

[![npm version](https://img.shields.io/npm/v/@luno/ui.svg?style=flat&colorA=000000&colorB=000000)](https://www.npmjs.com/package/@luno/ui)
[![npm downloads](https://img.shields.io/npm/dm/@luno/ui.svg?style=flat&colorA=000000&colorB=000000)](https://www.npmjs.com/package/@luno/ui)
[![bundle size](https://img.shields.io/bundlephobia/minzip/@luno/ui?style=flat&colorA=000000&colorB=000000)](https://bundlephobia.com/package/@luno/ui)
[![license](https://img.shields.io/badge/license-Apache%202.0-black?style=flat&colorA=000000&colorB=000000)](https://github.com/Luno-lab/LunoKit/blob/main/LICENSE)

[![typescript](https://img.shields.io/badge/TypeScript-Ready-black?style=flat&colorA=000000&colorB=000000&logo=typescript)](https://www.typescriptlang.org/)
[![react](https://img.shields.io/badge/React-18+-black?style=flat&colorA=000000&colorB=000000&logo=react)](https://reactjs.org/)
[![polkadot](https://img.shields.io/badge/Polkadot-Ready-black?style=flat&colorA=000000&colorB=000000&logo=polkadot)](https://polkadot.network/)

**The best way to connect Polkadot wallets 🚀**

</div>

<div align="center">

**English** | [中文](./README.zh-CN.md)

</div>

Luno is a React library that makes it easy to add Polkadot wallet connection to your dapp.

* 🎨 **Beautiful UI components** - Ready-to-use wallet connection button
* ✅ **Easily customizable** - Flexible theming and styling options
* 🔌 **Multi-wallet support** - Support for major Polkadot ecosystem wallets
* 🌐 **Multi-chain ready** - Polkadot, Kusama and parachain support
* 🦄 **Built for React** - TypeScript-first with modern React patterns

## Installation & Usage

### UI Components Only
```bash
pnpm add @luno/ui @tanstack/react-query @polkadot/api @polkadot/types @polkadot/util
```

### With React Hooks
```bash
# If you want to use React hooks directly
pnpm add @luno/react @luno/ui @tanstack/react-query @polkadot/api @polkadot/types @polkadot/util
```

## Quick start

### Basic setup

```tsx
import { LunoKitProvider, ConnectButton } from '@luno/ui'
import { createConfig, polkadot, kusama, wsProvider, polkadotjs, subwallet } from '@luno/core'
import type { Config } from '@luno/core'

const config: Config = createConfig({
  appName: 'My Polkadot App',
  chains: [polkadot, kusama],
  connectors: [polkadotjs(), subwallet()],
  autoConnect: true,
  transports: {
    [polkadot.genesisHash]: wsProvider('wss://polkadot.api.onfinality.io/public-ws'),
    [kusama.genesisHash]: wsProvider('wss://kusama-rpc.polkadot.io'),
  }
})

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
import { LunoKitProvider } from '@luno/ui'
import { useAccount, useBalance, useConnect } from '@luno/react'

function WalletInfo() {
  const { account, isConnected } = useAccount()
  const { balance } = useBalance()
  const { connect, connectors } = useConnect()

  if (!isConnected) {
    return (
      <button onClick={() => connect(connector[0].Id)}>
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

### Try it out

You can try out Luno with these CodeSandbox examples:

* [with Create React App](#) (coming soon)
* [with Next.js](#) (coming soon)
* [with Vite](#) (coming soon)

## Examples

The following examples are provided in the `examples` folder:

* `with-next` - Next.js integration
* `with-vite` - Vite integration
* `with-cra` - Create React App integration

### Running examples

To run an example locally:

```bash
# Install dependencies
pnpm install

# Go to example directory
cd examples/with-next

# Start development server
pnpm dev
```

## API Reference

### UI Components (`@luno/ui`)

* `<ConnectButton />` - Main wallet connection component
* `<LunoKitProvider />` - Context provider for the app

### React Hooks (`@luno/react`)

> **Note:** To use these hooks directly, you need to install `@luno/react` separately.

#### Account Management
* `useAccount()` - Get current account information
* `useAccounts()` - Get all connected accounts
* `useActiveConnector()` - Get currently active connector

#### Connection Management
* `useConnect()` - Connect to wallets
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
* `useSendTransaction()` - Send transactions
* `useSignMessage()` - Sign messages
* `useLunoMutation()` - Handle async mutations

#### Configuration & Utils
* `useConfig()` - Get Luno configuration
* `useLuno()` - Get Luno store instance

## Package Structure

- `@luno/ui` - UI component library (includes all dependencies, ready to use)
- `@luno/react` - React Hooks and Provider
- `@luno/core` - Core connectors and utilities

## Contributing

Please read our [contributing guidelines](CONTRIBUTING.md) before submitting PRs.

## License

Licensed under the Apache 2.0 License, Copyright © 2024-present Luno Labs.

See [LICENSE](LICENSE) for more information.

## About

The best way to connect Polkadot wallets 🚀

### Keywords

polkadot  substrate  react  ui  components  luno  wallet  dapp  web3

### Resources

Readme

### License

Apache 2.0 license
