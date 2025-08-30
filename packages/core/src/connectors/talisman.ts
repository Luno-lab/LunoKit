import { talismanWallet } from '../config/logos/generated'
import { InjectConnector } from './inject'

export const talismanConnector = () => {
  return new InjectConnector({
    id: 'talisman',
    name: 'Talisman',
    icon: talismanWallet,
    links: {
      browserExtension: 'https://chromewebstore.google.com/detail/talisman-wallet/fijngjgcjhjmmpcmkeiomlglpeiijkld'
    }
  });
}
