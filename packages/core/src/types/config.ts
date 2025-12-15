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
  customTypes?: Optional<Record<string, AnyShape>>;
  customRpc?: Optional<Record<string, any>>;
};

export interface CreateConfigParameters extends LunoApiOptions {
  appName?: Optional<string>;
  chains?: Optional<readonly Chain[]>;
  connectors: Connector[];
  transports?: Optional<Record<string, Transport>>;

  storage?: Optional<LunoStorage>;
  autoConnect?: Optional<boolean>;
  subscan?: Optional<{
    apiKey: string;
    cacheTime?: Optional<number>;
    retryCount?: Optional<number>;
  }>;
}

export interface Config extends LunoApiOptions {
  readonly appName: string;
  readonly chains: readonly Chain[];
  readonly connectors: readonly Connector[];
  readonly transports: Readonly<Record<string, Transport>>;
  readonly storage: LunoStorage;
  readonly autoConnect: boolean;
  readonly subscan?: Optional<{
    apiKey: string;
    cacheTime?: Optional<number>;
    retryCount?: Optional<number>;
  }>;
}
