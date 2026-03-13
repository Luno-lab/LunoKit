import {baseEvmWallet, talismanEvmWallet, subwalletEvmWallet, phatomEvmWallet, okxEvmWallet} from '../../config/logos/generated'
import {injectedConnector} from './injected'

export const baseConnector = injectedConnector({
  id: 'base',
  name: 'Base Account',
  icon: baseEvmWallet,
  links: {},
  rdns: 'app.base.account',
})

export const talismanConnector = injectedConnector({
  id: 'talisman',
  name: 'Talisman',
  icon: talismanEvmWallet,
  links: {},
  rdns: 'xyz.talisman',
})

export const subwalletConnector = injectedConnector({
  id: 'subwallet',
  name: 'Subwallet',
  icon: subwalletEvmWallet,
  links: {},
  rdns: 'app.subwallet',
})

export const phatomConnector = injectedConnector({
  id: 'phatom',
  name: 'Phatom',
  icon: phatomEvmWallet,
  links: {},
  rdns: 'app.phantom',
})

export const okxConnector = injectedConnector({
  id: 'okxwallet',
  name: 'OKX Wallet',
  icon: okxEvmWallet,
  links: {},
  rdns: 'com.okex.wallet',
})
