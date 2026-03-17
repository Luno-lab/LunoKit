import { polkadotjsSubstrateWallet } from '../../../config/logos/generated';
import { InjectConnector } from '../base/inject';

export const polkadotjsConnector = () => {
  return new InjectConnector({
    id: 'polkadot-js',
    name: 'Polkadot{.js}',
    icon: polkadotjsSubstrateWallet,
    links: {
      browserExtension: 'https://polkadot.js.org/extension',
    },
  });
};
