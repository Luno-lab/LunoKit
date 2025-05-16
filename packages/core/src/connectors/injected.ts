// packages/core/src/connectors/injected.ts
import { BaseConnector } from './base';
// 确保导入所有必要的类型和函数
import type { Account, Signer } from '../types';
import { web3Accounts, web3FromSource, web3AccountsSubscribe } from '@polkadot/extension-dapp';
import type { InjectedAccountWithMeta, Unsubcall } from '@polkadot/extension-inject/types';
import { stringToHex } from '@polkadot/util';
import { mapInjectedAccounts } from '../utils'

// 类名保持为 InjectedConnector，因为它确实处理注入式钱包
export class InjectedConnector extends BaseConnector {
  readonly id = 'injected';
  readonly name = 'Browser Wallet';
  // 修正：icon 在 BaseConnector 中是可选的，这里保持一致
  readonly icon?: string = 'https://polkadot.js.org/docs/img/logo.svg'; // 可以设为 undefined 或保留

  private connectedSource: string | undefined = undefined;
  private unsubscribe: Unsubcall | null = null;

  constructor() {
    super();
  }

  public async isAvailable(): Promise<boolean> {
    if (typeof window === 'undefined') return false;
    const injectedWeb3 = (window as any).injectedWeb3;
    return typeof injectedWeb3 === 'object' && Object.keys(injectedWeb3).length > 0;
  }

  public async connect(appName): Promise<Array<Account>> {
    console.log(`Connector ${this.id}: Attempting to connect...`);
    if (this.signer) {
      console.log(`Connector ${this.id}: Already connected.`);
      return [...this.accounts];
    }
    if (!(await this.isAvailable())) {
      throw new Error('No compatible browser wallet extension found.');
    }

    let determinedSource: string;

    try {
      const allAccountsRaw: InjectedAccountWithMeta[] = await web3Accounts();
      if (allAccountsRaw.length === 0) {
        throw new Error('No accounts found. Ensure wallet is unlocked and access granted.');
      }

      const sources = [...new Set(allAccountsRaw.map(acc => acc.meta.source))];
      if (sources.length > 1) {
        throw new Error(`Multiple wallets detected (${sources.join(', ')}). Use specific connector or disable unused extensions.`);
      }

      determinedSource = sources[0];
      this.connectedSource = determinedSource;
      console.log(`Connector ${this.id}: Determined source: ${determinedSource}`);

      const injector = await web3FromSource(determinedSource);
      const potentialSigner = injector?.signer as Signer | undefined;
      if (!potentialSigner) {
        throw new Error(`Could not get signer from source ${determinedSource}.`);
      }
      this.signer = potentialSigner;
      console.log(`Connector ${this.id}: Signer obtained for ${determinedSource}.`);

      const sourceAccountsRaw = allAccountsRaw.filter(acc => acc.meta.source === determinedSource);
      this.accounts = mapInjectedAccounts(sourceAccountsRaw);
      console.log(`Connector ${this.id}: Initial accounts loaded`, this.accounts);

      // 调用修正后的 startSubscription
      await this.startSubscription();

      return [...this.accounts];

    } catch (error) {
      console.error(`Connector ${this.id}: Connection failed:`, error);
      // *** 调用 cleanup 清理状态 ***
      await this.cleanup();
      throw error;
    }
  }

  // *** 修正 disconnect: 调用 cleanup 并 emit 事件 ***
  public async disconnect(): Promise<void> {
    console.log(`Connector ${this.id}: Disconnecting...`);
    await this.cleanup(); // 调用辅助方法执行清理
    this.emit('disconnect'); // 在清理后触发事件
  }

  // getAccounts 和 getSigner 由 BaseConnector 提供（假设 BaseConnector 已实现）

  public async signMessage(message: string, address: string): Promise<string | undefined> {
    const signer = await this.getSigner();
    if (!signer?.signRaw) {
      throw new Error('Signing function (signRaw) not available.');
    }
    const accounts = await this.getAccounts();
    if (!accounts.some(acc => acc.address === address)) {
      throw new Error(`Address ${address} is not managed by the currently connected source (${this.connectedSource}).`);
    }
    try {
      const dataHex = stringToHex(message);
      const result = await signer.signRaw({ address, data: dataHex, type: 'bytes' });
      return result.signature;
    } catch (error) {
      console.error(`Connector ${this.id}: Failed to sign message:`, error);
      return undefined;
    }
  }

  /**
   * 内部方法：启动账户订阅（通用注入式）
   * 订阅所有来源，但在回调中根据 connectedSource 过滤
   */
  private async startSubscription(): Promise<void> {
    await this.cleanupSubscription(); // 清理旧订阅
    try {
      // 订阅所有来源，因为 web3AccountsSubscribe 不支持按来源过滤
      this.unsubscribe = await web3AccountsSubscribe(
        (injectedAccounts: InjectedAccountWithMeta[]) => {
          // 确保我们只处理当前连接的那个来源的更新
          if (!this.connectedSource) return;
          const sourceAccounts = injectedAccounts.filter(acc => acc.meta.source === this.connectedSource);
          const newAccounts = mapInjectedAccounts(sourceAccounts);
          if (JSON.stringify(this.accounts) !== JSON.stringify(newAccounts)) {
            this.accounts = newAccounts;
            console.log(`Connector ${this.id}: Accounts updated via subscription for ${this.connectedSource}`, this.accounts);
            this.emit('accountsChanged', [...this.accounts]);
          }
        }
        // 没有第二个参数
      );
      console.log(`Connector ${this.id}: Subscribed to account changes (filtering for ${this.connectedSource}).`);
    } catch (error) {
      console.error(`Connector ${this.id}: Failed to subscribe to accounts:`, error);
      this.unsubscribe = null;
    }
  }

  // *** 添加 cleanupSubscription 辅助方法 ***
  private async cleanupSubscription(): Promise<void> {
    if (this.unsubscribe) {
      this.unsubscribe();
      this.unsubscribe = null;
      console.log(`Connector ${this.id}: Unsubscribed from account changes.`);
    }
  }

  // *** 添加 cleanup 辅助方法 ***
  private async cleanup(): Promise<void> {
    await this.cleanupSubscription(); // 清理订阅
    this.accounts = [];           // 清空账户
    this.signer = undefined;      // 清空 signer
    this.connectedSource = undefined; // 清空来源
    // emit('disconnect') 由调用者 (disconnect 方法) 负责
  }
}

export function injected(): InjectedConnector {
  return new InjectedConnector();
}
