import { BaseConnector } from './base';
import type { Chain } from '../types';

// 注意：实际使用时需要安装以下依赖
// @walletconnect/sign-client
// @walletconnect/types
// @walletconnect/utils

const WALLETCONNECT_ID = 'walletconnect';
const WALLETCONNECT_NAME = 'WalletConnect';
const WALLETCONNECT_ICON = 'https://walletconnect.com/favicon.ico';

export interface WalletConnectConnectorOptions {
  /** WalletConnect项目ID（从WalletConnect云服务获取） */
  projectId: string;
  /** 中继服务器URL */
  relayUrl?: string;
  /** 元数据 */
  metadata?: {
    name: string;
    description: string;
    url: string;
    icons: string[];
  };
  /** 支持的链 */
  supportedChains?: number[];
}

/**
 * 创建 WalletConnect 连接器工厂函数
 * 
 * @param options 连接器选项
 * @returns WalletConnect 连接器实例
 * 
 * @example
 * ```ts
 * import { createConfig } from '@poma/core';
 * import { walletConnect } from '@poma/core/connectors';
 * 
 * const config = createConfig({
 *   connectors: [
 *     walletConnect({ 
 *       projectId: 'YOUR_PROJECT_ID',
 *       metadata: {
 *         name: 'My dApp',
 *         description: 'My awesome dApp',
 *         url: 'https://mydapp.com',
 *         icons: ['https://mydapp.com/icon.png'],
 *       },
 *     })
 *   ]
 * });
 * ```
 */
export function walletConnect(options: WalletConnectConnectorOptions): WalletConnectConnector {
  return new WalletConnectConnector(options);
}

/**
 * WalletConnect连接器
 *
 * 使用WalletConnect协议连接移动钱包
 *
 * @example
 * ```ts
 * import { WalletConnectConnector } from '@poma/core/connectors';
 *
 * const connector = new WalletConnectConnector({
 *   projectId: 'YOUR_PROJECT_ID',
 *   metadata: {
 *     name: 'My dApp',
 *     description: 'My awesome dApp',
 *     url: 'https://mydapp.com',
 *     icons: ['https://mydapp.com/icon.png'],
 *   },
 * });
 * ```
 */
export class WalletConnectConnector extends BaseConnector {
  private currentAccount: string | undefined;
  private currentChainId: number | undefined;
  private client: any; // 实际使用时替换为 SignClient 类型
  private session: any; // 实际使用时替换为 SessionTypes.Session 类型
  private options: WalletConnectConnectorOptions;
  private pairingUri: string | undefined;
  private isInitializing: boolean = false;
  private isInitialized: boolean = false;
  private supportedChains?: number[];

  /**
   * 创建WalletConnect连接器
   */
  constructor(options: WalletConnectConnectorOptions) {
    super({
      id: WALLETCONNECT_ID,
      name: WALLETCONNECT_NAME,
      icon: WALLETCONNECT_ICON,
    });

    this.options = {
      relayUrl: 'wss://relay.walletconnect.com',
      metadata: {
        name: 'POMA dApp',
        description: 'POMA Polkadot dApp',
        url: typeof window !== 'undefined' ? window.location.href : '',
        icons: ['https://polkadot.network/assets/img/logo-polkadot.svg'],
      },
      ...options,
    };
    
    // 设置支持的链（如果提供）
    if (options.supportedChains) {
      this.setChains(options.supportedChains);
    }
  }

  /**
   * 设置支持的链ID
   * @param chains 链ID数组
   */
  setChains(chains: number[]): void {
    this.supportedChains = chains;
  }

  /**
   * 初始化WalletConnect客户端
   * 实际使用时需要导入SignClient
   */
  private async initClient(): Promise<void> {
    if (this.isInitializing || this.isInitialized) return;

    try {
      this.isInitializing = true;

      // 实际实现中需要这样初始化
      // this.client = await SignClient.init({
      //   projectId: this.options.projectId,
      //   metadata: this.options.metadata,
      //   relayUrl: this.options.relayUrl,
      // });

      // 模拟初始化成功
      this.client = {
        on: (event: string, callback: Function) => {
          // 模拟事件监听
          console.log(`Registered WalletConnect event: ${event}`);
        },
        connect: async () => {
          // 模拟连接
          return { uri: 'wc:00000000-0000-0000-0000-000000000000@1?bridge=https%3A%2F%2Fbridge.walletconnect.org&key=00000000000000000000000000000000000000000000000000000000000000' };
        },
        pair: async ({ uri }: { uri: string }) => {
          // 模拟配对
          console.log(`Pairing with URI: ${uri}`);
        },
        disconnect: async () => {
          // 模拟断开连接
          console.log('Disconnected from WalletConnect');
        },
        request: async () => {
          // 模拟请求
          return {};
        },
      };

      // 注册会话事件
      this.registerEventListeners();

      this.isInitialized = true;
      console.log('WalletConnect 客户端初始化成功');
    } catch (error) {
      console.error('初始化WalletConnect客户端失败:', error);
      throw error;
    } finally {
      this.isInitializing = false;
    }
  }

