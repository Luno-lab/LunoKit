import { CommonConnector } from './common'
import { enkryptWallet } from '../config/logos/generated'

export const enkryptConnector = () => {
  return new CommonConnector({
    id: 'enkrypt',
    name: 'Enkrypt Wallet',
    icon: enkryptWallet,
    links: {
      browserExtension: 'https://www.enkrypt.com'
    }
  });
}
