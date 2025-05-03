// packages/core/src/connectors/polkadot-js.ts
import { BaseConnector } from './base';
import type { Account, Signer } from '../types';
import { web3Accounts, web3FromSource, web3AccountsSubscribe } from '@polkadot/extension-dapp';
import type {InjectedAccountWithMeta, Unsubcall} from '@polkadot/extension-inject/types';
import { stringToHex } from '@polkadot/util';
import {mapInjectedAccounts} from '../utils'

export class PolkadotJsConnector extends BaseConnector {
  readonly id = 'polkadot-js';
  readonly name = 'Polkadot{.js}';
  readonly icon = 'https://polkadot.js.org/docs/img/logo.svg'; // 或其他官方图标

  /** 存储账户订阅取消函数 */
  private unsubscribe: Unsubcall | null = null;

  constructor() {
    super();
  }

  public async isAvailable(): Promise<boolean> {
    if (typeof window === 'undefined') return false;
    const injectedWeb3 = (window as any).injectedWeb3;
    // 检查 polkadot-js key 是否存在于注入的对象中
    return typeof injectedWeb3 === 'object' && typeof injectedWeb3[this.id] !== 'undefined';
  }

  public async connect(): Promise<Array<Account>> {
    console.log(`Connector ${this.id}: Attempting to connect...`);
    if (this.signer) {
      console.log(`Connector ${this.id}: Already connected.`);
      return [...this.accounts];
    }
    if (!(await this.isAvailable())) {
      throw new Error(`${this.name} extension not found or not enabled.`);
    }

    try {
      // 假设 web3Enable 已被 Provider 调用

      // 1. 获取 Injector 和 Signer
      const injector = await web3FromSource(this.id);
      const potentialSigner = injector?.signer as Signer | undefined;
      if (!potentialSigner) {
        throw new Error(`Could not get signer from ${this.name}.`);
      }
      this.signer = potentialSigner;
      console.log(`Connector ${this.id}: Signer obtained.`);

      // 2. 获取初始账户
      const rawAccounts = await web3Accounts({ extensions: [this.id] });
      if (rawAccounts.length === 0) {
        throw new Error(`No accounts found in ${this.name}. Make sure accounts are visible and access is granted.`);
      }
      this.accounts = mapInjectedAccounts(rawAccounts);
      console.log(`Connector ${this.id}: Initial accounts loaded`, this.accounts);

      // 3. 启动账户订阅
      await this.startSubscription();

      // （可选）触发 connect 事件
      // this.emit('connect', [...this.accounts]);

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
    await this.cleanupSubscription(); // 清理旧订阅
    try {
      // 明确只订阅自己的来源
      this.unsubscribe = await web3AccountsSubscribe(
        (injectedAccounts: InjectedAccountWithMeta[]) => {
          // 回调内部也应该过滤（虽然理论上 subscribe 应该只给自己的）
          const sourceAccounts = injectedAccounts.filter(acc => acc.meta.source === this.id);
          const newAccounts = mapInjectedAccounts(sourceAccounts);
          if (JSON.stringify(this.accounts) !== JSON.stringify(newAccounts)) {
            this.accounts = newAccounts; // 更新内部缓存
            console.log(`Connector ${this.id}: Accounts updated via subscription`, this.accounts);
            this.emit('accountsChanged', [...this.accounts]); // 触发事件
          }
        },
        { extensions: [this.id] } // 明确指定只订阅自己
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
  }
}

export function polkadotjs(): PolkadotJsConnector {
  return new PolkadotJsConnector();
}
