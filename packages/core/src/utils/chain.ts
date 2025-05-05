import type {Chain} from '../types'

export function defineChain(chain: Chain): Chain {
  return chain;
}

export function getChainToken(chain: Chain): string {
  return chain.nativeCurrency.symbol;
}

export function getExplorerUrl(chain: Chain, data: string, type: 'transaction' | 'address' | 'block' = 'transaction'): string {
  const explorer = chain.blockExplorers?.default?.url;
  if (!explorer) return '';

  switch (type) {
    case 'transaction':
      return `${explorer}/extrinsic/${data}`;
    case 'address':
      return `${explorer}/account/${data}`;
    case 'block':
      return `${explorer}/block/${data}`;
    default:
      return explorer;
  }
}

export function getChainSs58Format(chain: Chain): number {
  return chain.ss58Format;
}
