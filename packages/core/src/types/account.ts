// 账户相关类型

/**
 * 账户信息
 */
export interface Account {
  /** 账户地址 */
  address: string;
  /** 关联的链ID */
  chainId: number;
  /** 账户名称（如果有） */
  name?: string;
}

/**
 * 余额信息
 */
export interface Balance {
  /** 原始值（以最小单位表示） */
  value: bigint;
  /** 格式化后的值（用于显示） */
  formatted: string;
  /** 代币符号 */
  symbol: string;
  /** 代币小数位 */
  decimals: number;
}

/**
 * 账户状态
 */
export interface AccountStatus {
  /** 是否已连接 */
  isConnected: boolean;
  /** 是否正在连接 */
  isConnecting: boolean;
  /** 是否断开连接 */
  isDisconnected: boolean;
  /** 账户信息 */
  account?: Account;
  /** 使用的连接器ID */
  connector?: string;
} 