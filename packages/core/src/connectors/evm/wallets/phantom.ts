import {phatomEvmWallet} from '../../../config/logos/generated'
import {injectedConnector} from './injected'

export const phatomConnector = () => injectedConnector({
  id: 'phatom',
  name: 'Phatom',
  icon: phatomEvmWallet,
  links: {
    browserExtension: 'https://phantom.com/download',
  },
  rdns: 'app.phantom',
})
