import React from 'react';
import type { LegacyClient } from 'dedot';
import type { Chain, Config, Connector, Account } from '@luno-kit/core';
import type { ConnectionStatus } from '../types';
import type { HexString } from 'dedot/utils'

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

export const LunoContext = React.createContext<LunoContextState | undefined>({} as LunoContextState);
