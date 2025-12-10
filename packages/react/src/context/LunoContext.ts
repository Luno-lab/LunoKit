import type { Account, Chain, Config, Connector, HexString } from '@luno-kit/core/types';
import type { LegacyClient } from 'dedot';
import React from 'react';
import type { ConnectionStatus, Optional } from '../types';

export interface LunoContextState {
  config?: Optional<Config>;
  status: ConnectionStatus;
  activeConnector?: Optional<Connector>;
  accounts: Account[];
  account?: Optional<Account>;
  setAccount: (accountOrPublicKey?: Account | HexString) => void;
  currentChainId?: Optional<string>;
  currentChain?: Optional<Chain>;
  currentApi?: Optional<LegacyClient>;
  isApiReady: boolean;
  apiError: Error | null;

  connect: (connectorId: string, targetChainId?: string) => Promise<void>;
  disconnect: () => Promise<void>;
  switchChain: (newChainId: string) => Promise<void>;
}

export const LunoContext = React.createContext<LunoContextState | undefined>(
  {} as LunoContextState
);
