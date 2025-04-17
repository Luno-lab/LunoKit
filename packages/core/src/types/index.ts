import { ApiPromise } from '@polkadot/api';

// 链定义
export interface Chain {
  /** 链的唯一ID */
  id: number;
  /** 链名称 */
  name: string;
  /** 链网络 */
  network: string;
  /** 链的原生代币 */
  nativeCurrency: {
    name: string;
    symbol: string;
    decimals: number;
  };
  /** RPC URL配置 */
  rpcUrls: {
    default: {
      http: string[];
      webSocket?: string[];
    };
    public?: {
      http: string[];
      webSocket?: string[];
    };
  };
  /** 区块浏览器 */
  blockExplorers?: {
    default: {
      name: string;
      url: string;
    };
    [key: string]: {
      name: string;
      url: string;
    };
  };
  /** 测试网标识 */
  testnet?: boolean;
}

/**
 * 波卡账户对象
 */
export interface PolkadotAccount {
  /** 账户地址（格式化后的） */
  address: string;
  /** 账户名称 */
  name?: string;
  /** 公钥（十六进制格式，不带前缀） */
  publicKey?: string;
  /** 当前地址的 SS58 格式 */
  ss58Format?: number;
  /** 其他元数据 */
  meta?: any;
}

// 连接器接口
export interface Connector {
  /** 连接器ID */
  id: string;
  /** 连接器名称 */
  name: string;
  /** 连接器图标URL */
  icon?: string;
  /** 连接到钱包并获取可用账户 */
  connect(): Promise<Array<PolkadotAccount>>;
  /** 将账户列表转换为指定的 SS58 格式 */
  formatAccounts(accounts: Array<PolkadotAccount>, ss58Format: number): Array<PolkadotAccount>;
  /** 签名消息 */
  signMessage(message: string, address: string): Promise<string>;
  /** 签名交易 */
  signTransaction(transaction: any, address: string): Promise<string>;
}

// 存储接口
export interface Storage {
  getItem(key: string): string | null;
  setItem(key: string, value: string): void;
  removeItem(key: string): void;
}

// 配置选项
export interface ConfigOptions {
  /** 支持的链 */
  chains: Chain[];
  /** 可用的连接器 */
  connectors: Connector[];
  /** 可选的存储实现 */
  storage?: Storage;
}

// 配置接口
export interface Config {
  /** 支持的链 */
  chains: Chain[];
  /** 可用的连接器 */
  connectors: Connector[];
  /** API实例映射 */
  apis: Map<number, Promise<ApiPromise>>;
  /** 存储实现 */
  storage: Storage;
  /** 获取特定链的API */
  getApi(chainId: number): Promise<ApiPromise>;
}

// 导出所有类型
export * from './account';
export * from './transaction'; 