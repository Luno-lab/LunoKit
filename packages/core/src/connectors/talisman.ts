import { talismanWallet } from '../config/logos/generated'
import { CommonConnector } from './common'

export const talismanConnector = () => {
  return new CommonConnector({
    id: 'talisman',
    name: 'Talisman',
    icon: talismanWallet,
    links: {
      browserExtension: 'https://chromewebstore.google.com/detail/talisman-wallet/fijngjgcjhjmmpcmkeiomlglpeiijkld'
    }
  });
}
