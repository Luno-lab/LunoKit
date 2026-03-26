import {subwalletEvmWallet} from '../../../config/logos/generated'
import {injectedConnector} from './injected'

export const subwalletConnector = () => injectedConnector({
  id: 'subwallet',
  name: 'Subwallet',
  icon: subwalletEvmWallet,
  links: {
    browserExtension:
      'https://chromewebstore.google.com/detail/subwallet-polkadot-wallet/onhogfjeacnfoofkfgppdlbmlmnplgbn',
    deepLink: 'https://mobile.subwallet.app/browser',
  },
  rdns: 'app.subwallet',
})
