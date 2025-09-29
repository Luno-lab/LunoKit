import { subwalletWallet } from '../config/logos/generated';
import { InjectConnector } from './inject';

export const subwalletConnector = () => {
  return new InjectConnector({
    id: 'subwallet-js',
    name: 'SubWallet',
    icon: subwalletWallet,
    links: {
      browserExtension:
        'https://chromewebstore.google.com/detail/subwallet-polkadot-wallet/onhogfjeacnfoofkfgppdlbmlmnplgbn',
      deepLink: 'https://mobile.subwallet.app/browser',
    },
  });
};
