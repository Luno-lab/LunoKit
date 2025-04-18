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
 * 根据网络名称获取链信息
 */
export function getChainByNetwork(chains: Chain[], network: string): Chain | undefined {
  return chains.find((chain) => chain.network === network);
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
  return chain.rpcUrls.default;
}

/**
 * 获取链的HTTP RPC端点（如果有）
 */
export function getChainHttpRpcUrl(chain: Chain): string | undefined {
  return chain.rpcUrls.http;
}

/**
 * 获取链的备用RPC端点
 */
export function getChainAlternativeRpcUrl(chain: Chain, index: number = 0): string | undefined {
  return chain.rpcUrls.alternative?.[index];
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

/**
 * 获取链的SS58地址格式
 */
export function getChainSs58Format(chain: Chain): number {
  return chain.ss58Format;
} 