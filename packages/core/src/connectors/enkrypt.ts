import { InjectConnector } from './inject'
import { enkryptWallet } from '../config/logos/generated'

export const enkryptConnector = () => {
  return new InjectConnector({
    id: 'enkrypt',
    name: 'Enkrypt Wallet',
    icon: enkryptWallet,
    links: {
      browserExtension: 'https://www.enkrypt.com'
    }
  });
}
