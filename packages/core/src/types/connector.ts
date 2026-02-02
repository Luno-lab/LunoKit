import type { Metadata } from '@walletconnect/universal-provider';
import type { EventEmitter } from 'eventemitter3';
import type { AccountType, HexString } from './account';
import type { SubstrateChain } from './chain';
import type { WalletSigner } from './signer';
import type { BaseConnector, Evm, Substrate } from '../connectors'

export interface SubstrateConnectOptions {
  appName: string;
  chains?: SubstrateChain[];
}

export interface EvmConnectOptions {
  chainId?: number;
  withCapabilities?: boolean;
}

export type ConnectOptions = SubstrateConnectOptions | EvmConnectOptions;

export interface ConnectorLinks {
  browserExtension?: Optional<string>;
  deepLink?: Optional<string>;
}

export interface Connector<
  SignerType = WalletSigner,
  OptionsType = ConnectOptions,
  Account = AccountType,
> extends EventEmitter {
  readonly id: string;
  readonly name: string;
  readonly icon: string;
  readonly links: ConnectorLinks;
  isAvailable(): Promise<boolean>;
  isInstalled: () => boolean;
  connect(options: OptionsType): Promise<Account[] | undefined>;
  disconnect(): Promise<void>;
  getAccounts(): Promise<Array<Account>>;
  getSigner(): Promise<SignerType | undefined>;
  signMessage(message: string, address: string): Promise<string | undefined>;
  hasConnectionUri(): boolean;
  getConnectionUri(): Promise<string | undefined>;
  on(event: 'connect', listener: (accounts: Account[]) => void): this;
  on(event: 'disconnect', listener: () => void): this;
  on(event: 'accountsChanged', listener: (accounts: Account[]) => void): this;
  on(event: string | symbol, listener: (...args: any[]) => void): this;
  off(event: 'connect', listener: (accounts: Account[]) => void): this;
  off(event: 'disconnect', listener: () => void): this;
  off(event: 'accountsChanged', listener: (accounts: Account[]) => void): this;
  off(event: string | symbol, listener: (...args: any[]) => void): this;
}

export interface WalletConnectConnectorOptions {
  id?: Optional<string>;
  name?: Optional<string>;
  icon?: Optional<string>;
  projectId: string;
  relayUrl?: Optional<string>;
  metadata?: Optional<Metadata>;
  links?: Optional<ConnectorLinks>;
  supportedChains?: Optional<HexString[]>;
}

export type SubstrateConnectorType = InstanceType<typeof Substrate.SubstrateConnector>;
export type EvmConnectorType = InstanceType<typeof Evm.EvmConnector>;

export type ConnectorType = SubstrateConnectorType | EvmConnectorType;

export type AnyConnector = ConnectorType;
