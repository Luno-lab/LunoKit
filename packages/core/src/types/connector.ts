// --- Connector 接口 (如果还没定义或想放在这里) ---
import type { EventEmitter } from 'events';
import type { Account } from './account'; // 假设 Account 在 account.ts
import type { Signer } from './signer';   // 假设 Signer 在 signer.ts

export interface Connector extends EventEmitter {
  readonly id: string;
  readonly name: string;
  readonly icon?: string;
  isAvailable(): Promise<boolean>;
  connect(): Promise<Array<Account>>;
  disconnect(): Promise<void>;
  getAccounts(): Promise<Array<Account>>;
  getSigner(): Promise<Signer | undefined>;
  signMessage(message: string, address: string): Promise<string | undefined>;
  on(event: 'connect', listener: (accounts: Account[]) => void): this;
  on(event: 'disconnect', listener: () => void): this;
  on(event: 'accountsChanged', listener: (accounts: Account[]) => void): this;
  on(event: string | symbol, listener: (...args: any[]) => void): this;
  off(event: 'connect', listener: (accounts: Account[]) => void): this;
  off(event: 'disconnect', listener: () => void): this;
  off(event: 'accountsChanged', listener: (accounts: Account[]) => void): this;
  off(event: string | symbol, listener: (...args: any[]) => void): this;
}
