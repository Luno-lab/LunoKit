import {coinbaseEvmWallet} from '../../../config/logos/generated'
import {injectedConnector} from './injected'

export const coinbaseConnector = () => injectedConnector({
  id: 'coinbase',
  name: 'Coinbase',
  icon: coinbaseEvmWallet,
  links: {
    browserExtension: 'https://chrome.google.com/webstore/detail/coinbase-wallet-extension/hnfanknocfeofbddgcijnmhnfnkdnaad',
  },
  rdns: 'com.coinbase.wallet',
})
