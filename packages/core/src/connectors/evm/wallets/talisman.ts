import {talismanEvmWallet} from '../../../config/logos/generated'
import {injectedConnector} from '../base/injected'

export const talismanConnector = () => injectedConnector({
  id: 'talisman',
  name: 'Talisman',
  icon: talismanEvmWallet,
  links: {
    browserExtension:
      'https://chromewebstore.google.com/detail/talisman-wallet/fijngjgcjhjmmpcmkeiomlglpeiijkld',
  },
  rdns: 'xyz.talisman',
})
