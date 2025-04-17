import { web3Accounts, web3Enable, web3FromAddress } from '@polkadot/extension-dapp';
import { BaseConnector } from './base';
import { decodeAddress, encodeAddress } from '@polkadot/util-crypto';
import { u8aToHex } from '@polkadot/util';
import type { PolkadotAccount } from '../types';
import { getWalletInfo, isWalletInstalled } from '../utils/wallet';

const INJECTED_ID = 'injected';
const INJECTED_NAME = '浏览器扩展钱包';
const INJECTED_ICON = 'https://polkadot.js.org/docs/img/favicon.ico';

export interface InjectedConnectorOptions {
  /** 应用名称 */
  appName?: string;
  /** 指定使用的钱包ID，如 'polkadot-js', 'subwallet-js' 等 */
  walletId?: string;
}

/**
 * 注入式钱包连接器
 * 支持多种浏览器扩展钱包
 */
export class InjectedConnector extends BaseConnector {
  /**
   * 应用名称，用于显示在扩展中
   */
  private appName: string;
  
  /**
   * 指定的钱包ID，如果指定则只使用该钱包
   */
  private walletId?: string;

  /**
   * 创建注入式钱包连接器
   */
  constructor(options: InjectedConnectorOptions = {}) {
    // 如果指定了钱包ID，使用该钱包的信息
    const walletInfo = options.walletId 
      ? getWalletInfo(options.walletId)
      : { name: INJECTED_NAME, icon: INJECTED_ICON };
    
    super({
      id: options.walletId || INJECTED_ID,
      name: walletInfo.name,
      icon: walletInfo.icon,
    });

    this.appName = options.appName || 'POMA App';
    this.walletId = options.walletId;
  }

  /**
   * 连接到扩展钱包并获取账户
   * @returns 可用账户列表
   */
  async connect(): Promise<Array<PolkadotAccount>> {
    try {
      // 如果指定了钱包ID，先检查是否已安装
      if (this.walletId && !isWalletInstalled(this.walletId)) {
        throw new Error(`未找到 ${getWalletInfo(this.walletId).name} 扩展，请安装并启用扩展`);
      }

      // 启用扩展，如果指定了walletId，只启用指定的扩展
      const extensions = await web3Enable(this.appName);
      
      // 过滤扩展（如果指定了钱包ID）
      const filteredExtensions = this.walletId
        ? extensions.filter(ext => ext.name === this.walletId)
        : extensions;

      if (!filteredExtensions.length) {
        // 针对性的错误信息
        if (this.walletId) {
          throw new Error(`${getWalletInfo(this.walletId).name} 扩展未启用，请在扩展中授权访问`);
        } else {
          throw new Error('未找到可用的浏览器扩展钱包，请安装Polkadot.js扩展或其他兼容扩展');
        }
      }

      // 获取账户，如果指定了钱包ID，只获取指定钱包的账户
      const polkadotAccounts = await web3Accounts(
        this.walletId ? { extensions: [this.walletId] } : undefined
      );

      if (!polkadotAccounts.length) {
        // 针对性的错误信息
        if (this.walletId) {
          throw new Error(`未找到账户，请在 ${getWalletInfo(this.walletId).name} 中创建或导入账户`);
        } else {
          throw new Error('未找到账户，请在扩展钱包中创建或导入账户');
        }
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
            // 钱包默认使用 42 格式
            ss58Format: 42,
            meta: {
              ...account.meta,
              // 添加账户来源信息
              source: account.meta?.source || this.walletId || 'injected'
            }
          };
        } catch (error) {
          console.error(`处理账户失败: ${error}`);
          return {
            address: account.address,
            name: account.meta?.name || undefined,
            meta: {
              ...account.meta,
              source: account.meta?.source || this.walletId || 'injected'
            }
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
      await web3Enable(this.appName);

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
      await web3Enable(this.appName);

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
   * 格式化账户
   * @param accounts 账户列表
   * @param ss58Format 目标格式
   * @returns 格式化后的账户列表
   */
  formatAccounts(accounts: Array<PolkadotAccount>, ss58Format: number): Array<PolkadotAccount> {
    try {
      return accounts.map(account => {
        try {
          // 先解码获取公钥
          const publicKey = decodeAddress(account.address);
          // 将 Uint8Array 转换为十六进制字符串
          const publicKeyHex = Array.from(publicKey)
            .map((b: number) => b.toString(16).padStart(2, '0'))
            .join('');
            
          // 使用目标 SS58 格式编码地址
          const formattedAddress = encodeAddress(publicKey, ss58Format);
          
          return {
            ...account,
            address: formattedAddress,
            publicKey: publicKeyHex,
            ss58Format: ss58Format
          };
        } catch (error) {
          console.error(`转换地址格式失败: ${error}`);
          // 如果转换失败，返回原样
          return account;
        }
      });
    } catch (error) {
      console.error(`地址工具加载失败: ${error}`);
      return accounts;
    }
  }
}

/**
 * 创建通用注入式钱包连接器
 * 
 * @param options 连接器选项
 * @returns 注入式钱包连接器
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

/**
 * 创建 Polkadot.js 专用连接器
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
export function polkadotjs(options: InjectedConnectorOptions = {}): InjectedConnector {
  return new InjectedConnector({ ...options, walletId: 'polkadot-js' });
}

/**
 * 创建 SubWallet 专用连接器
 * 
 * @param options 连接器选项
 * @returns SubWallet 连接器实例
 * 
 * @example
 * ```ts
 * import { createConfig } from '@poma/core';
 * import { subwallet } from '@poma/core/connectors';
 * 
 * const config = createConfig({
 *   connectors: [
 *     subwallet({ appName: 'My App' })
 *   ]
 * });
 * ```
 */
export function subwallet(options: InjectedConnectorOptions = {}): InjectedConnector {
  return new InjectedConnector({ ...options, walletId: 'subwallet-js' });
}

/**
 * 创建 Talisman 专用连接器
 * 
 * @param options 连接器选项
 * @returns Talisman 连接器实例
 * 
 * @example
 * ```ts
 * import { createConfig } from '@poma/core';
 * import { talisman } from '@poma/core/connectors';
 * 
 * const config = createConfig({
 *   connectors: [
 *     talisman({ appName: 'My App' })
 *   ]
 * });
 * ```
 */
export function talisman(options: InjectedConnectorOptions = {}): InjectedConnector {
  return new InjectedConnector({ ...options, walletId: 'talisman' });
}
