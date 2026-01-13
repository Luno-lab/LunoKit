import type { BaseChain, EvmChain, SubstrateChain } from '../../types';

export function defineChain<T extends SubstrateChain | EvmChain>(chain: T): T {
  return chain;
}

export function getChainToken(chain: BaseChain): string {
  return chain.nativeCurrency.symbol;
}

type ExplorerLinkType = 'tx' | 'address' | 'block' | 'extrinsic' | 'account';

export function getExplorerUrl(
  explorerUrl = '',
  data = '',
  type: ExplorerLinkType = 'extrinsic'
): string {
  if (!explorerUrl) return '';

  const baseUrl = explorerUrl.endsWith('/') ? explorerUrl.slice(0, -1) : explorerUrl;

  return `${baseUrl}/${type}/${data}`;
}
