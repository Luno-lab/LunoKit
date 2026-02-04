import type { Account, Chain, Config, Connector, HexString } from '@luno-kit/core/types';
import React from 'react';
import type { ConnectionStatus, Optional } from '../types';
import type { LunoClient } from '../types/state';

export interface LunoContextState {
  config?: Optional<Config>;
  status: ConnectionStatus;
  activeConnector?: Optional<Connector>;
  accounts: Account[];
  account?: Optional<Account>;
  setAccount: (accountOrPublicKey?: Optional<Account | HexString>) => void;
  currentChainId?: Optional<string>;
  currentChain?: Optional<Chain>;
  currentApi?: Optional<LunoClient>;
  isApiReady: boolean;
  apiError: Error | null;

  connect: (connectorId: string, targetChainId?: Optional<string>) => Promise<void>;
  disconnect: () => Promise<void>;
  switchChain: (newChainId: string) => Promise<void>;
}

export const LunoContext = React.createContext<LunoContextState | undefined>(
  {} as LunoContextState
);
