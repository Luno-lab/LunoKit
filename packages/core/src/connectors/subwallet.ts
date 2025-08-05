import { subwalletSVG } from '../config/logos/generated'
import { CommonConnector } from './common'

export const subwalletConnector = () => {
  return new CommonConnector({
    id: 'subwallet-js',
    name: 'SubWallet',
    icon: subwalletSVG,
    links: {
      browserExtension: 'https://chromewebstore.google.com/detail/subwallet-polkadot-wallet/onhogfjeacnfoofkfgppdlbmlmnplgbn',
      deepLink: 'https://mobile.subwallet.app/browser',
    }
  })
};
