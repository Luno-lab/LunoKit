import type { ApiOptions } from 'dedot';
import type { AnyShape } from 'dedot/shape';
import type { Chain } from './chain';
import type { Connector } from './connector';

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
export type Transport = Readonly<string[]>;

type LunoApiOptions = Partial<Omit<ApiOptions, 'provider' | 'signer'>> & {
  customTypes?: Record<string, AnyShape>;
  customRpc?: Record<string, any>;
};

export interface CreateConfigParameters extends LunoApiOptions {
  appName?: string;
  chains?: readonly Chain[];
  connectors: Connector[];
  transports?: Record<string, Transport>;

  storage?: LunoStorage;
  autoConnect?: boolean;
  subscan?: {
    apiKey: string;
    cacheTime?: number;
    retryCount?: number;
  };
}

export interface Config extends LunoApiOptions {
  readonly appName: string;
  readonly chains: readonly Chain[];
  readonly connectors: readonly Connector[];
  readonly transports: Readonly<Record<string, Transport>>;
  readonly storage: LunoStorage;
  readonly autoConnect: boolean;
  readonly subscan?: {
    apiKey: string;
    cacheTime?: number;
    retryCount?: number;
  };
}
