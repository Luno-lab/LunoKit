import type {
  EvmAccount,
  SubstrateAccount,
  HexString,
  AccountType,
  SubstrateChain,
  EvmChain,
  Config,
  Connector,
  ChainType,
  Optional,
  SubstrateConnectorType,
  EvmConnectorType,
} from '@luno-kit/core/types';
import type { LegacyClient } from 'dedot';

export enum ConnectionStatus {
  Disconnected = 'disconnected',
  Connecting = 'connecting',
  Connected = 'connected',
  Reconnecting = 'reconnecting'
}

export type LunoClient = LegacyClient & {
  isEthereum: boolean;
};

type Chain = EvmChain | SubstrateChain;

export interface NamespaceState<
  TConnector = Connector,
  TAccount = AccountType,
  TChain = Chain,
  TChainId = HexString | number,
> {
  status: ConnectionStatus;
  connector?: Optional<TConnector>;
  account?: Optional<TAccount>;
  allAccounts: Optional<TAccount[]>;
  chain?: Optional<TChain>;
  chainId?: Optional<TChainId>;
}

type SubstrateNamespace = NamespaceState<SubstrateConnectorType, SubstrateAccount, SubstrateChain, HexString> & {
  currentApi?: Optional<LunoClient>;
  isApiReady: boolean;
  apiError: Error | null;
};

type EvmNamespace = NamespaceState<EvmConnectorType, EvmAccount, EvmChain, number>;

export interface LunoState {
  config?: Optional<Config>;

  activeNamespace: ChainType;

  setActiveNamespace: (namespace: ChainType) => void;

  status: ConnectionStatus.Connected | ConnectionStatus.Disconnected;

  substrate: SubstrateNamespace;

  evm: EvmNamespace;

  setSubstrateState: (state: Partial<SubstrateNamespace>) => void;
  setEvmState: (state: Partial<EvmNamespace>) => void;

  _setConfig: (config: Config) => Promise<void>;

  _setApi: (api?: Optional<LunoClient>) => void;
  _setIsApiReady: (isApiReady: boolean) => void;
  _setApiError: (error: Error | null) => void;
}
