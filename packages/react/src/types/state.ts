import type { Config, Connector, Account, Chain } from '@luno-kit/core';
import type { DedotClient } from 'dedot';
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
  setAccount: (accountOrPubkey?: Account | HexString) => void;

  currentChainId?: string;
  currentChain?: Chain;
  currentApi?: DedotClient;
  isApiConnected: boolean;
  isApiReady: boolean;
  apiError: Error | null

  _setConfig: (config: Config) => Promise<void>;

  connect: (connectorId: string, targetChainId?: string) => Promise<void>;
  disconnect: () => Promise<void>;

  switchChain: (newChainId: string) => Promise<void>;

  _setApi: (api?: DedotClient) => void;

  _setIsApiConnected: (isApiConnected: boolean) => void;
  _setIsApiReady: (isApiReady: boolean) => void;
  _setApiError: (error: Error | null) => void

}
