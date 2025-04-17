/**
 * 钱包相关类型定义
 */

/**
 * 账户信息
 */
export interface Account {
  /** 账户地址 */
  address: string;
  /** 账户名称（如有） */
  name?: string;
  /** 来源 */
  source?: string;
  /** 账户类型（如有） */
  type?: string;
  /** 元数据 */
  meta?: Record<string, any>;
}

/**
 * 钱包功能特性
 */
export interface WalletFeatures {
  /** 是否支持签名交易 */
  signTransaction: boolean;
  /** 是否支持签名消息 */
  signMessage: boolean;
  /** 是否支持多账户 */
  multipleAccounts: boolean;
  /** 是否支持链切换 */
  supportChainChange: boolean;
  /** 是否支持地址本地存储 */
  addressStorage: boolean;
}

/**
 * 钱包元数据
 */
export interface WalletMetadata {
  /** 钱包名称 */
  title: string;
  /** 钱包描述 */
  description?: string;
  /** 钱包图标URL */
  icon?: string;
  /** 钱包下载URL */
  downloadUrl?: string;
  /** 钱包功能特性 */
  features: WalletFeatures;
}

/**
 * 钱包连接结果
 */
export interface WalletConnectResult {
  /** 连接的账户 */
  account: Account;
  /** 连接的链ID */
  chainId: number;
}

/**
 * 签名者接口
 */
export interface Signer {
  /** 签名消息 */
  signMessage: (message: string | Uint8Array, address: string) => Promise<string>;
  /** 签名交易 */
  signTransaction: (transaction: any, address: string) => Promise<string>;
}

/**
 * 基础钱包接口
 * 所有钱包类型应实现此接口
 */
export interface BaseWallet {
  /** 钱包ID */
  id: string;
  /** 钱包元数据 */
  metadata: WalletMetadata;
  /** 钱包提供者类型 */
  providerType: string;
  /** 签名者（连接后可用） */
  signer?: Signer;
  /** 是否已连接 */
  isConnected: () => boolean;
  /** 连接钱包 */
  connect: (chainId?: number) => Promise<WalletConnectResult>;
  /** 断开连接 */
  disconnect: () => Promise<void>;
  /** 获取可用账户 */
  getAccounts: () => Promise<Account[]>;
  /** 支持的链ID列表 */
  supportedChains?: number[];
  /** 切换链（如支持） */
  switchChain?: (chainId: number) => Promise<void>;
  /** 订阅账户变更事件 */
  subscribeAccounts?: (callback: (accounts: Account[]) => void) => () => void;
}

/**
 * 钱包提供者接口
 */
export interface WalletProvider {
  /** 获取提供者ID */
  getProviderId: () => string;
  /** 获取可用钱包列表 */
  getWallets: () => Promise<BaseWallet[]>;
  /** 检查是否可用 */
  isAvailable: () => Promise<boolean>;
} 