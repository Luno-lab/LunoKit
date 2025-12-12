import type { Account } from '@luno-kit/core/types';
import { isSameAddress } from '@luno-kit/core/utils';
import { create } from 'zustand';
import { PERSIST_KEY } from '../constants';
import type { Chain, LunoState } from '../types';
import { ConnectionStatus } from '../types';
import { createApi } from '../utils';

interface StoredAccountInfo {
  publicKey?: string;
  address: string;
  name?: string;
  source?: string;
}

let activeConnectorUnsubscribeFunctions: (() => void)[] = [];

const cleanupActiveConnectorListeners = () => {
  activeConnectorUnsubscribeFunctions.forEach((unsub) => {
    try {
      unsub();
    } catch (e) {
      console.warn('[LunoStore] Error during listener cleanup:', e);
    }
  });
  activeConnectorUnsubscribeFunctions = [];
};

export const useLunoStore = create<LunoState>((set, get) => ({
  config: undefined,
  status: ConnectionStatus.Disconnected,
  activeConnector: undefined,
  accounts: [],
  account: undefined,
  currentChainId: undefined,
  currentChain: undefined,
  currentApi: undefined,
  isApiReady: false,
  apiError: null,

  _setConfig: async (newConfig) => {
    cleanupActiveConnectorListeners();

    let storedChainId: string | null = null;
    try {
      storedChainId = await newConfig.storage.getItem(PERSIST_KEY.LAST_CHAIN_ID);
    } catch (e) {
      console.warn('[LunoStore] Failed to read stored chain ID from storage:', e);
    }

    const normalizedStoredChainId = storedChainId?.toLowerCase();

    const initialChainId =
      normalizedStoredChainId &&
      newConfig.chains.some((c) => c.genesisHash.toLowerCase() === normalizedStoredChainId)
        ? normalizedStoredChainId
        : newConfig.chains[0]?.genesisHash;

    const initialChain = initialChainId
      ? newConfig.chains.find((c) => c.genesisHash.toLowerCase() === initialChainId)
      : undefined;

    set({
      config: newConfig,
      status: ConnectionStatus.Disconnected,
      activeConnector: undefined,
      accounts: [],
      currentChainId: initialChainId,
      currentChain: initialChain,
    });
  },

  _setApi: (apiInstance) => {
    set({ currentApi: apiInstance });
  },

  _setIsApiReady: (isReady) => {
    set({ isApiReady: isReady });
  },

  setAccount: async (accountOrPublicKey) => {
    if (!accountOrPublicKey) return;

    const { accounts, config } = get();

    const targetPublicKey =
      typeof accountOrPublicKey === 'string'
        ? accountOrPublicKey.toLowerCase()
        : accountOrPublicKey.publicKey?.toLowerCase();

    const nextAccount = accounts.find((acc) => acc.publicKey?.toLowerCase() === targetPublicKey);

    if (!nextAccount) {
      throw new Error(
        '[LunoStore] setAccount: The provided account or address is not in the current accounts list. Ignored.'
      );
    }

    set({ account: nextAccount });

    if (config) {
      try {
        const accountInfo: StoredAccountInfo = {
          publicKey: nextAccount.publicKey,
          address: nextAccount.address,
          name: nextAccount.name,
          source: nextAccount.meta?.source,
        };
        await config.storage.setItem(
          PERSIST_KEY.LAST_SELECTED_ACCOUNT_INFO,
          JSON.stringify(accountInfo)
        );
        await config.storage.setItem(
          PERSIST_KEY.RECENT_SELECTED_ACCOUNT_INFO,
          JSON.stringify(accountInfo)
        );
      } catch (e) {
        console.error('[LunoStore] Failed to persist selected account:', e);
      }
    }
  },

  connect: async (connectorId, targetChainId) => {
    const config = get().config;
    if (!config) {
      set({ status: ConnectionStatus.Disconnected });

      throw new Error('[LunoStore] LunoConfig has not been initialized. Cannot connect.');
    }

    const connector = config.connectors.find((c) => c.id === connectorId);
    if (!connector) {
      set({ status: ConnectionStatus.Disconnected });

      throw new Error(`[LunoStore] Connector with ID "${connectorId}" not found in LunoConfig.`);
    }

    set({ status: ConnectionStatus.Connecting });

    const previouslyActiveConnector = get().activeConnector;
    if (previouslyActiveConnector && previouslyActiveConnector.id !== connector.id) {
      cleanupActiveConnectorListeners();
    } else if (previouslyActiveConnector && previouslyActiveConnector.id === connector.id) {
      cleanupActiveConnectorListeners();
    }

    try {
      const handleAccountsChanged = async (newAccounts: Account[]) => {
        if (newAccounts.length === 0) {
          await get().disconnect();
          return;
        }

        newAccounts.forEach((acc) => {
          if (!acc.publicKey) {
            console.warn(
              `[LunoStore] Account ${acc.address} (from ${connector.name}) is missing publicKey.`
            );
          }
        });

        let selectedAccount = newAccounts[0];

        try {
          const lastStoredAccountJson = await config.storage.getItem(
            PERSIST_KEY.LAST_SELECTED_ACCOUNT_INFO
          );
          const recentStoredAccountJson = await config.storage.getItem(
            PERSIST_KEY.RECENT_SELECTED_ACCOUNT_INFO
          );
          const storedAccountJson = lastStoredAccountJson || recentStoredAccountJson;

          if (storedAccountJson) {
            const storedAccount: StoredAccountInfo = JSON.parse(storedAccountJson);

            const restoredAccount = newAccounts.find((acc) =>
              isSameAddress(acc.address, storedAccount.address)
            );

            if (restoredAccount) {
              selectedAccount = restoredAccount;
            }
          }
        } catch (e) {
          console.warn('[LunoStore] Failed to restore account during accountsChanged:', e);
        }

        set({ accounts: newAccounts, account: selectedAccount });
      };

      const handleDisconnect = () => {
        if (get().activeConnector?.id === connector.id) {
          cleanupActiveConnectorListeners();
          try {
            config.storage.removeItem(PERSIST_KEY.LAST_CONNECTOR_ID);
            config.storage.removeItem(PERSIST_KEY.LAST_CHAIN_ID);
          } catch (e) {
            console.error('[LunoStore] Failed to remove connection info from storage:', e);
          }

          set({
            status: ConnectionStatus.Disconnected,
            activeConnector: undefined,
            accounts: [],
          });
        } else {
          console.warn(
            `[LunoStore] Received disconnect event from an inactive connector ${connector.name}. Ignored.`
          );
        }
      };

      connector.on('accountsChanged', handleAccountsChanged);
      activeConnectorUnsubscribeFunctions.push(() =>
        connector.off('accountsChanged', handleAccountsChanged)
      );

      connector.on('disconnect', handleDisconnect);
      activeConnectorUnsubscribeFunctions.push(() => connector.off('disconnect', handleDisconnect));

      const chainIdToUse = targetChainId || get().currentChainId || config.chains[0]?.genesisHash;

      const accountsFromWallet = await connector.connect(
        config.appName,
        config.chains as Chain[],
        chainIdToUse
      );

      if (!accountsFromWallet || accountsFromWallet?.length === 0) {
        throw new Error(`[LunoStore] No accounts found from wallet`);
      }

      let selectedAccount = accountsFromWallet[0];

      try {
        const lastStoredAccountJson = await config.storage.getItem(
          PERSIST_KEY.LAST_SELECTED_ACCOUNT_INFO
        );
        const recentStoredAccountJson = await config.storage.getItem(
          PERSIST_KEY.RECENT_SELECTED_ACCOUNT_INFO
        );

        const storedAccountJson = lastStoredAccountJson || recentStoredAccountJson;
        if (storedAccountJson) {
          const storedAccount: StoredAccountInfo = JSON.parse(storedAccountJson);

          const restoredAccount = accountsFromWallet.find((acc) =>
            isSameAddress(acc.address, storedAccount.address)
          );

          if (restoredAccount) {
            selectedAccount = restoredAccount;
          }
        }
      } catch (e) {
        console.warn('[LunoStore] Failed to restore selected account from storage:', e);
      }

      set({
        activeConnector: connector,
        accounts: accountsFromWallet,
        status: ConnectionStatus.Connected,
        account: selectedAccount,
      });

      const storedAccountInfo: StoredAccountInfo = {
        publicKey: selectedAccount.publicKey,
        address: selectedAccount.address,
        name: selectedAccount.name,
        source: selectedAccount.meta?.source,
      };

      try {
        config.storage.setItem(PERSIST_KEY.LAST_CONNECTOR_ID, connector.id);
        config.storage.setItem(PERSIST_KEY.RECENT_CONNECTOR_ID, connector.id);
        config.storage.setItem(
          PERSIST_KEY.LAST_SELECTED_ACCOUNT_INFO,
          JSON.stringify(storedAccountInfo)
        );
        config.storage.setItem(
          PERSIST_KEY.RECENT_SELECTED_ACCOUNT_INFO,
          JSON.stringify(storedAccountInfo)
        );
      } catch (e) {
        console.error('[LunoStore] Failed to persist connectorId to storage:', e);
      }

      const currentStoreChainId = get().currentChainId;
      const chainIdToSet = targetChainId || currentStoreChainId || config.chains[0]?.genesisHash;

      if (chainIdToSet) {
        const newChain = config.chains.find((c) => c.genesisHash === chainIdToSet);
        if (newChain) {
          if (chainIdToSet !== currentStoreChainId || !get().currentApi) {
            set({
              currentChainId: chainIdToSet,
              currentChain: newChain,
              currentApi: undefined,
            });
          }
          try {
            config.storage.setItem(PERSIST_KEY.LAST_CHAIN_ID, chainIdToSet);
          } catch (e) {
            console.error('[LunoStore] Failed to persist chainId to storage:', e);
          }
        } else {
          console.warn(
            `[LunoStore] After connection, target chain ID "${chainIdToSet}" was not found in config. Current chain state might not have changed. Not persisting chainId.`
          );
        }
      }
      // else {
      //   console.warn(
      //     `[LunoStore] Could not determine target chain ID after connection. Please check config.`
      //   );
      // }
    } catch (err: any) {
      cleanupActiveConnectorListeners();
      set({
        status: ConnectionStatus.Disconnected,
        activeConnector: undefined,
        accounts: [],
      });

      throw new Error(`${connector.name}: ${err?.message || err}`);
    }
  },

  disconnect: async () => {
    const { activeConnector, status, config } = get();

    if (
      !activeConnector ||
      status === ConnectionStatus.Disconnecting ||
      status === ConnectionStatus.Disconnected
    ) {
      return;
    }

    set({ status: ConnectionStatus.Disconnecting });
    try {
      await activeConnector.disconnect();

      if (config) {
        try {
          await config.storage.removeItem(PERSIST_KEY.LAST_CONNECTOR_ID);
          await config.storage.removeItem(PERSIST_KEY.LAST_CHAIN_ID);
          await config.storage.removeItem(PERSIST_KEY.LAST_SELECTED_ACCOUNT_INFO);
        } catch (e) {
          console.error(
            '[LunoStore] Failed to remove connection info from storage during disconnect action:',
            e
          );
        }
      }

      cleanupActiveConnectorListeners();

      set({
        status: ConnectionStatus.Disconnected,
        activeConnector: undefined,
        accounts: [],
        account: undefined,
      });
      if (get().status !== ConnectionStatus.Disconnected) {
        console.warn(
          "[LunoStore] disconnect method called, but status is not yet 'disconnected' (event handler might be delayed or did not fire). Check connector events."
        );
      }
    } catch (err: any) {
      set({ status: ConnectionStatus.Connected });
      throw new Error(
        `[LunoStore] Error disconnecting from ${activeConnector.name}: ${err?.message || err}`
      );
    }
  },

  switchChain: async (newChainId: string) => {
    const { config, currentChainId, currentApi, activeConnector, account, accounts } = get();

    if (!config) {
      throw new Error('[LunoStore] LunoConfig has not been initialized. Cannot switch chain.');
    }
    if (newChainId === currentChainId) {
      return;
    }

    const newChain = config.chains.find((c) => c.genesisHash === newChainId);
    if (!newChain) {
      throw new Error(`[LunoStore] Chain with ID "${newChainId}" not found in LunoConfig.`);
    }

    try {
      try {
        if (currentApi && currentApi.status === 'connected') {
          await currentApi.disconnect();
        }
      } catch (e) {
        console.warn('[LunoStore] Failed to disconnect from previous chain:', e);
      }

      set({
        currentChainId: newChainId,
        currentChain: newChain,
        currentApi: undefined,
        isApiReady: false,
        apiError: null,
      });

      const newApi = await createApi({ config, chainId: newChainId });

      set({
        currentApi: newApi,
        isApiReady: true,
      });

      await config.storage.setItem(PERSIST_KEY.LAST_CHAIN_ID, newChainId);
    } catch (e: any) {
      set({
        apiError: e,
        isApiReady: false,
      });
    }
  },
  _setApiError: (err) => {
    set({ apiError: err });
  },
}));
