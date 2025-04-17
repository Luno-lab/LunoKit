// 交易相关类型

/**
 * 交易参数
 */
export interface TransactionParameters {
  /** 发送者地址 */
  from: string;
  /** 接收者地址 */
  to?: string;
  /** 发送的金额（以最小单位表示） */
  value?: string | bigint;
  /** 交易数据 */
  data?: string | Uint8Array;
  /** 交易费用/gas */
  gasLimit?: bigint;
}

/**
 * 交易响应
 */
export interface TransactionResponse {
  /** 交易哈希 */
  hash: string;
  /** 链ID */
  chainId: number;
  /** 交易索引 */
  index?: number;
  /** 交易状态 */
  status?: 'success' | 'failure' | 'pending';
  /** 等待交易被确认 */
  wait(confirmations?: number): Promise<TransactionReceipt>;
}

/**
 * 交易收据
 */
export interface TransactionReceipt {
  /** 交易哈希 */
  hash: string;
  /** 交易索引 */
  index: number;
  /** 确认数 */
  confirmations: number;
  /** 交易状态 */
  status: 'success' | 'failure' | 'pending';
  /** 区块哈希 */
  blockHash: string;
  /** 区块高度 */
  blockNumber: number;
  /** 从地址 */
  from: string;
  /** 目标地址 */
  to?: string;
  /** 交易费用 */
  fee?: string;
} 