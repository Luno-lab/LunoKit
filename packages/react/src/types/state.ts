import type { Config, Connector, Account, Chain } from '@luno-kit/core';
import type { LegacyClient } from 'dedot';
import type { HexString } from 'dedot/utils'

export enum ConnectionStatus {
  Disconnected = 'disconnected',
  Connecting = 'connecting',
  Disconnecting = 'disconnecting',
  Connected = 'connected',
}

export interface LunoState {
  config?: Config;


  status: ConnectionStatus;

  activeConnector?: Connector;

  accounts: Account[];
  account?: Account;
  setAccount: (accountOrPubkey?: Account | HexString) => Promise<void>;

  currentChainId?: string;
  currentChain?: Chain;
  currentApi?: LegacyClient;
  isApiReady: boolean;
  apiError: Error | null

  _setConfig: (config: Config) => Promise<void>;

  connect: (connectorId: string, targetChainId?: string) => Promise<void>;
  disconnect: () => Promise<void>;

  switchChain: (newChainId: string) => Promise<void>;

  _setApi: (api?: LegacyClient) => void;

  _setIsApiReady: (isApiReady: boolean) => void;
  _setApiError: (error: Error | null) => void

}
