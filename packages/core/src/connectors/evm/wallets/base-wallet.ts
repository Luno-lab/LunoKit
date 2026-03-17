import {baseEvmWallet} from '../../../config/logos/generated'
import {injectedConnector} from '../base/injected'

export const baseConnector = () => injectedConnector({
  id: 'base',
  name: 'Base Account',
  icon: baseEvmWallet,
  links: {},
  rdns: 'app.base.account',
})
