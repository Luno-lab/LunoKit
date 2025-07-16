import { CommonConnector } from './common'
import { polkadotjsSVG } from '../config/logos/generated'

export const polkadotjsConnector = () => {
  return new CommonConnector({
    id: 'polkadot-js',
    name: 'Polkadot{.js}',
    icon: polkadotjsSVG,
  });
}
