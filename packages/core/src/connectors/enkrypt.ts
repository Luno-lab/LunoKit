import { InjectConnector } from './inject'
import { enkryptWallet } from '../config/logos/generated'

export const enkryptConnector = () => {
  return new InjectConnector({
    id: 'enkrypt',
    name: 'Enkrypt',
    icon: enkryptWallet,
    links: {
      browserExtension: 'https://www.enkrypt.com'
    }
  });
}
