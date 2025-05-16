// packages/core/src/types/index.ts (或 config.ts)

import type { WsProvider, HttpProvider } from '@polkadot/api'; // 用于 Transport 定义
import type { Chain } from './chain'; // 导入修正后的 Chain 类型
import type { Connector } from './connector'; // 导入 Connector 接口
import type { ApiOptions } from '@polkadot/api/types';
// --- Storage 接口定义 ---
/**
 * 用于持久化状态的存储接口 (类似 Wagmi)。
 */
export interface RawStorage {
  getItem(key: string): string | null | Promise<string | null>;
  setItem(key: string, value: string): void | Promise<void>;
  removeItem(key: string): void | Promise<void>;
}

export interface LunoStorage {
  getItem(keySuffix: string): Promise<string | null>;
  setItem(keySuffix: string, value: string): Promise<void>;
  removeItem(keySuffix: string): Promise<void>;
}

// --- Transport 定义 ---
/**
 * 定义如何连接到特定链的节点。
 * 可以是 WsProvider 或 HttpProvider 的实例。
 */
export type Transport = WsProvider;

type LunoApiOptions = Pick<ApiOptions,
  | 'registry'
  | 'types'
  | 'typesBundle'
  | 'rpc'
>;

// --- createConfig 返回的配置对象类型 ---
/**
 * createConfig 函数返回的配置对象。
 * 主要包含处理和验证后的静态配置数据。
 */

export interface CreateConfigParameters extends LunoApiOptions {
  appName?: string; // appName 在 Parameters 中也是必需的，createConfig 会验证
  chains: readonly Chain[];
  connectors: Connector[];
  transports: Record<string, Transport>;

  // 在 Parameters 中可选，但在 Config 中会有默认值
  storage?: LunoStorage;    // 用户提供原始 RawStorage，在 Config 中会变成 LunoStorage
  autoConnect?: boolean;
}

export interface Config extends LunoApiOptions {
  readonly appName: string;
  readonly chains: readonly Chain[];
  readonly connectors: readonly Connector[];
  readonly transports: Readonly<Record<string, Transport>>;
  readonly storage: LunoStorage; // 存储最终使用的 storage 实例
  readonly autoConnect: boolean;
}

