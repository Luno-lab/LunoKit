"use client";

import { LunoKitProvider } from '@luno-kit/ui'
import { createConfig, kusama, polkadot, westend, polkagateConnector, subwalletConnector, talismanConnector, polkadotjsConnector, walletConnectConnector, novaConnector } from '@luno-kit/react'

const connectors = [
  polkadotjsConnector(),
  subwalletConnector(),
  talismanConnector(),
  polkagateConnector(),
  walletConnectConnector({ projectId: 'e5f0efe345290300d7320b5fa67bb6a4' }),
  novaConnector({ projectId: 'e5f0efe345290300d7320b5fa67bb6a4' }),
]

const lunoConfig = createConfig({
  appName: 'LunoKit Next.js App Router Example',
  chains: [polkadot, kusama, westend],
  connectors,
  autoConnect: true,
})

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <LunoKitProvider config={lunoConfig}>
      {children}
    </LunoKitProvider>
  )
}
