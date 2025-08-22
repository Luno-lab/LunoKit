import { CommonConnector } from './common'
import { polkadotjsWallet } from '../config/logos/generated'

export const polkadotjsConnector = () => {
  return new CommonConnector({
    id: 'polkadot-js',
    name: 'Polkadot{.js}',
    icon: polkadotjsWallet,
    links: {
      browserExtension: 'https://polkadot.js.org/extension'
    }
  });
}
