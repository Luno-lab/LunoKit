import type { Chain } from '../types'

export function defineChain(chain: Chain): Chain {
  return chain;
}

export function getChainToken(chain: Chain): string {
  return chain.nativeCurrency.symbol;
}

export function getExplorerUrl(explorerUrl = '', data = '', type: 'transaction' | 'address' | 'block' = 'transaction'): string {
  if (!explorerUrl) return '';

  switch (type) {
    case 'transaction':
      return `${explorerUrl}/extrinsic/${data}`;
    case 'address':
      return `${explorerUrl}/account/${data}`;
    case 'block':
      return `${explorerUrl}/block/${data}`;
    default:
      return explorerUrl;
  }
}
