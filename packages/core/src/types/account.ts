// 账户相关类型

/**
 * 波卡账户接口
 * 代表链上的一个账户
 */
export interface Account {
  /**
   * 账户地址（从钱包获取的原始格式）
   * 具体的 SS58 格式化应在 React 层根据链进行。
   */
  address: string;

  /** 账户名称（如果有） */
  name?: string;

  /**
   * 账户公钥（十六进制格式，不带0x前缀）
   * 用于跨链地址转换和验证
   */
  publicKey?: string;

  /**
   * 其他元数据
   * 包括账户来源、控制方式等信息
   */
  meta?: {
    /** 账户来源（如 'polkadot-js', 'subwallet-js', 'talisman' 等） */
    source?: string;

    /** 创世哈希 (如果钱包提供了特定链的账户) */
    genesisHash?: string | null;

    /** 其他自定义元数据 */
    [key: string]: any;
  };
}

/**
 * 账户余额信息
 */
export interface AccountBalance {
  /** 可用余额（以最小单位表示） */
  free: bigint;

  /** 总余额（以最小单位表示） */
  total: bigint;

  /** 冻结余额（以最小单位表示） */
  reserved: bigint;

  /**
   * 可转账余额（以最小单位表示）
   * free减去各种锁定金额
   */
  transferable: bigint;

  /** 格式化后的可用余额（带单位，用于显示） */
  formattedFree: string;

  /** 格式化后的总余额（带单位，用于显示） */
  formattedTotal: string;

  /** 锁定详情（如果有） */
  locks?: Array<{
    id: string;
    amount: bigint;
    reason: string;
  }>;
}

/**
 * SS58地址格式常量
 * 详见: https://github.com/paritytech/substrate/wiki/External-Address-Format-(SS58)
 */
export enum SS58_FORMAT {
  /** Polkadot账户 */
  POLKADOT = 0,

  /** Kusama账户 */
  KUSAMA = 2,

  /** 通用Substrate格式（用于大多数测试网） */
  SUBSTRATE = 42,
}

/**
 * 账户类型枚举
 */
export enum ACCOUNT_TYPE {
  /** 普通账户 */
  NORMAL = 'normal',

  /** 多签账户 */
  MULTISIG = 'multisig',

  /** 代理账户 */
  PROXY = 'proxy',

  /** 智能合约账户 */
  CONTRACT = 'contract',
}
