import { web3Accounts, web3Enable, web3FromAddress } from '@polkadot/extension-dapp';
import { BaseConnector } from './base';
import { decodeAddress } from '@polkadot/util-crypto';
import { u8aToHex } from '@polkadot/util';
import type { PolkadotAccount } from '../types';

const POLKADOTJS_ID = 'polkadotjs';
const POLKADOTJS_NAME = 'Polkadot.js';
const POLKADOTJS_ICON = 'https://polkadot.js.org/docs/img/favicon.ico';

export interface PolkadotjsConnectorOptions {
  /** 应用名称 */
  appName?: string;
}

/**
 * Polkadot.js 扩展连接器
 */
export class PolkadotjsConnector extends BaseConnector {
  /**
   * 应用名称，用于显示在扩展中
   */
  private appName: string;

  /**
   * 创建Polkadot.js连接器
   */
  constructor(options: PolkadotjsConnectorOptions = {}) {
    super({
      id: POLKADOTJS_ID,
      name: POLKADOTJS_NAME,
      icon: POLKADOTJS_ICON,
    });

    this.appName = options.appName || 'POMA App';
  }

  /**
   * 连接到Polkadot.js扩展并获取账户列表
   * @returns 可用账户列表
   */
  async connect(): Promise<Array<PolkadotAccount>> {
    try {
      // 启用扩展
      const extensions = await web3Enable(this.appName);

      if (!extensions.length) {
        throw new Error('未找到Polkadot.js扩展，请安装并启用扩展');
      }

      // 获取账户
      const polkadotAccounts = await web3Accounts();

      if (!polkadotAccounts.length) {
        throw new Error('未找到账户，请在Polkadot.js扩展中创建或导入账户');
      }

      // 转换账户格式
      return polkadotAccounts.map(account => {
        try {
          // 解码获取公钥
          const publicKey = decodeAddress(account.address);
          // 使用 polkadot-js 提供的工具函数
          const hexPublicKey = u8aToHex(publicKey);
            
          return {
            address: account.address,
            name: account.meta?.name || undefined,
            publicKey: hexPublicKey,
            // Polkadot.js 扩展默认使用 42 格式
            ss58Format: 42,
            meta: account.meta
          };
        } catch (error) {
          console.error(`处理账户失败: ${error}`);
          return {
            address: account.address,
            name: account.meta?.name || undefined,
            meta: account.meta
          };
        }
      });
    } catch (error) {
      console.error('连接Polkadot.js扩展失败:', error);
      throw error;
    }
  }

  /**
   * 签名消息
   * @param message 要签名的消息
   * @param address 用于签名的账户地址
   * @returns 签名结果
   */
  async signMessage(message: string, address: string): Promise<string> {
    if (!address) {
      throw new Error('未指定签名账户');
    }

    try {
      // 启用扩展（如果尚未启用）
      const extensions = await web3Enable(this.appName);
      if (!extensions.length) {
        throw new Error('未找到Polkadot.js扩展');
      }

      // 获取账户的扩展适配器
      const injector = await web3FromAddress(address);

      // 签名消息
      const signRaw = injector?.signer?.signRaw;

      if (!signRaw) {
        throw new Error('当前扩展不支持签名功能');
      }

      // 执行签名
      const { signature } = await signRaw({
        address: address,
        data: message,
        type: 'bytes',
      });

      return signature;
    } catch (error) {
      console.error('签名消息失败:', error);
      throw error;
    }
  }

  /**
   * 签名交易
   * @param transaction 要签名的交易
   * @param address 用于签名的账户地址
   * @returns 签名结果
   */
  async signTransaction(transaction: any, address: string): Promise<string> {
    if (!address) {
      throw new Error('未指定签名账户');
    }

    try {
      // 启用扩展（如果尚未启用）
      const extensions = await web3Enable(this.appName);
      if (!extensions.length) {
        throw new Error('未找到Polkadot.js扩展');
      }

      // 获取账户的扩展适配器
      const injector = await web3FromAddress(address);

      // 检查是否支持签名
      if (!injector.signer) {
        throw new Error('当前扩展不支持签名功能');
      }

      // 执行签名 - 注意：这里简化了，实际使用需要根据API方式进行
      // 实际使用可能需要获取API实例并使用signAndSend
      const signResult = 'transaction_sign_result';

      return signResult;
    } catch (error) {
      console.error('签名交易失败:', error);
      throw error;
    }
  }
}

/**
 * 创建 Polkadot.js 连接器工厂函数
 * 
 * @param options 连接器选项
 * @returns Polkadot.js 连接器实例
 * 
 * @example
 * ```ts
 * import { createConfig } from '@poma/core';
 * import { polkadotjs } from '@poma/core/connectors';
 * 
 * const config = createConfig({
 *   connectors: [
 *     polkadotjs({ appName: 'My App' })
 *   ]
 * });
 * ```
 */
export function polkadotjs(options: PolkadotjsConnectorOptions = {}): PolkadotjsConnector {
  return new PolkadotjsConnector(options);
}
