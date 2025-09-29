import type { Account, Chain, Config, Connector, HexString } from '@luno-kit/core/types';
import type { LegacyClient } from 'dedot';
import React from 'react';
import type { ConnectionStatus } from '../types';

export interface LunoContextState {
  config?: Config;
  status: ConnectionStatus;
  activeConnector?: Connector;
  accounts: Account[];
  account?: Account;
  setAccount: (accountOrPublicKey?: Account | HexString) => void;
  currentChainId?: string;
  currentChain?: Chain;
  currentApi?: LegacyClient;
  isApiReady: boolean;
  apiError: Error | null;

  connect: (connectorId: string, targetChainId?: string) => Promise<void>;
  disconnect: () => Promise<void>;
  switchChain: (newChainId: string) => Promise<void>;
}

export const LunoContext = React.createContext<LunoContextState | undefined>(
  {} as LunoContextState
);
