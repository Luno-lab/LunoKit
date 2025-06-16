import type { EventEmitter } from 'eventemitter3';
import type { Account } from './account';
import type { Signer } from './signer';

export interface Connector extends EventEmitter {
  readonly id: string;
  readonly name: string;
  readonly icon: string;
  isAvailable(): Promise<boolean>;
  isInstalled: () => boolean;
  connect(appName: string): Promise<Array<Account>>;
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