  /**
   * 注册WalletConnect事件监听器
   */
  private registerEventListeners(): void {
    if (!this.client) return;

    // 会话更新事件
    this.client.on('session_update', ({ topic, params }: any) => {
      console.log('会话已更新:', topic, params);
      this.onSessionUpdate(params);
    });

    // 会话删除事件
    this.client.on('session_delete', () => {
      console.log('会话已删除');
      this.onDisconnect();
    });
  }

  /**
   * 会话更新处理
   */
  private onSessionUpdate(params: any): void {
    // 实际使用时更新账户和链ID信息
    // const { accounts, chainId } = params;
    // this.currentAccount = accounts[0];
    // this.currentChainId = chainId;
  }

  /**
   * 断开连接处理
   */
  private onDisconnect(): void {
    this.session = undefined;
    this.currentAccount = undefined;
    this.currentChainId = undefined;
  }

  /**
   * 连接到WalletConnect
   * @returns 可用账户列表
   */
  async connect(): Promise<Array<import('../types').PolkadotAccount>> {
    try {
      // 初始化客户端
      if (!this.isInitialized) {
        await this.initClient();
      }

      // 如果已连接，直接返回账户
      if (this.session) {
        return this.getWalletConnectAccounts();
      }

      // 指定的链ID或默认链ID
      const chainId = this.supportedChains ? this.supportedChains[0] : 0;

      // 创建连接会话
      const { uri, approval } = await this.client.connect({
        requiredNamespaces: {
          polkadot: {
            methods: [
              'polkadot_signTransaction',
              'polkadot_signMessage',
            ],
            chains: [`polkadot:${chainId}`],
            events: ['chainChanged', 'accountsChanged'],
          },
        },
      });

      // 保存配对URI，用于生成QR码
      this.pairingUri = uri;

      // 等待钱包批准连接
      this.session = await approval();

      // 从会话中获取账户
      const accounts = this.getWalletConnectAccounts();

      // 如果有账户，保存第一个作为当前账户
      if (accounts.length > 0) {
        this.currentAccount = accounts[0].address;
        this.currentChainId = chainId;
      }

      return accounts;
    } catch (error) {
      console.error('连接WalletConnect失败:', error);
      throw error;
    }
  }

  /**
   * 从WalletConnect会话获取账户列表
   * @returns 账户列表
   */
  private getWalletConnectAccounts(): Array<import('../types').PolkadotAccount> {
    if (!this.session) {
      return [];
    }

    const accounts = this.session.namespaces?.polkadot?.accounts || [];
    
    // WalletConnect返回的账户格式通常为 "polkadot:chainId:address"
    return accounts.map((account: string) => {
      const parts = account.split(':');
      const address = parts.length === 3 ? parts[2] : account;
      
      return {
        address,
        // WalletConnect通常不提供账户名称
        meta: { source: 'walletconnect' }
      };
    });
  }

  /**
   * 断开WalletConnect连接
   */
  async disconnect(): Promise<void> {
    if (this.session && this.client) {
      try {
        await this.client.disconnect({
          topic: this.session.topic,
          reason: {
            code: 6000,
            message: '用户断开连接',
          },
        });
      } catch (error) {
        console.error('断开WalletConnect连接失败:', error);
      }
    }

    this.onDisconnect();
  }

  /**
   * 获取当前账户
   */
  async getAccount(): Promise<string | undefined> {
    return this.currentAccount;
  }

  /**
   * 获取当前链ID
   */
  async getChainId(): Promise<number | undefined> {
    return this.currentChainId;
  }

  /**
   * 切换链
   */
  async switchChain(chainId: number): Promise<void> {
    if (this.supportedChains && !this.supportedChains.includes(chainId)) {
      throw new Error(`不支持的链ID: ${chainId}`);
    }

    if (!this.session || !this.client) {
      throw new Error('未连接到WalletConnect');
    }

    try {
      // 发送切换链请求
      // 注意：并非所有钱包都支持此操作
      await this.client.request({
        topic: this.session.topic,
        chainId: `polkadot:${chainId}`,
        request: {
          method: 'wallet_switchPolkadotChain',
          params: [{ chainId: chainId.toString() }],
        },
      });

      this.currentChainId = chainId;
    } catch (error: any) {
      console.error('切换链失败:', error);
      throw new Error(`切换链失败: ${error.message}`);
    }
  }

  /**
   * 获取配对URI
   * 用于生成QR码
   */
  getPairingUri(): string | undefined {
    return this.pairingUri;
  }

  /**
   * 签名消息
   * @param message 要签名的消息
   * @param address 用于签名的账户地址
   * @returns 签名结果
   */
  async signMessage(message: string, address: string): Promise<string> {
    if (!this.session || !this.client) {
      throw new Error('未连接到WalletConnect');
    }

    try {
      const result = await this.client.request({
        topic: this.session.topic,
        chainId: `polkadot:${this.currentChainId}`,
        request: {
          method: 'polkadot_signMessage',
          params: {
            address: address,
            message,
          },
        },
      });

      return result;
    } catch (error: any) {
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
    if (!this.session || !this.client) {
      throw new Error('未连接到WalletConnect');
    }

    try {
      const result = await this.client.request({
        topic: this.session.topic,
        chainId: `polkadot:${this.currentChainId}`,
        request: {
          method: 'polkadot_signTransaction',
          params: {
            address: address,
            transaction,
          },
        },
      });

      return result;
    } catch (error: any) {
      console.error('签名交易失败:', error);
      throw error;
    }
  }
}
