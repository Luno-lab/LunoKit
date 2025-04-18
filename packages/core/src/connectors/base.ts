import type { Connector, Account } from '../types';
import {SubmittableExtrinsic} from '@polkadot/api/types'
import {ApiPromise} from '@polkadot/api'

/**
 * 连接器选项
 */
export interface ConnectorOptions {
  /** 连接器ID */
  id: string;
  /** 连接器名称 */
  name: string;
  /** 连接器图标URL */
  icon?: string;
}

/**
 * 基础连接器抽象类
 * 所有连接器都应该继承这个类
 */
export abstract class BaseConnector implements Connector {
  /** 连接器ID */
  id: string;
  /** 连接器名称 */
  name: string;
  /** 连接器图标URL */
  icon?: string;

  /**
   * 创建连接器实例
   */
  constructor(options: ConnectorOptions) {
    this.id = options.id;
    this.name = options.name;
    this.icon = options.icon;
  }

  /**
   * 连接到钱包并获取可用账户
   * @returns 可用账户列表
   */
  abstract connect(): Promise<Array<Account>>;

  /**
   * 签名消息
   * @param message 要签名的消息
   * @param address 用于签名的账户地址
   * @returns 签名结果
   */
  abstract signMessage(message: string, address: string): Promise<string>;

  /**
   * 签名交易
   * @param transaction 要签名的交易
   * @param address 用于签名的账户地址
   * @returns 签名结果
   */
  // abstract signTransaction(transaction: any, address: string): Promise<string>;
}
