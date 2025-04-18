import { ApiPromise } from '@polkadot/api';
import { Chain } from './chain';
import { Connector, Storage } from './connector';

/**
 * POMA配置选项接口
 */
export interface ConfigOptions {
  /** 支持的链列表 */
  chains: Chain[];

  /** 可用的钱包连接器列表 */
  connectors: Connector[];

  /** 可选的存储实现 */
  storage?: Storage;
}

/**
 * POMA配置接口
 */
export interface Config {
  /** 支持的链列表 */
  chains: Chain[];

  /** 可用的钱包连接器列表 */
  connectors: Connector[];

  /** Polkadot API实例映射 */
  apis: Map<number, Promise<ApiPromise>>;

  /** 存储实现 */
  storage: Storage;

  /**
   * 获取特定链的API实例
   * @param chainId 链ID
   * @returns ApiPromise实例的Promise
   */
  getApi(chainId: number): Promise<ApiPromise>;

  /**
   * 根据ID获取链信息
   * @param chainId 链ID
   * @returns 链信息
   */
  getChainById(chainId: number): Chain | undefined;
}
