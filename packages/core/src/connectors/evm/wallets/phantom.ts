import {phatomEvmWallet} from '../../../config/logos/generated'
import {injectedConnector} from '../base/injected'

export const phatomConnector = () => injectedConnector({
  id: 'phatom',
  name: 'Phatom',
  icon: phatomEvmWallet,
  links: {
    browserExtension: 'https://phantom.com/download',
  },
  rdns: 'app.phantom',
})
