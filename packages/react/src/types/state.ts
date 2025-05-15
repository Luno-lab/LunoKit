import type { Config, Connector, Account, Chain } from '@luno/core';
import type { ApiPromise } from '@polkadot/api';
import type {HexString} from '@polkadot/util/types'

export enum ConnectionStatus {
  Disconnected = 'disconnected',
  Connecting = 'connecting',
  Disconnecting = 'disconnecting',
  Connected = 'connected',
}

export interface LunoState {
  // --- 配置信息 (由 Provider 在初始化时设置一次) ---
  /** Luno库的完整配置对象，包含所有支持的链、连接器等 */
  config?: Config;

  // --- 连接状态 ---
  /**
   * 当前的连接状态：
   * 'disconnected': 已断开
   * 'connecting': 连接中
   * 'disconnecting': 断开连接中
   */
  status: ConnectionStatus;

  // --- 当前活动的连接器及账户信息 ---
  /** 当前激活的钱包连接器实例 (例如 PolkadotJsConnector, SubWalletConnector) */
  activeConnector?: Connector;
  /**
   * 从连接器获取的原始账户列表。
   * 注意：这里的账户地址 (`Account.address`) 是钱包直接返回的格式。
   * 为了支持动态的 SS58 地址格式化，每个 Account 对象【必须】包含 `publicKey` (十六进制字符串格式的公钥)。
   */
  accounts: Account[];
  account?: Account;   // 当前选中账户
  setAccount: (accountOrPubkey: Account | HexString) => void;

  // --- 当前链及API实例 (主要由 Provider 管理，并在 Store 中反映) ---
  /** DApp 当前逻辑上活动或选中的链的创世哈希 (genesisHash) */
  currentChainId?: string;
  /** 根据 `currentChainId` 从 `config.chains` 中派生出的当前链对象，包含了如 `ss58Format` 等重要信息 */
  currentChain?: Chain;
  /** 对应于 `currentChainId` 的 `ApiPromise` 实例。此实例由 Provider 创建/管理，并通过 `_setApi` action 设置到 Store 中。 */
  currentApi?: ApiPromise;
  isApiReady: boolean;

  // --- 操作 (Actions) ---
  // 初始化
  /** 设置Luno的配置，通常由 Provider 在挂载时调用 */
  _setConfig: (config: Config) => Promise<void>;

  // 连接生命周期管理
  /**
   * 连接到指定的钱包连接器。
   * @param connectorId 要连接的连接器ID (在 `config.connectors` 中定义)。
   * @param targetChainId (可选) 连接成功后希望切换到的目标链的 genesisHash。
   */
  connect: (connectorId: string, targetChainId?: string) => Promise<void>;
  /** 断开当前活动的连接器 */
  disconnect: () => Promise<void>;

  // 切换链
  /**
   * 切换到新的逻辑链。
   * 此操作会更新 Store 中的 `currentChainId` 和 `currentChain`，并清除旧的 `currentApi`。
   * Provider 会监听 `currentChainId` 的变化，并负责处理新 `ApiPromise` 实例的创建和设置。
   * @param newChainId 要切换到的新链的 genesisHash。
   */
  switchChain: (newChainId: string) => Promise<void>;

  // 内部操作 (主要供 Provider 或事件处理器调用，不建议直接从UI组件调用)
  /**
   * (内部action) 由 Provider 调用，用于设置或清除当前链的 `ApiPromise` 实例。
   * @param api 当前链的 `ApiPromise` 实例，或 undefined (例如在切换链或断开连接时)。
   */
  _setApi: (api?: ApiPromise) => void;

  _setIsApiReady: (isApiReady: boolean) => void;

}
