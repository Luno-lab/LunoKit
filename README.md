# LunoKit

<div align="center">

[![npm version](https://img.shields.io/npm/v/@luno-kit/ui.svg)](https://www.npmjs.com/package/@luno-kit/ui)
[![npm downloads](https://img.shields.io/npm/dm/@luno-kit/ui.svg)](https://www.npmjs.com/package/@luno-kit/ui)
[![CI](https://github.com/Luno-lab/LunoKit/actions/workflows/pr-check.yml/badge.svg)](https://github.com/Luno-lab/LunoKit/actions/workflows/pr-check.yml)
[![codecov](https://codecov.io/gh/Luno-lab/LunoKit/branch/main/graph/badge.svg)](https://codecov.io/gh/Luno-lab/LunoKit)
[![Ask DeepWiki](https://deepwiki.com/badge.svg)](https://deepwiki.com/Luno-lab/LunoKit)

</div>

Luno Kit is a React library that makes it easy to add Polkadot wallet connection to your dapp.

* 🎨 **Beautiful UI components** - Ready-to-use wallet connection button
* ✅ **Easily customizable** - Flexible theming and styling options
* 🔌 **Multi-wallet support** - Support for major Polkadot ecosystem wallets
* 🌐 **Multi-chain ready** - Polkadot, Kusama and parachain support
* 🦄 **Built for React** - TypeScript-first with modern React patterns

## Documentation

For full documentation, visit [docs.lunolab.xyz](https://docs.lunolab.xyz/).

## 🚀 Quick Start

```bash
pnpm add @luno-kit/ui @luno-kit/react @tanstack/react-query
```

```tsx
import { LunoKitProvider, ConnectButton } from '@luno-kit/ui'
import { createConfig, polkadot, polkadotjs, subwallet } from '@luno-kit/react'
import '@luno-kit/ui/styles.css'

const config = createConfig({
  appName: 'My Luno App',
  chains: [polkadot],
  connectors: [polkadotjs(), subwallet()],
})

function App() {
  return (
    <LunoKitProvider config={config}>
      <ConnectButton />
    </LunoKitProvider>
  )
}
```
