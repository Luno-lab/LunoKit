# Luno

LUNO（POlkadot MAster或POlkadot MAkes it）是一个用于Polkadot生态系统的React开发库，提供类似于wagmi的开发体验。

## 功能特性

- 💼 完整的Polkadot生态支持
- 🔄 React Hooks API
- 🧩 模块化和可扩展性
- 📦 开箱即用的常用链和钱包
- 🔌 SSR支持
- 🛠️ 基于TanStack Query的缓存

## 安装

```bash
# npm
npm install @luno/react @luno/core @tanstack/react-query

# yarn
yarn add @luno/react @luno/core @tanstack/react-query

# pnpm
pnpm add @luno/react @luno/core @tanstack/react-query
```

## 快速开始

```tsx
import { createConfig, polkadotChain, kusamaChain } from '@luno/core'
import { WalletConnectConnector, PolkadotjsConnector } from '@luno/core/connectors'
import { LunoProvider, useConnect, useAccount, useBalance } from '@luno/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

// 创建配置
const config = createConfig({
  chains: [polkadotChain, kusamaChain],
  connectors: [
    new PolkadotjsConnector(),
    new WalletConnectConnector({
      projectId: 'YOUR_PROJECT_ID',
    }),
  ],
})

// 创建QueryClient
const queryClient = new QueryClient()

// 包装你的应用
function App() {
  return (
    <LunoProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <YourApp />
      </QueryClientProvider>
    </LunoProvider>
  )
}

// 在组件中使用hooks
function YourApp() {
  const { connect, connectors } = useConnect()
  const { address, isConnected } = useAccount()
  const { data: balance } = useBalance({ address })

  return (
    <div>
      {isConnected ? (
        <>
          <div>连接地址: {address}</div>
          <div>余额: {balance?.formatted} {balance?.symbol}</div>
        </>
      ) : (
        <button onClick={() => connect({ connector: connectors[0] })}>
          连接钱包
        </button>
      )}
    </div>
  )
}
```

## 包结构

- `@luno/core` - 核心库，包含配置、连接器和公共工具
- `@luno/react` - React hooks和组件

## 许可证

MIT 
