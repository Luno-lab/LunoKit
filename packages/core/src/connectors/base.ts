import type {Account, Chain, Signer} from '../types';
import { EventEmitter } from 'eventemitter3';

/**
 * base connector abstract class
 * defines the basic properties and methods that all wallet connectors should have.
 */
export abstract class BaseConnector extends EventEmitter {
  /**
   * the unique identifier of the connector (e.g., 'polkadot-js', 'subwallet-js')
   * subclasses must implement.
   */
  abstract readonly id: string;

  /**
   * user-friendly connector name (e.g., 'Polkadot{.js}', 'SubWallet')
   * subclasses must implement.
   */
  abstract readonly name: string;

  /**
   * connector icon URL (optional)
   * subclasses can implement.
   */
  abstract readonly icon?: string;

  /**
   * store the current connected accounts.
   * subclasses are responsible for maintaining this list when connecting and updating accounts.
   */
  protected accounts: Account[] = [];
  /**
   * store the signer.
   * subclasses are responsible for getting and storing it when connecting.
   */
  protected signer: Signer | undefined = undefined;

  protected connectionUri: string | undefined = undefined;

  constructor() {
    super();
  }

  public abstract isAvailable(): Promise<boolean>;

  public abstract isInstalled(): boolean;

  /**
   * connect to the wallet, get the initial accounts and signer, and set the necessary event listeners.
   * subclasses must implement:
   * 1. get the signer and assign it to this.signer.
   * 2. get the initial accounts list and assign it to this.accounts.
   * 3. set the account update mechanism of itself (e.g., use web3AccountsSubscribe or WalletConnect events).
   * 4. update this.accounts when the account list changes and trigger the 'accountsChanged' event.
   * 5. (optional) trigger the 'connect' event.
   * @returns the initial available accounts list
   */
  abstract connect(appName: string, chains?: Chain[], targetChainId?: string): Promise<Array<Account>>;
  /**
   * disconnect from the wallet.
   * subclasses must implement this method to perform specific cleanup logic
   * (e.g., unsubscribe, close session).
   * implementers should clear this.accounts and this.signer after cleanup and trigger the 'disconnect' event.
   */
  abstract disconnect(): Promise<void>;

  /**
   * get the current connected accounts list.
   * @returns the current available accounts list
   */
  public async getAccounts(): Promise<Array<Account>> {
    return [...this.accounts];
  }

  /**
   * get the cached signer object.
   * @returns the signer object, or undefined if the connection is not successful or cannot be obtained.
   */
  public async getSigner(): Promise<Signer | undefined> {
    if (!this.signer) {
      console.warn(`Connector ${this.id}: Signer not available. Connection might be incomplete or failed.`);
    }
    return this.signer;
  }

  /**
   * sign a message with the specified account.
   */
  abstract signMessage(message: string, address: string): Promise<string | undefined>;

  public hasConnectionUri(): boolean {
    return false
  }

  public async getConnectionUri(): Promise<string | undefined >{
    return this.connectionUri;
  }

  public async updateAccountsForChain?(chainId: string): Promise<Account[]> {
    return this.accounts;
  }
}
