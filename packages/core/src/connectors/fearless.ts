import { InjectConnector } from './inject'
import { fearlessWallet } from '../config/logos/generated'

export const fearlessConnector = () => {
  return new InjectConnector({
    id: 'fearless-wallet',
    name: 'Fearless Wallet',
    icon: fearlessWallet,
    links: {
      browserExtension: 'https://fearlesswallet.io'
    }
  });
}
