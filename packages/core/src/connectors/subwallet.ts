import { subwalletSVG } from '../config/logos/generated'
import { CommonConnector } from './common'

export const subwalletConnector = () => {
  return new CommonConnector({
    id: 'subwallet-js',
    name: 'SubWallet',
    icon: subwalletSVG,
  });
}
