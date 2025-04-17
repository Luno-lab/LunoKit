import { BaseConnector } from './base';
import { web3Accounts, web3Enable, web3FromAddress } from '@polkadot/extension-dapp';
import type { InjectedWindow, InjectedExtension } from '@polkadot/extension-inject/types';
import { decodeAddress } from '@polkadot/util-crypto';
import type { PolkadotAccount } from '../types';
import {u8aToHex} from '@polkadot/util'

const INJECTED_ID = 'injected';
const INJECTED_NAME = '浏览器扩展钱包';
const INJECTED_ICON = 'https://polkadot.js.org/docs/img/favicon.ico';

export interface InjectedConnectorOptions {
  /** 应用名称 */
  appName?: string;
  /** 只使用支持的扩展 */
  supportedOnly?: boolean;
  /** 支持的扩展列表 */
  supportedExtensions?: Array<{
    id: string;
    name: string;
    icon?: string;
    description?: string;
  }>;
  /** 不允许的扩展ID列表 */
  disallowedExtensions?: string[];
}

/**
 * 检查是否已注入web3扩展
 */
function isWeb3Injected(win: InjectedWindow): boolean {
  return Object.values(win.injectedWeb3 || {})
    .filter(({ enable, connect }) => !!(enable || connect))
    .length > 0;
}

/**
 * 注入式钱包连接器
 * 支持浏览器扩展钱包，如Polkadot.js扩展等
 */
export class InjectedConnector extends BaseConnector {
  private options: InjectedConnectorOptions;

  /**
   * 创建注入式钱包连接器
   */
  constructor(options: InjectedConnectorOptions = {}) {
    super({
      id: INJECTED_ID,
      name: INJECTED_NAME,
      icon: INJECTED_ICON,
    });

    this.options = {
      appName: '浏览器钱包',
      supportedOnly: false,
      supportedExtensions: [
        {
          id: 'polkadot-js',
          name: 'Polkadot.js',
          icon: 'https://polkadot.js.org/docs/img/favicon.ico',
          description: 'Polkadot浏览器扩展钱包',
        },
        {
          id: 'subwallet-js',
          name: 'SubWallet',
          icon: 'https://subwallet.app/favicon.ico',
          description: 'SubWallet浏览器扩展钱包',
        },
        // 可以添加更多支持的扩展
      ],
      disallowedExtensions: [],
      ...options,
    };
  }

  /**
   * 检测浏览器中已安装的扩展
   */
  private async detectExtensions(): Promise<InjectedExtension[]> {
    const injectedWindow = window as Window & InjectedWindow;

    // 如果还未注入，等待一段时间
    if (!isWeb3Injected(injectedWindow)) {
      try {
        await Promise.race(
          [300, 600, 1000].map(
            (ms) =>
              new Promise<string>((resolve, reject) =>
                setTimeout(() => {
                  if (isWeb3Injected(injectedWindow)) {
                    resolve('injection complete');
                  } else {
                    reject(new Error('No injection found'));
                  }
                }, ms),
              ),
          ),
        );
      } catch (error) {
        console.warn('No web3 extension found after waiting');
      }
    }

    // 启用扩展
    try {
      const appName = this.options.appName || '浏览器钱包';
      const extensions = await web3Enable(appName);

      // 过滤扩展
      return extensions.filter((ext) => {
        const extId = ext.name.toLowerCase();

        // 检查是否在不允许的列表中
        if (this.options.disallowedExtensions?.includes(extId)) {
          return false;
        }

        // 如果只使用支持的扩展，检查是否在支持列表中
        if (this.options.supportedOnly) {
          return this.options.supportedExtensions?.some(
            (supported) => supported.id === extId
          );
        }

        return true;
      });
    } catch (error) {
      console.error('启用扩展失败:', error);
      return [];
    }
  }

  /**
   * 连接到扩展钱包并获取账户
   * @returns 可用账户列表
   */
  async connect(): Promise<Array<PolkadotAccount>> {
    try {
      // 检测扩展
      const extensions = await this.detectExtensions();

      if (!extensions.length) {
        throw new Error('未找到可用的浏览器扩展钱包，请安装Polkadot.js扩展或其他兼容扩展');
      }

      // 获取账户
      const polkadotAccounts = await web3Accounts();

      if (!polkadotAccounts.length) {
        throw new Error('未找到账户，请在扩展钱包中创建或导入账户');
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
            // 浏览器扩展钱包默认使用 42 格式
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
      console.error('连接浏览器扩展钱包失败:', error);
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
      await this.detectExtensions();

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
      await this.detectExtensions();

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

  /**
   * 获取已安装的扩展列表
   * @returns 已安装的扩展ID列表
   */
  async getInstalledExtensions(): Promise<string[]> {
    const extensions = await this.detectExtensions();
    return extensions.map((ext) => ext.name.toLowerCase());
  }
}

/**
 * 创建注入式钱包连接器工厂函数
 *
 * @param options 连接器选项
 * @returns 注入式钱包连接器实例
 *
 * @example
 * ```ts
 * import { createConfig } from '@poma/core';
 * import { injected } from '@poma/core/connectors';
 *
 * const config = createConfig({
 *   connectors: [
 *     injected({ appName: 'My App' })
 *   ]
 * });
 * ```
 */
export function injected(options: InjectedConnectorOptions = {}): InjectedConnector {
  return new InjectedConnector(options);
}
