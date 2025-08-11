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
  walletConnectConnector({ projectId: process.env.NEXT_PUBLIC_WALLET_CONNECT_ID }),
  novaConnector({ projectId: process.env.NEXT_PUBLIC_WALLET_CONNECT_ID }),
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
