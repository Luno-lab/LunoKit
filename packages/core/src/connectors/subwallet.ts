import { BaseConnector } from './base';
import type { Account, Signer } from '../types';
import { mapInjectedAccounts } from '../utils'
import { subwalletSVG } from '../config/logos/generated'
import { Injected, InjectedAccount } from 'dedot/types'
import { stringToHex } from 'dedot/utils'

export class SubWalletConnector extends BaseConnector {
  readonly id = 'subwallet-js';
  readonly name = 'SubWallet';
  readonly icon = subwalletSVG;

  private unsubscribe: (() => void) | null = null;
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

    try {
      this.specificInjector = await window.injectedWeb3[this.id].enable(appName);

      if (!this.specificInjector) {
        throw new Error(`Failed to enable the '${this.id}' extension.`);
      }

      this.signer = this.specificInjector.signer as Signer;

      if (!this.signer) {
        throw new Error(`Could not get signer from ${this.name}.`);
      }

      const rawAccounts = await this.specificInjector.accounts.get();
      if (rawAccounts.length === 0) {
        throw new Error(`No accounts found in ${this.name}. Make sure accounts are visible and access is granted.`);
      }
      this.accounts = mapInjectedAccounts(rawAccounts, this.id);
      console.log(`Connector ${this.id}: Initial accounts loaded`, this.accounts);

      await this.startSubscription();

      this.emit('connect', [...this.accounts]);

      return [...this.accounts];

    } catch (error) {
      console.error(`Connector ${this.id}: Connection failed:`, error);
      await this.cleanup();
      throw error;
    }
  }

  public async disconnect(): Promise<void> {
    console.log(`Connector ${this.id}: Disconnecting...`);
    await this.cleanup();
    this.emit('disconnect');
  }

  public async signMessage(message: string, address: string): Promise<string | undefined> {
    if (!address || !message) return undefined;
    const signer = await this.getSigner();
    if (!signer?.signRaw) {
      throw new Error('Signer is not available or does not support signRaw.');
    }
    const accounts = await this.getAccounts();
    if (!accounts.some(acc => acc.address.toLowerCase() === address.toLowerCase())) {
      throw new Error(`Address ${address} is not managed by ${this.name}.`);
    }
    try {
      const dataHex = stringToHex(message);
      const result = await signer.signRaw({ address, data: dataHex, type: 'bytes' });
      return result.signature;
    } catch (error) {
      throw new Error(`Connector ${this.id}: Failed to sign message: ${error.message}`);
    }
  }

  private async startSubscription(): Promise<void> {
    await this.cleanupSubscription();

    if (!this.specificInjector) {
      throw new Error(`Connector ${this.id}: Cannot subscribe, specificInjector not available.`);
    }

    try {
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

  private async cleanupSubscription(): Promise<void> {
    if (this.unsubscribe) {
      this.unsubscribe();
      this.unsubscribe = null;
      console.log(`Connector ${this.id}: Unsubscribed from account changes.`);
    }
  }

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
