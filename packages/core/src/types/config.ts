import type { WsProvider, HttpProvider } from '@polkadot/api';
import type { Chain } from './chain';
import type { Connector } from './connector';
import type { ApiOptions } from '@polkadot/api/types';

export interface RawStorage {
  getItem(key: string): string | null | Promise<string | null>;
  setItem(key: string, value: string): void | Promise<void>;
  removeItem(key: string): void | Promise<void>;
}

export interface LunoStorage {
  getItem(keySuffix: string): Promise<string | null>;
  setItem(keySuffix: string, value: string): Promise<void>;
  removeItem(keySuffix: string): Promise<void>;
}

// export type Transport = WsProvider;
export type Transport = string;

type LunoApiOptions = Pick<ApiOptions,
  | 'registry'
  | 'types'
  | 'typesBundle'
  | 'rpc'
>;

export interface CreateConfigParameters extends LunoApiOptions {
  appName?: string;
  chains: readonly Chain[];
  connectors: Connector[];
  transports?: Record<string, Transport>;

  storage?: LunoStorage;
  autoConnect?: boolean;
}

export interface Config extends LunoApiOptions {
  readonly appName: string;
  readonly chains: readonly Chain[];
  readonly connectors: readonly Connector[];
  readonly transports: Readonly<Record<string, Transport>>;
  readonly storage: LunoStorage;
  readonly autoConnect: boolean;
}

