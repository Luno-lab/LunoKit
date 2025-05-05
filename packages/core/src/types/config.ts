// packages/core/src/types/index.ts (或 config.ts)

import type { WsProvider, HttpProvider } from '@polkadot/api'; // 用于 Transport 定义
import type { Chain } from './chain'; // 导入修正后的 Chain 类型
import type { Connector } from './connector'; // 导入 Connector 接口

// --- Storage 接口定义 ---
/**
 * 用于持久化状态的存储接口 (类似 Wagmi)。
 */
export interface Storage {
  getItem(key: string): string | null | Promise<string | null>;
  setItem(key: string, value: string): void | Promise<void>;
  removeItem(key: string): void | Promise<void>;
}

// --- Transport 定义 ---
/**
 * 定义如何连接到特定链的节点。
 * 可以是 WsProvider 或 HttpProvider 的实例。
 */
export type Transport = WsProvider | HttpProvider;

/**
 * 创建 WebSocket Transport 的辅助函数。
 * @param url - WebSocket RPC URL 或 URL 数组 (用于 fallback)。
 * @param autoConnectMs - 自动重连间隔 (毫秒)，0 表示禁用。
 * @returns WsProvider 实例。
 */
export declare function wsProvider(url: string | string[], autoConnectMs?: number | false): WsProvider;
// 注意：wsProvider 的具体实现需要放在非类型文件中 (e.g., src/providers.ts)

/**
 * 创建 HTTP Transport 的辅助函数。(如果需要支持 HTTP)
 * @param url - HTTP RPC URL。
 * @returns HttpProvider 实例。
 */
// export declare function httpProvider(url: string): HttpProvider;

// --- createConfig 输入参数类型 ---
/**
 * createConfig 函数的参数类型。
 */
export interface CreateConfigParameters {
  /** DApp 的名称，用于钱包授权提示 (必需)。 */
  appName: string;

  /** DApp 支持的链配置数组 (必需)。*/
  chains: readonly [Chain, ...Chain[]]; // 使用 readonly 元组确保至少有一个

  /** 要启用的钱包连接器实例数组 (必需)。*/
  connectors: Connector[];

  /**
   * 定义如何连接到每条链的 RPC 节点 (必需)。
   * 使用链的 genesisHash 作为 key。
   */
  transports: Record<string, Transport>; // key 是 genesisHash

  /**
   * 用于持久化连接状态的存储实现 (可选)。
   * 默认为基于 localStorage 的实现 (如果可用)，否则为 noopStorage。
   */
  storage?: Storage | null;

  /**
   * 是否在页面加载时尝试自动连接上次使用的钱包 (可选)。
   * 默认为 true。需要配合 storage 使用。
   */
  autoConnect?: boolean;

  // 可以添加其他全局配置，如轮询间隔等
  // pollingInterval?: number;
}


// --- createConfig 返回的配置对象类型 ---
/**
 * createConfig 函数返回的配置对象。
 * 主要包含处理和验证后的静态配置数据。
 */
export interface Config {
  readonly appName: string;
  readonly chains: readonly Chain[];
  readonly connectors: readonly Connector[];
  readonly transports: Readonly<Record<string, Transport>>;
  readonly storage: Storage | null; // 存储最终使用的 storage 实例
  readonly autoConnect: boolean;

  // 不再包含运行时状态如 apis 或 getApi 方法
  // getChainByGenesis(genesisHash: string): Chain | undefined; // 可以提供一个获取链配置的工具方法
}

