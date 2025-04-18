import { Chain } from '../types';
import { polkadotChain } from './polkadot';
import { kusamaChain } from './kusama';

/**
 * 所有支持的链的集合
 */
export const allChains: Chain[] = [
  polkadotChain,
  kusamaChain,
];

/**
 * 所有测试网链的集合
 */
export const testChains: Chain[] = allChains.filter(chain => chain.testnet);

/**
 * 所有主网链的集合
 */
export const mainnetChains: Chain[] = allChains.filter(chain => !chain.testnet);

/**
 * 通过ID查找链
 * @param id 链ID
 */
export function findChainById(id: number): Chain | undefined {
  return allChains.find(chain => chain.id === id);
}

/**
 * 通过网络名称查找链
 * @param network 网络名称
 */
export function findChainByNetwork(network: string): Chain | undefined {
  return allChains.find(chain => chain.network === network);
}

/**
 * 获取特定SS58格式的链
 * @param ss58Format SS58格式
 */
export function findChainsBySs58Format(ss58Format: number): Chain[] {
  return allChains.filter(chain => chain.ss58Format === ss58Format);
}
