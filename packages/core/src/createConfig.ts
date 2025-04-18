import { ApiPromise, WsProvider } from '@polkadot/api';
import type { ConfigOptions, Config } from './types';

/**
 * 创建Poma配置
 *
 * @param options 配置选项
 * @returns Poma配置实例
 *
 * @example
 * ```ts
 * import { createConfig } from '@poma/core';
 * import { polkadotChain, kusamaChain } from '@poma/core/chains';
 * import { polkadotjs, injected } from '@poma/core/connectors';
 *
 * const config = createConfig({
 *   chains: [polkadotChain, kusamaChain],
 *   connectors: [
 *     polkadotjs({ appName: 'My dApp' }),
 *     injected()
 *   ],
 * });
 * ```
 */
export function createConfig(options: ConfigOptions): Config {
  const { chains, connectors, storage } = options;

  // 创建API实例映射
  const apis = new Map<number, Promise<ApiPromise>>();

  // 为每个链创建API
  for (const chain of chains) {
    // 使用WebSocket连接
    // 注意：这里使用的是新的Chain接口定义下的RPC格式
    // @ts-ignore - 暂时忽略类型错误，直到所有相关文件都更新
    const wsEndpoint = chain.rpcUrls.default;
    const provider = new WsProvider(wsEndpoint);
    const api = ApiPromise.create({ provider });
    apis.set(chain.id, api);
  }

  // 状态存储
  const defaultStorage = {
    getItem: (key: string) => {
      if (typeof window === 'undefined') return null;
      return window.localStorage.getItem(key);
    },
    setItem: (key: string, value: string) => {
      if (typeof window === 'undefined') return;
      window.localStorage.setItem(key, value);
    },
    removeItem: (key: string) => {
      if (typeof window === 'undefined') return;
      window.localStorage.removeItem(key);
    },
  };

  return {
    chains,
    connectors,
    apis,
    storage: storage || defaultStorage,
    getApi: async (chainId: number) => {
      const api = apis.get(chainId);
      if (!api) throw new Error(`没有找到链ID为${chainId}的API`);
      return api;
    },
    getChainById: (chainId: number) => {
      return chains.find(chain => chain.id === chainId);
    }
  };
}
