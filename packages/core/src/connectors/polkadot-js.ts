import { polkadotjsWallet } from '../config/logos/generated';
import { InjectConnector } from './inject';

export const polkadotjsConnector = () => {
  return new InjectConnector({
    id: 'polkadot-js',
    name: 'Polkadot{.js}',
    icon: polkadotjsWallet,
    links: {
      browserExtension: 'https://polkadot.js.org/extension',
    },
  });
};
