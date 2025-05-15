import {create} from 'zustand';
import type {LunoState} from '../types'; // Adjust path as needed
import {ConnectionStatus} from '../types'; // Adjust path as needed
import type {Account, LunoStorage} from '@luno/core';
import {PERSIST_KEY} from '../constants';

// --- Event Listener Management ---
// This array exists in the closure of the Zustand `create` function,
// holding unsubscribe functions for the currently active connector.
let activeConnectorUnsubscribeFunctions: (() => void)[] = [];

const cleanupActiveConnectorListeners = () => {
  activeConnectorUnsubscribeFunctions.forEach(unsub => {
    try {
      unsub(); // Execute unsubscribe
    } catch (e) {
      console.warn('[LunoStore] Error during listener cleanup:', e);
    }
  });
  activeConnectorUnsubscribeFunctions = []; // Clear the array
};

export const useLunoStore = create<LunoState>((set, get) => ({
  // --- Initial State ---
  config: undefined,
  status: ConnectionStatus.Disconnected,
  activeConnector: undefined,
  accounts: [],
  account: undefined,
  currentChainId: undefined,
  currentChain: undefined,
  currentApi: undefined,
  isApiReady: false,

  // --- Actions ---

  _setConfig: async (newConfig) => {
    cleanupActiveConnectorListeners(); // Clean up listeners from any previous config/session

    const storedChainId = await newConfig.storage.getItem(PERSIST_KEY.LAST_CHAIN_ID);
    const normalizedStoredChainId = storedChainId?.toLowerCase();

    const initialChainId =
      normalizedStoredChainId && newConfig.chains.some(c => c.genesisHash.toLowerCase() === normalizedStoredChainId)
        ? normalizedStoredChainId
        : newConfig.chains[0]?.genesisHash;

    const initialChain = initialChainId
      ? newConfig.chains.find(c => c.genesisHash.toLowerCase() === initialChainId)
      : undefined;

    set({
      config: newConfig,
      status: ConnectionStatus.Disconnected,
      activeConnector: undefined,
      accounts: [],
      currentChainId: initialChainId,
      currentChain: initialChain,
      currentApi: undefined // ApiPromise will be initialized by Provider for this initialChain
    });
  },

  _setApi: (apiInstance) => {
    set({currentApi: apiInstance});
  },

  _setIsApiReady: (isReady) => {
    set({isApiReady: isReady});
  },

  setAccount: (accountOrPublicKey) => {
    const accounts = get().accounts;

    const targetPublicKey =
      typeof accountOrPublicKey === 'string'
        ? accountOrPublicKey.toLowerCase()
        : accountOrPublicKey.publicKey?.toLowerCase()

    const nextAccount = accounts.find(acc => acc.publicKey?.toLowerCase() === targetPublicKey);

    if (!nextAccount) {
      console.warn('[LunoStore] setAccount: The provided account or address is not in the current accounts list. Ignored.');
      return;
    }

    set({ account: nextAccount });
  },

  connect: async (connectorId, targetChainId) => {
    const config = get().config;
    if (!config) {
      set({status: ConnectionStatus.Disconnected});

      throw new Error('[LunoStore] LunoConfig has not been initialized. Cannot connect.')
    }

    const connector = config.connectors.find(c => c.id === connectorId);
    if (!connector) {
      set({status: ConnectionStatus.Disconnected});

      throw new Error(`[LunoStore] Connector with ID "${connectorId}" not found in LunoConfig.`)
    }

    set({status: ConnectionStatus.Connecting });

    const previouslyActiveConnector = get().activeConnector;
    if (previouslyActiveConnector && previouslyActiveConnector.id !== connector.id) {
      console.log(`[LunoStore] Switching connector. Cleaning up listeners for old connector: ${previouslyActiveConnector.id}`);
      cleanupActiveConnectorListeners();
    } else if (previouslyActiveConnector && previouslyActiveConnector.id === connector.id) {
      console.log(`[LunoStore] Attempting to reconnect with the same connector: ${connector.id}. Cleaning up existing listeners.`);
      cleanupActiveConnectorListeners();
    }


    try {
      const handleAccountsChanged = (newAccounts: Account[]) => {
        console.log(`[LunoStore] accountsChanged event from ${connector.name}:`, newAccounts);
        newAccounts.forEach(acc => {
          if (!acc.publicKey) {
            console.warn(`[LunoStore] Account ${acc.address} (from ${connector.name}) is missing publicKey.`);
          }
        });
        set({accounts: newAccounts});
      };

      const handleDisconnect = () => {
        console.log(`[LunoStore] disconnect event from ${connector.name}`);
        if (get().activeConnector?.id === connector.id) {
          cleanupActiveConnectorListeners();
          // Clear persisted connection info from storage
          try {
            config.storage.removeItem(PERSIST_KEY.LAST_CONNECTOR_ID);
            config.storage.removeItem(PERSIST_KEY.LAST_CHAIN_ID);
            console.log('[LunoStore] Removed persisted connection info from storage due to disconnect event.');
          } catch (e) {
            console.error('[LunoStore] Failed to remove connection info from storage:', e);
          }

          set({
            status: ConnectionStatus.Disconnected,
            activeConnector: undefined,
            accounts: [],
          });
        } else {
          console.warn(`[LunoStore] Received disconnect event from an inactive connector ${connector.name}. Ignored.`);
        }
      };

      connector.on('accountsChanged', handleAccountsChanged);
      activeConnectorUnsubscribeFunctions.push(() => connector.off('accountsChanged', handleAccountsChanged));

      connector.on('disconnect', handleDisconnect);
      activeConnectorUnsubscribeFunctions.push(() => connector.off('disconnect', handleDisconnect));

      const accountsFromWallet = await connector.connect();

      accountsFromWallet.forEach(acc => {
        if (!acc.publicKey) {
          console.error(`[LunoStore] CRITICAL WARNING: Account ${acc.address} from connector ${connector.name} was returned without a publicKey! SS58 address formatting will fail.`);
        }
      });

      set({
        activeConnector: connector,
        accounts: accountsFromWallet,
        status: ConnectionStatus.Connected,
      });

      // Persist the connected connector ID
      try {
        config.storage.setItem(PERSIST_KEY.LAST_CONNECTOR_ID, connector.id);
        console.log(`[LunoStore] Persisted connectorId: ${connector.id}`);
      } catch (e) {
        console.error('[LunoStore] Failed to persist connectorId to storage:', e);
      }

      const currentStoreChainId = get().currentChainId;
      const chainIdToSet = targetChainId || currentStoreChainId || config.chains[0]?.genesisHash;

      if (chainIdToSet) {
        const newChain = config.chains.find(c => c.genesisHash === chainIdToSet);
        if (newChain) {
          if (chainIdToSet !== currentStoreChainId || !get().currentApi) {
            set({
              currentChainId: chainIdToSet,
              currentChain: newChain,
              currentApi: undefined // ApiPromise will be set by LunoProvider based on currentChainId
            });
          }
          // Persist the chain ID after it's successfully set in the store
          try {
            config.storage.setItem(PERSIST_KEY.LAST_CHAIN_ID, chainIdToSet);
            console.log(`[LunoStore] Persisted chainId: ${chainIdToSet}`);
          } catch (e) {
            console.error('[LunoStore] Failed to persist chainId to storage:', e);
          }
        } else {
          console.warn(`[LunoStore] After connection, target chain ID "${chainIdToSet}" was not found in config. Current chain state might not have changed. Not persisting chainId.`);
        }
      } else {
        console.warn(`[LunoStore] Could not determine target chain ID after connection. Please check config.`);
      }

    } catch (err: any) {
      cleanupActiveConnectorListeners();
      set({
        status: ConnectionStatus.Disconnected,
        activeConnector: undefined,
        accounts: []
      });

      throw new Error(`[LunoStore] Error connecting with ${connector.name}: ${err?.message || err}`)
    }
  },

  disconnect: async () => {
    const {activeConnector, status, config } = get();

    if (!activeConnector || status === ConnectionStatus.Disconnecting || status === ConnectionStatus.Disconnected) {
      console.log('[LunoStore] No active connector or already disconnected/disconnecting. Disconnect action aborted.');
      return;
    }

    set({ status: ConnectionStatus.Disconnecting });
    try {
      await activeConnector.disconnect();

      if (config) {
        try {
          console.log('[LunoStore] Attempting to remove persisted connection info due to user disconnect action...');
          await config.storage.removeItem(PERSIST_KEY.LAST_CONNECTOR_ID);
          await config.storage.removeItem(PERSIST_KEY.LAST_CHAIN_ID);
          console.log('[LunoStore] Removed persisted connection info from storage.');
        } catch (e) {
          console.error('[LunoStore] Failed to remove connection info from storage during disconnect action:', e);
        }
      }

      cleanupActiveConnectorListeners()

      set({ status: ConnectionStatus.Disconnected, activeConnector: undefined, accounts: [] })
      if (get().status !== ConnectionStatus.Disconnected) {
        console.warn("[LunoStore] disconnect method called, but status is not yet 'disconnected' (event handler might be delayed or did not fire). Check connector events.");
      }
    } catch (err: any) {
      set({status: ConnectionStatus.Connected }); // Revert status if disconnect call failed
      throw new Error(`[LunoStore] Error disconnecting from ${activeConnector.name}:${err?.message || err}`)
    }
  },

  switchChain: async (newChainId: string) => {
    const {config, currentChainId} = get();

    if (!config) {
      throw new Error('[LunoStore] LunoConfig has not been initialized. Cannot switch chain.');
    }
    if (newChainId === currentChainId) {
      console.log(`[LunoStore] Already on chain ${newChainId}. No switch needed.`);
      return;
    }

    const newChain = config.chains.find(c => c.genesisHash === newChainId);
    if (!newChain) {
      throw new Error(`[LunoStore] Chain with ID "${newChainId}" not found in LunoConfig.`);
    }

    console.log(`[LunoStore] Attempting to switch chain to ${newChain.name} (ID: ${newChainId})`);
    set({
      currentChainId: newChainId,
      currentChain: newChain,
      currentApi: undefined, // Clear currentApi, Provider will set the new one.
      isApiReady: false,
    });

    try {
      await config.storage.setItem(PERSIST_KEY.LAST_CHAIN_ID, newChainId);
      console.log(`[LunoStore] Persisted new chainId: ${newChainId} after chain switch.`);
    } catch (e) {
      throw new Error(`[LunoStore] Failed to persist new chainId to storage: ${e?.message || e}`);
    }
  }
}));
