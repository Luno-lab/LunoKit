import { InjectConnector } from './inject'
import { polkadotjsWallet } from '../config/logos/generated'

export const polkadotjsConnector = () => {
  return new InjectConnector({
    id: 'polkadot-js',
    name: 'Polkadot{.js}',
    icon: polkadotjsWallet,
    links: {
      browserExtension: 'https://polkadot.js.org/extension'
    }
  });
}
