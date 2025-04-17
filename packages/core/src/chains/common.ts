import type { Chain } from '../types';

/**
 * 定义链配置的辅助函数
 */
export function defineChain(chain: Chain): Chain {
  return chain;
}

/**
 * 获取链信息
 */
export function getChainById(chains: Chain[], chainId: number): Chain | undefined {
  return chains.find((chain) => chain.id === chainId);
}

/**
 * 获取链的原生代币符号
 */
export function getChainToken(chain: Chain): string {
  return chain.nativeCurrency.symbol;
}

/**
 * 获取链的RPC端点
 */
export function getChainRpcUrl(chain: Chain): string {
  return chain.rpcUrls.default.http[0];
}

/**
 * 获取链的区块浏览器URL
 */
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