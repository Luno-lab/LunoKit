import '@/styles/globals.css'
import type { AppProps } from "next/app"
import { LunoKitProvider } from '@luno-kit/ui'
import { createConfig, kusama, polkadot, westend, polkagateConnector, subwalletConnector, talismanConnector, polkadotjsConnector, walletConnectConnector, novaConnector } from '@luno-kit/react'
import '@luno-kit/ui/styles.css'

const connectors = [
  polkadotjsConnector(),
  subwalletConnector(),
  talismanConnector(),
  polkagateConnector(),
  walletConnectConnector({ projectId: 'e5f0efe345290300d7320b5fa67bb6a4' }),
  novaConnector({ projectId: 'e5f0efe345290300d7320b5fa67bb6a4' }),
]

const lunoConfig = createConfig({
  appName: 'LunoKit Next.js Pages Example',
  chains: [polkadot, kusama, westend],
  connectors,
  autoConnect: true,
})

export default function App({ Component, pageProps }: AppProps) {
  return (
    <LunoKitProvider config={lunoConfig}>
      <Component {...pageProps} />
    </LunoKitProvider>
  );
}
