import {okxEvmWallet} from '../../../config/logos/generated'
import {injectedConnector} from './injected'

export const okxConnector = () => injectedConnector({
  id: 'okxwallet',
  name: 'OKX Wallet',
  icon: okxEvmWallet,
  links: {
    browserExtension: 'https://chromewebstore.google.com/detail/okx-wallet/mcohilncbfahbmgdjkbpemcciiolgcge',
  },
  rdns: 'com.okex.wallet',
})
