import type {
  Config as WagmiConfig,
  CreateConfigParameters as WagmiCreateConfigParameters,
} from '@wagmi/core';
import type { Chain as WagmiChain } from '@wagmi/core/chains';
import type { ApiOptions } from 'dedot';
import type { AnyShape } from 'dedot/shape';
import type { HexString } from './account';
import type { EvmChain, SubstrateChain } from './chain';
import type { ConnectorGroup, SubstrateConnectorType, EvmConnectorType } from './connector';

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

export interface SubstrateConfigParams extends LunoApiOptions {
  chains?: Optional<readonly SubstrateChain[]>;
  transports?: Optional<Record<HexString, Transport>>;
  connectors: SubstrateConnectorType[] | ConnectorGroup<SubstrateConnectorType>[];
  subscan?: Optional<{
    apiKey: string;
    cacheTime?: Optional<number>;
    retryCount?: Optional<number>;
  }>;
}

export type EvmInputChain = WagmiChain & {
  chainIconUrl?: Optional<string>;
};

export interface EvmConfigParams
  extends Omit<
    WagmiCreateConfigParameters,
    'connectors' | 'storage' | 'client' | 'multiInjectedProviderDiscovery' | 'chains'
  > {
  connectors: EvmConnectorType[] | ConnectorGroup<EvmConnectorType>[];
  chains: readonly EvmInputChain[];
}

export interface CreateConfigParameters {
  appName?: Optional<string>;
  storage?: Optional<LunoStorage>;
  autoConnect?: Optional<boolean>;
  substrate?: Optional<SubstrateConfigParams>;
  evm?: Optional<EvmConfigParams>;
}

export interface Config {
  readonly appName: string;
  readonly storage: LunoStorage;
  readonly autoConnect: boolean;

  readonly substrate?: Optional<{
    readonly chains: readonly SubstrateChain[];
    readonly connectors: readonly SubstrateConnectorType[];
    readonly connectorGroups?: readonly ConnectorGroup<SubstrateConnectorType>[];
    readonly transports: Readonly<Record<string, Transport>>;
    readonly subscan?: SubstrateConfigParams['subscan'];
    readonly customTypes?: LunoApiOptions['customTypes'];
    readonly customRpc?: LunoApiOptions['customRpc'];
  }>;

  readonly evm?: Optional<{
    readonly chains: readonly EvmChain[];
    readonly connectors: readonly EvmConnectorType[];
    readonly connectorGroups?: readonly ConnectorGroup<EvmConnectorType>[];
    readonly wagmiConfig: WagmiConfig;
  }>;
}
