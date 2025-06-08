import React from 'react';
import type { ApiPromise } from '@polkadot/api';
import type { Chain, Config, Connector, Account } from '@luno-kit/core';
import type { ConnectionStatus } from '../types';
import type { HexString } from '@polkadot/util/types' // Assuming ConnectionStatus is in a shared types file

// Define the type for the context value
// This should mirror the state and actions available from useLunoStore
export interface LunoContextState {
  // State
  config?: Config;
  status: ConnectionStatus;
  activeConnector?: Connector;
  accounts: Account[];
  account?: Account;
  setAccount: (accountOrAddress?: Account | HexString) => void;
  currentChainId?: string;
  currentChain?: Chain;
  currentApi?: ApiPromise;
  isApiReady: boolean;
  apiError: Error | null;

  // Public Actions
  connect: (connectorId: string, targetChainId?: string) => Promise<void>;
  disconnect: () => Promise<void>;
  switchChain: (newChainId: string) => Promise<void>;
}

export const LunoContext = React.createContext<LunoContextState | undefined>({} as LunoContextState);
