import { CommonConnector } from './common'
import { fearlessWallet } from '../config/logos/generated'

export const fearlessConnector = () => {
  return new CommonConnector({
    id: 'fearless-wallet',
    name: 'Fearless Wallet',
    icon: fearlessWallet,
    links: {
      browserExtension: 'https://fearlesswallet.io'
    }
  });
}
