// packages/core/src/connectors/polkadot-js.ts
import { BaseConnector } from './base';
import type { Account, Signer } from '../types';
import type {Injected, InjectedAccount, Unsubcall} from '@polkadot/extension-inject/types';
import { stringToHex } from '@polkadot/util';
import { mapInjectedAccounts } from '../utils'

export class PolkadotJsConnector extends BaseConnector {
  readonly id = 'polkadot-js';
  readonly name = 'Polkadot{.js}';
  readonly icon = 'https://polkadot.js.org/docs/img/logo.svg'; // 或其他官方图标

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
      // this.id 就是例如 'polkadot-js'
      throw new Error(
        `The '${this.id}' extension is not installed. Please install it to connect.`
      );
    }

    try {
      //@ts-ignore
      this.specificInjector = await window.injectedWeb3[this.id]!.enable(appName);

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

      // 3. 启动账户订阅
      await this.startSubscription();

      this.emit('connect', [...this.accounts]);

      return [...this.accounts];

    } catch (error) {
      console.error(`Connector ${this.id}: Connection failed:`, error);
      await this.cleanup(); // 清理状态
      throw error;
    }
  }

  public async disconnect(): Promise<void> {
    console.log(`Connector ${this.id}: Disconnecting...`);
    await this.cleanup();
    this.emit('disconnect'); // 触发 disconnect 事件
  }

  public async signMessage(message: string, address: string): Promise<string | undefined> {
    const signer = await this.getSigner();
    if (!signer?.signRaw) {
      throw new Error('Signer is not available or does not support signRaw.');
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


  private async startSubscription(): Promise<void> {
    await this.cleanupSubscription(); // 清理旧订阅

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

export function polkadotjs(): PolkadotJsConnector {
  return new PolkadotJsConnector();
}
