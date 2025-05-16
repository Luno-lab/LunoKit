// packages/core/src/connectors/subwallet.ts
import { BaseConnector } from './base';
import type { Account, Signer } from '../types';
import { stringToHex } from '@polkadot/util';
import {mapInjectedAccounts} from '../utils'
import type {Injected, InjectedAccount, Unsubcall} from '@polkadot/extension-inject/types';

export class SubWalletConnector extends BaseConnector {
  readonly id = 'subwallet-js';
  readonly name = 'SubWallet';
  readonly icon = 'https://pbs.twimg.com/profile_images/1651520550295212037/YUKs0gC5_400x400.jpg'; // 替换为 SubWallet 的真实图标

  /** 存储账户订阅取消函数 */
  private unsubscribe: Unsubcall | null = null;
  private specificInjector?: Injected = undefined

  constructor() {
    super();
  }

  public isInstalled(): boolean {
    if (typeof window === 'undefined') return false;
    const injectedWeb3 = window.injectedWeb3;
    return typeof injectedWeb3 === 'object' && typeof injectedWeb3[this.id] !== 'undefined';
  }

  public async isAvailable(): Promise<boolean> {
    return this.isInstalled();
  }

  public async connect(appName: string): Promise<Array<Account>> {
    console.log(`Connector ${this.id}: Attempting to connect...`);
    if (this.signer) {
      console.log(`Connector ${this.id}: Already connected.`);
      return [...this.accounts];
    }
    if (!(await this.isAvailable())) {
      throw new Error(`${this.name} extension not found or not enabled.`);
    }

    if (!window.injectedWeb3 || !window.injectedWeb3[this.id]) {
      throw new Error(
        `The '${this.id}' extension is not installed. Please install it to connect.`
      );
    }

    if (!window.injectedWeb3[this.id].enable) {
      throw new Error(`Failed to enable the '${this.id}' extension.`);
    }

    try {
      //@ts-ignore
      this.specificInjector = await window.injectedWeb3[this.id].enable(appName);

      console.log('injectedExtensions', this.specificInjector)
      if (!this.specificInjector) {
        throw new Error(`Failed to enable the '${this.id}' extension.`);
      }

      this.signer = this.specificInjector.signer as Signer;

      if (!this.signer) {
        throw new Error(`Could not get signer from ${this.name}.`);
      }

      // 2. 获取初始账户
      const rawAccounts = await this.specificInjector.accounts.get();
      if (rawAccounts.length === 0) {
        throw new Error(`No accounts found in ${this.name}. Make sure accounts are visible and access is granted.`);
      }
      this.accounts = mapInjectedAccounts(rawAccounts, this.id);
      console.log(`Connector ${this.id}: Initial accounts loaded`, this.accounts);

      // 3. 启动账户订阅 (使用 this.id)
      await this.startSubscription();

      // （可选）触发 connect 事件
      this.emit('connect', [...this.accounts]);

      return [...this.accounts];

    } catch (error) {
      console.error(`Connector ${this.id}: Connection failed:`, error);
      await this.cleanup(); // 清理状态
      throw error;
    }
  }

  // 实现 disconnect
  public async disconnect(): Promise<void> {
    console.log(`Connector ${this.id}: Disconnecting...`);
    await this.cleanup();
    this.emit('disconnect'); // 触发 disconnect 事件
  }

  // getAccounts 和 getSigner 由 BaseConnector 提供

  // 实现 signMessage
  public async signMessage(message: string, address: string): Promise<string | undefined> {
    const signer = await this.getSigner();
    if (!signer?.signRaw) {
      throw new Error('Signer is not available or does not support signRaw.');
    }
    const accounts = await this.getAccounts();
    if (!accounts.some(acc => acc.address === address)) {
      throw new Error(`Address ${address} is not managed by ${this.name}.`);
    }
    try {
      const dataHex = stringToHex(message);
      const result = await signer.signRaw({ address, data: dataHex, type: 'bytes' });
      return result.signature;
    } catch (error) {
      console.error(`Connector ${this.id}: Failed to sign message:`, error);
      return undefined; // 用户取消或其他错误
    }
  }

  /**
   * 内部方法：启动特定于此连接器的账户订阅
   */
  private async startSubscription(): Promise<void> {
    await this.cleanupSubscription();

    if (!this.specificInjector) {
      throw new Error(`Connector ${this.id}: Cannot subscribe, specificInjector not available.`);
    }

    try {
      // 明确只订阅自己的来源
      this.unsubscribe = this.specificInjector.accounts.subscribe(
        (updatedRawAccounts: InjectedAccount[]) => {
          const newAccounts = mapInjectedAccounts(updatedRawAccounts, this.id);
          if (JSON.stringify(this.accounts) !== JSON.stringify(newAccounts)) {
            this.accounts = newAccounts;
            this.emit('accountsChanged', [...this.accounts]);
          }
        }
      );
      console.log(`Connector ${this.id}: Subscribed to account changes.`);
    } catch (error) {
      console.error(`Connector ${this.id}: Failed to subscribe to accounts:`, error);
      this.unsubscribe = null;
    }
  }

  /**
   * 内部方法：清理订阅
   */
  private async cleanupSubscription(): Promise<void> {
    if (this.unsubscribe) {
      this.unsubscribe();
      this.unsubscribe = null;
      console.log(`Connector ${this.id}: Unsubscribed from account changes.`);
    }
  }

  /**
   * 内部方法：用于 disconnect 时清理所有状态
   */
  private async cleanup(): Promise<void> {
    await this.cleanupSubscription();
    this.accounts = [];
    this.signer = undefined;
    this.specificInjector = undefined
  }
}

export function subwallet(): SubWalletConnector {
  return new SubWalletConnector();
}
