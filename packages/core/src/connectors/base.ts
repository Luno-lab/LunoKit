// packages/core/src/connectors/base.ts
import type { Account, Signer } from '../types'; // 导入本地类型
import { EventEmitter } from 'events';
// 不再需要导入 extension-dapp 或 inject types，因为订阅/处理逻辑下放

/**
 * 基础连接器抽象类
 * 定义了所有钱包连接器应具备的基本属性和方法。
 */
export abstract class BaseConnector extends EventEmitter {
  /**
   * 连接器的唯一标识符 (e.g., 'polkadot-js', 'subwallet-js')
   * 子类必须实现。
   */
  abstract readonly id: string;

  /**
   * 用户友好的连接器名称 (e.g., 'Polkadot{.js}', 'SubWallet')
   * 子类必须实现。
   */
  abstract readonly name: string;

  /**
   * 连接器图标的 URL (可选)
   * 子类可以实现。
   */
  abstract readonly icon?: string;

  /**
   * 存储当前连接的账户。
   * 子类负责在 connect 和 账户更新时维护此列表。
   */
  protected accounts: Account[] = [];
  /**
   * 存储获取到的 Signer。
   * 子类负责在 connect 时获取并存储。
   */
  protected signer: Signer | undefined = undefined;
  // isConnected 状态已移除
  // unsubscribeAccountChanges 状态已移除

  constructor() {
    super();
  }

  /**
   * 检查此连接器是否可用。
   */
  abstract isAvailable(): Promise<boolean>;

  /**
   * 连接到钱包，获取初始账户和 Signer，并设置必要的事件监听。
   * 子类实现必须在成功连接后：
   * 1. 获取 Signer 并赋值给 this.signer。
   * 2. 获取初始账户列表并赋值给 this.accounts。
   * 3. 设置自身的账户更新监听机制 (e.g., 使用 web3AccountsSubscribe 或 WalletConnect 事件)。
   * 4. 在账户列表变化时，更新 this.accounts 并触发 'accountsChanged' 事件。
   * 5. (可选) 触发 'connect' 事件。
   * @returns 初始可用账户列表
   */
  abstract connect(): Promise<Array<Account>>;

  /**
   * 断开与钱包的连接。
   * 子类必须实现此方法以执行特定的清理逻辑
   * (e.g., 取消订阅, 关闭会话)。
   * 实现者应在清理完成后，清空 this.accounts 和 this.signer, 并触发 'disconnect' 事件。
   */
  abstract disconnect(): Promise<void>;

  /**
   * 获取当前连接器缓存的账户列表。
   * @returns 当前可用账户列表
   */
  public async getAccounts(): Promise<Array<Account>> {
    // 子类负责维护 this.accounts 的准确性
    return [...this.accounts]; // 返回缓存账户的拷贝
  }

  /**
   * 获取缓存的 Signer 对象。
   * @returns Signer 对象，如果未成功连接或无法获取则返回 undefined。
   */
  public async getSigner(): Promise<Signer | undefined> {
    // 子类负责维护 this.signer 的准确性
    if (!this.signer) {
      console.warn(`Connector ${this.id}: Signer not available. Connection might be incomplete or failed.`);
    }
    return this.signer;
  }

  /**
   * 使用指定账户对消息进行签名。
   */
  abstract signMessage(message: string, address: string): Promise<string | undefined>;

  // --- EventEmitter 类型提示 ---
  /*
   * 监听连接成功事件。
   * @param event 'connect'
   * @param listener 回调函数，接收初始账户列表。
   */
  // public abstract on(event: 'connect', listener: (accounts: Account[]) => void): this; // 添加 connect 事件
  /**
   * 监听账户列表变化事件。
   * @param event 'accountsChanged'
   * @param listener 回调函数，接收新的账户列表。
   */
  // public abstract on(event: 'accountsChanged', listener: (accounts: Account[]) => void): this;
  /**
   * 监听断开连接事件。
   * @param event 'disconnect'
   * @param listener 回调函数。
   */
  // public abstract on(event: 'disconnect', listener: () => void): this;
  // 通用签名以兼容 EventEmitter 的原始 on 方法
  // public abstract on(event: string | symbol, listener: (...args: any[]) => void): this;

  /**
   * 移除连接成功事件的监听器。
   * @param event 'connect'
   * @param listener 之前添加的回调函数。
   */
  // public abstract off(event: 'connect', listener: (accounts: Account[]) => void): this; // 添加 connect 事件
  /**
   * 移除账户列表变化事件的监听器。
   * @param event 'accountsChanged'
   * @param listener 之前添加的回调函数。
   */
  // public abstract off(event: 'accountsChanged', listener: (accounts: Account[]) => void): this;
  /**
   * 移除断开连接事件的监听器。
   * @param event 'disconnect'
   * @param listener 之前添加的回调函数。
   */
  // public abstract off(event: 'disconnect', listener: () => void): this;
  // 通用签名以兼容 EventEmitter 的原始 off 方法
  // public abstract off(event: string | symbol, listener: (...args: any[]) => void): this;
}
