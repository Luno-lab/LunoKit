# Luno

<div align="center">

[![npm version](https://img.shields.io/npm/v/@luno/ui.svg?style=flat&colorA=000000&colorB=000000)](https://www.npmjs.com/package/@luno/ui)
[![npm downloads](https://img.shields.io/npm/dm/@luno/ui.svg?style=flat&colorA=000000&colorB=000000)](https://www.npmjs.com/package/@luno/ui)
[![bundle size](https://img.shields.io/bundlephobia/minzip/@luno/ui?style=flat&colorA=000000&colorB=000000)](https://bundlephobia.com/package/@luno/ui)
[![license](https://img.shields.io/badge/license-Apache%202.0-black?style=flat&colorA=000000&colorB=000000)](https://github.com/Luno-lab/LunoKit/blob/main/LICENSE)

[![typescript](https://img.shields.io/badge/TypeScript-Ready-black?style=flat&colorA=000000&colorB=000000&logo=typescript)](https://www.typescriptlang.org/)
[![react](https://img.shields.io/badge/React-18+-black?style=flat&colorA=000000&colorB=000000&logo=react)](https://reactjs.org/)
[![polkadot](https://img.shields.io/badge/Polkadot-Ready-black?style=flat&colorA=000000&colorB=000000&logo=polkadot)](https://polkadot.network/)

</div>

<div align="center">

**English** | [中文](./README.zh-CN.md)

</div>

A modern Polkadot wallet connection library that provides a complete wallet integration solution for React applications.

## ✨ Features

- 🎨 **Ready-to-use UI Components** - Beautiful wallet connection button with built-in account and chain management
- 🔌 **Multi-wallet Support** - Support for mainstream Polkadot ecosystem wallets
- ⚛️ **React First** - Hooks API designed specifically for React applications
- 🌐 **Multi-chain Support** - Support for Polkadot, Kusama and other ecosystem chains
- 💾 **State Persistence** - Automatically save connection state and account selection
- 🎯 **TypeScript** - Full type safety support
- 📱 **Responsive Design** - Mobile-friendly UI components

## 📦 Package Structure

- `@luno/ui` - UI component library (includes all dependencies, ready to use)
- `@luno/react` - React Hooks and Provider (automatically imported via ui package)
- `@luno/core` - Core connectors and utilities (automatically imported via ui package)

## 🚀 Quick Start

### 1. Installation

```bash
# Only need to install one package
pnpm add @luno/ui
```

### 2. Create Configuration

```tsx
import { createConfig, polkadot, kusama, wsProvider } from '@luno/core'
import type { Config } from '@luno/core'

const lunoConfig: Config = createConfig({
  appName: 'My Polkadot App',
  chains: [polkadot, kusama],
  connectors: connectors, // Your connector array
  autoConnect: true,
  transports: {
    [polkadot.genesisHash]: wsProvider('wss://polkadot.api.onfinality.io/public-ws'),
    [kusama.genesisHash]: wsProvider('wss://kusama-rpc.polkadot.io'),
  }
})
```

### 3. Setup Provider

```tsx
import { LunoKitProvider } from '@luno/ui'

function App() {
  return (
    <LunoKitProvider config={lunoConfig}>
      <YourApp />
    </LunoKitProvider>
  )
}
```

### 4. Use ConnectButton

```tsx
import { ConnectButton } from '@luno/ui'

function YourApp() {
  return (
    <div>
      <h1>My Polkadot App</h1>
      <ConnectButton />
    </div>
  )
}
```

### 5. Use React Hooks

```tsx
import { useAccount, useAccounts, useBalance } from '@luno/react'

function WalletInfo() {
  const { account, isConnected } = useAccount()
  const { accounts } = useAccounts()
  const { balance } = useBalance()

  if (!isConnected) {
    return <div>Please connect wallet</div>
  }

  return (
    <div>
      <div>Current Account: {account?.name}</div>
      <div>Address: {account?.address}</div>
      <div>Transferable Balance: {balance?.formattedTransferable}</div>
      <div>Total Balance: {balance?.formattedTotal}</div>
    </div>
  )
}
```

## 🎨 UI Components

### ConnectButton

`ConnectButton` is the only UI component you need to use directly. It includes a complete wallet connection flow:

- Wallet connection/disconnection
- Account selection and switching
- Chain network selection
- Account details display

```tsx
import { ConnectButton } from '@luno/ui'

// Basic usage
<ConnectButton />

// Custom styling
<ConnectButton className="my-custom-class" />
```

## 📖 React Hooks API

### Account Related

- `useAccount()` - Get current account information
- `useAccounts()` - Get all account list
- `useConnect()` - Connect wallet
- `useDisconnect()` - Disconnect wallet

### Chain Related

- `useChain()` - Get current chain information
- `useSwitchChain()` - Switch chain

### Balance Related

- `useBalance()` - Get account balance
    - `balance.formattedTransferable` - Transferable balance
    - `balance.formattedTotal` - Total balance

## 🛠️ Development

```bash
# Clone repository
git clone https://github.com/Luno-lab/LunoKit.git

# Install dependencies
pnpm install

# Start development
pnpm dev

# Build
pnpm build

# Run storybook
pnpm --filter @luno/ui storybook
```

## 📄 License

Apache-2.0
