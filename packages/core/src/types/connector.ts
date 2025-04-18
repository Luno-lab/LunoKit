import { Account } from './account';

/**
 * 钱包连接器接口
 * 定义与区块链钱包交互的标准方法
 */
export interface Connector {
  /** 连接器唯一标识 */
  id: string;

  /** 连接器名称（显示用） */
  name: string;

  /** 连接器图标URL */
  icon?: string;

  /**
   * 连接到钱包并获取可用账户
   * @param options 可选的连接参数
   * @returns 可用账户列表
   */
  connect(options?: any): Promise<Array<Account>>;

  /**
   * 将账户列表转换为指定的SS58格式
   * @param accounts 账户列表
   * @param ss58Format 目标SS58格式
   * @returns 转换后的账户列表
   */

  /**
   * 签名消息
   * @param message 要签名的消息
   * @param address 用于签名的账户地址
   * @returns 签名结果
   */
  signMessage(message: string, address: string): Promise<string>;

  /**
   * 签名交易
   * @param transaction 要签名的交易
   * @param address 用于签名的账户地址
   * @returns 签名结果
   */
  // signTransaction(transaction: PolkadotTransactionParameters, address: string): Promise<string>;
}
/**
 * 存储接口
 * 用于持久化钱包状态
 */
export interface Storage {
  /** 获取存储项 */
  getItem(key: string): string | null;

  /** 设置存储项 */
  setItem(key: string, value: string): void;

  /** 移除存储项 */
  removeItem(key: string): void;
}

