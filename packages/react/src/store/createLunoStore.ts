import { Substrate } from '@luno-kit/core/utils';
import { immer } from 'zustand/middleware/immer';
import { castDraft } from 'immer';
import { PERSIST_KEY } from '../constants';
import type { LunoState } from '../types';
import { ConnectionStatus } from '../types';
import { create, type StateCreator, type StoreApi, type UseBoundStore } from 'zustand';
import { ChainType, type AccountType, type SubstrateAccount, type EvmAccount, type HexString, type SubstrateChain } from '@luno-kit/core/types'
import { deepEqual } from 'wagmi'

export interface StoredAccountInfo {
  publicKey?: string;
  address: string;
  name?: string;
  source?: string;
}

type LunoStoreCreator = StateCreator<
  LunoState,
  [['zustand/immer', never]],
  [],
  LunoState
>;

const getInitialSubstrateState = () => ({
  status: ConnectionStatus.Disconnected,
  connector: undefined,
  account: undefined,
  allAccounts: [],
  chain: undefined,
  chainId: undefined,
  currentApi: undefined,
  isApiReady: false,
  apiError: null,
});

const getInitialEvmState = () => ({
  status: ConnectionStatus.Disconnected,
  connector: undefined,
  account: undefined,
  allAccounts: [],
  chain: undefined,
  chainId: undefined,
});

const storeLogic: LunoStoreCreator = (set, get) => ({
  config: undefined,

  activeNamespace: ChainType.SUBSTRATE,
  status: ConnectionStatus.Disconnected,
  substrate: getInitialSubstrateState(),
  evm: getInitialEvmState(),
  _setConfig: async (newConfig) => {
    let storedSubstrateChainId: string | null = null;

    let storedActiveNamespace: string | null = null;
    if (newConfig.storage) {
      try {
        if (newConfig.substrate) {
          storedSubstrateChainId = await newConfig.storage.getItem(PERSIST_KEY.SUBSTRATE_LAST_CHAIN_ID);
        }

        storedActiveNamespace = await newConfig.storage.getItem(PERSIST_KEY.LAST_ACTIVE_NAMESPACE);
      } catch (e) {
        console.warn('[LunoStore] Failed to read stored chain ID from storage:', e);
      }
    }

    set((state) => {
      state.config = castDraft(newConfig);

      state.status = ConnectionStatus.Disconnected;
      state.substrate = getInitialSubstrateState();
      state.evm = getInitialEvmState();

      if (storedActiveNamespace === ChainType.EVM || storedActiveNamespace === ChainType.SUBSTRATE) {
        state.activeNamespace = storedActiveNamespace as ChainType;
      } else {
        state.activeNamespace = ChainType.SUBSTRATE;
      }

      if (newConfig.substrate) {
        const targetId = storedSubstrateChainId
          ? newConfig.substrate.chains.find((c: SubstrateChain) => c.genesisHash.toLowerCase() === storedSubstrateChainId?.toLowerCase())?.genesisHash
          : undefined;

        const initialChainId = targetId || newConfig.substrate.chains[0]?.genesisHash;

        if (initialChainId) {
          state.substrate.chainId = initialChainId as HexString;
          state.substrate.chain = newConfig.substrate.chains.find((c: SubstrateChain) => c.genesisHash === initialChainId);
        }
      }
    });
  },
  setActiveNamespace: (namespace) => {
    set((state) => {
      state.activeNamespace = namespace;
      const { config } = get();
      if (config?.storage) {
        config.storage.setItem(PERSIST_KEY.LAST_ACTIVE_NAMESPACE, namespace);
      }
    });
  },

  setSubstrateState: (partialState) => {
    const { config, substrate } = get();

    let accountToSet = partialState.account;

    if (accountToSet) {
      const effectiveAllAccounts = partialState.allAccounts || substrate.allAccounts || [];

      const foundAccount = effectiveAllAccounts.find(acc =>
        Substrate.isSameAddress(acc.address, accountToSet!.address)
      );

      if (foundAccount) {
        accountToSet = foundAccount;
      } else {
        console.warn(`[LunoStore] Account ${accountToSet.address} not found in connected accounts. Ignored.`);
        accountToSet = undefined;
      }
    }

    set((state) => {
      const stateToMerge = { ...partialState };

      if (accountToSet) {
        stateToMerge.account = castDraft(accountToSet);
      } else {
        delete stateToMerge.account;
      }

      Object.assign(state.substrate, stateToMerge);

      if (stateToMerge.status) {
        const isSubstrateConnected = stateToMerge.status === ConnectionStatus.Connected;
        const isEvmConnected = state.evm.status === ConnectionStatus.Connected;

        if (isSubstrateConnected || isEvmConnected) {
          state.status = ConnectionStatus.Connected;
        } else if (state.substrate.status === ConnectionStatus.Disconnected && state.evm.status === ConnectionStatus.Disconnected) {
          state.status = ConnectionStatus.Disconnected;
        }
      }
    });

    if (partialState.status === ConnectionStatus.Disconnected) {
      const current = get();
      if (current.activeNamespace === ChainType.SUBSTRATE && current.evm.status === ConnectionStatus.Connected) {
        current.setActiveNamespace(ChainType.EVM);
      }
    }

    if (accountToSet && config?.storage) {
      const accountInfo = {
        publicKey: accountToSet.publicKey,
        address: accountToSet.address,
        name: accountToSet.name,
        source: accountToSet.meta?.source,
      };
      const str = JSON.stringify(accountInfo);

      Promise.all([
        config.storage.setItem(PERSIST_KEY.SUBSTRATE_LAST_SELECTED_ACCOUNT, str),
        config.storage.setItem(PERSIST_KEY.SUBSTRATE_RECENT_SELECTED_ACCOUNT, str),
      ]).catch(console.error);
    }
  },
  setEvmState: (partialState) => {
    const current = get();

    const changedPatch: Partial<typeof current.evm> = {};
    for (const key of Object.keys(partialState) as Array<keyof typeof current.evm>) {
      const nextValue = partialState[key];
      const prevValue = current.evm[key];
      if (!deepEqual(prevValue, nextValue)) {
        changedPatch[key] = nextValue as never;
      }
    }

    if (Object.keys(changedPatch).length === 0) return;

    set((state) => {

      Object.assign(state.evm, changedPatch);

      if (changedPatch.status) {
        const isEvmConnected = changedPatch.status === ConnectionStatus.Connected;
        const isSubstrateConnected = state.substrate.status === ConnectionStatus.Connected;

        if (isSubstrateConnected || isEvmConnected) {
          state.status = ConnectionStatus.Connected;
        } else if (
          state.substrate.status === ConnectionStatus.Disconnected &&
          state.evm.status === ConnectionStatus.Disconnected
        ) {
          state.status = ConnectionStatus.Disconnected;
        }
      }
    });
    if (changedPatch.status === ConnectionStatus.Disconnected) {
      const latest = get();
      if (
        latest.activeNamespace === ChainType.EVM &&
        latest.substrate.status === ConnectionStatus.Connected
      ) {
        latest.setActiveNamespace(ChainType.SUBSTRATE);
      }
    }
  },

  _setApi: (api) => {
    set((state) => {
      state.substrate.currentApi = api;
    });
  },
  _setIsApiReady: (isReady) => {
    set((state) => {
      state.substrate.isApiReady = isReady;
    });
  },

  _setApiError: (error) => {
    set((state) => {
      state.substrate.apiError = error;
    });
  },
})

export const useLunoStore = create<LunoState>()(
  immer(storeLogic)
) as unknown as UseBoundStore<StoreApi<LunoState>>;
// export const useLunoStore = create<LunoState>((set, get) => ({
//   config: undefined,
//   status: ConnectionStatus.Disconnected,
//   activeConnector: undefined,
//   accounts: [],
//   account: undefined,
//   currentChainId: undefined,
//   currentChain: undefined,
//   currentApi: undefined,
//   isApiReady: false,
//   apiError: null,
//
//   _setConfig: async (newConfig) => {
//     cleanupActiveConnectorListeners();
//
//     let storedChainId: string | null = null;
//     try {
//       storedChainId = await newConfig.storage.getItem(PERSIST_KEY.LAST_CHAIN_ID);
//     } catch (e) {
//       console.warn('[LunoStore] Failed to read stored chain ID from storage:', e);
//     }
//
//     const normalizedStoredChainId = storedChainId?.toLowerCase();
//
//     const initialChainId =
//       normalizedStoredChainId &&
//       newConfig.chains.some((c) => c.genesisHash.toLowerCase() === normalizedStoredChainId)
//         ? normalizedStoredChainId
//         : newConfig.chains[0]?.genesisHash;
//
//     const initialChain = initialChainId
//       ? newConfig.chains.find((c) => c.genesisHash.toLowerCase() === initialChainId)
//       : undefined;
//
//     set({
//       config: newConfig,
//       status: ConnectionStatus.Disconnected,
//       activeConnector: undefined,
//       accounts: [],
//       currentChainId: initialChainId,
//       currentChain: initialChain,
//     });
//   },
//
//   _setApi: (apiInstance) => {
//     set({ currentApi: apiInstance });
//   },
//
//   _setApiError: (err) => {
//     set({ apiError: err });
//   },
//
//   _setIsApiReady: (isReady) => {
//     set({ isApiReady: isReady });
//   },
//
//   setAccount: async (accountOrPublicKey) => {
//     if (!accountOrPublicKey) return;
//
//     const { accounts, config } = get();
//
//     const targetPublicKey =
//       typeof accountOrPublicKey === 'string'
//         ? accountOrPublicKey.toLowerCase()
//         : accountOrPublicKey.publicKey?.toLowerCase();
//
//     const nextAccount = accounts.find((acc) => acc.publicKey?.toLowerCase() === targetPublicKey);
//
//     if (!nextAccount) {
//       throw new Error(
//         '[LunoStore] setAccount: The provided account or address is not in the current accounts list. Ignored.'
//       );
//     }
//
//     set({ account: nextAccount });
//
//     if (config) {
//       try {
//         const accountInfo: StoredAccountInfo = {
//           publicKey: nextAccount.publicKey,
//           address: nextAccount.address,
//           name: nextAccount.name,
//           source: nextAccount.meta?.source,
//         };
//         await config.storage.setItem(
//           PERSIST_KEY.LAST_SELECTED_ACCOUNT_INFO,
//           JSON.stringify(accountInfo)
//         );
//         await config.storage.setItem(
//           PERSIST_KEY.RECENT_SELECTED_ACCOUNT_INFO,
//           JSON.stringify(accountInfo)
//         );
//       } catch (e) {
//         console.error('[LunoStore] Failed to persist selected account:', e);
//       }
//     }
//   },
//
//   // connect: async (connectorId, targetChainId) => {
//   //   const config = get().config;
//   //   if (!config) {
//   //     set({ status: ConnectionStatus.Disconnected });
//   //
//   //     throw new Error('[LunoStore] LunoConfig has not been initialized. Cannot connect.');
//   //   }
//   //
//   //   const connector = config.connectors.find((c) => c.id === connectorId);
//   //   if (!connector) {
//   //     set({ status: ConnectionStatus.Disconnected });
//   //
//   //     throw new Error(`[LunoStore] Connector with ID "${connectorId}" not found in LunoConfig.`);
//   //   }
//   //
//   //   set({ status: ConnectionStatus.Connecting });
//   //
//   //   const previouslyActiveConnector = get().activeConnector;
//   //   if (previouslyActiveConnector && previouslyActiveConnector.id !== connector.id) {
//   //     cleanupActiveConnectorListeners();
//   //   } else if (previouslyActiveConnector && previouslyActiveConnector.id === connector.id) {
//   //     cleanupActiveConnectorListeners();
//   //   }
//   //
//   //   try {
//   //     const handleAccountsChanged = async (newAccounts: Account[]) => {
//   //       if (newAccounts.length === 0) {
//   //         await get().disconnect();
//   //         return;
//   //       }
//   //
//   //       newAccounts.forEach((acc) => {
//   //         if (!acc.publicKey) {
//   //           console.warn(
//   //             `[LunoStore] Account ${acc.address} (from ${connector.name}) is missing publicKey.`
//   //           );
//   //         }
//   //       });
//   //
//   //       let selectedAccount = newAccounts[0];
//   //
//   //       try {
//   //         const lastStoredAccountJson = await config.storage.getItem(
//   //           PERSIST_KEY.LAST_SELECTED_ACCOUNT_INFO
//   //         );
//   //         const recentStoredAccountJson = await config.storage.getItem(
//   //           PERSIST_KEY.RECENT_SELECTED_ACCOUNT_INFO
//   //         );
//   //         const storedAccountJson = lastStoredAccountJson || recentStoredAccountJson;
//   //
//   //         if (storedAccountJson) {
//   //           const storedAccount: StoredAccountInfo = JSON.parse(storedAccountJson);
//   //
//   //           const restoredAccount = newAccounts.find((acc) =>
//   //             isSameAddress(acc.address, storedAccount.address)
//   //           );
//   //
//   //           if (restoredAccount) {
//   //             selectedAccount = restoredAccount;
//   //           }
//   //         }
//   //       } catch (e) {
//   //         console.warn('[LunoStore] Failed to restore account during accountsChanged:', e);
//   //       }
//   //
//   //       set({ accounts: newAccounts, account: selectedAccount });
//   //     };
//   //
//   //     const handleDisconnect = () => {
//   //       if (get().activeConnector?.id === connector.id) {
//   //         cleanupActiveConnectorListeners();
//   //         try {
//   //           config.storage.removeItem(PERSIST_KEY.LAST_CONNECTOR_ID);
//   //           config.storage.removeItem(PERSIST_KEY.LAST_CHAIN_ID);
//   //         } catch (e) {
//   //           console.error('[LunoStore] Failed to remove connection info from storage:', e);
//   //         }
//   //
//   //         set({
//   //           status: ConnectionStatus.Disconnected,
//   //           activeConnector: undefined,
//   //           accounts: [],
//   //         });
//   //       } else {
//   //         console.warn(
//   //           `[LunoStore] Received disconnect event from an inactive connector ${connector.name}. Ignored.`
//   //         );
//   //       }
//   //     };
//   //
//   //     connector.on('accountsChanged', handleAccountsChanged);
//   //     activeConnectorUnsubscribeFunctions.push(() =>
//   //       connector.off('accountsChanged', handleAccountsChanged)
//   //     );
//   //
//   //     connector.on('disconnect', handleDisconnect);
//   //     activeConnectorUnsubscribeFunctions.push(() => connector.off('disconnect', handleDisconnect));
//   //
//   //     const chainIdToUse = targetChainId || get().currentChainId || config.chains[0]?.genesisHash;
//   //
//   //     const accountsFromWallet = await connector.connect(
//   //       config.appName,
//   //       config.chains as Chain[],
//   //       chainIdToUse
//   //     );
//   //
//   //     if (!accountsFromWallet || accountsFromWallet?.length === 0) {
//   //       throw new Error(`[LunoStore] No accounts found from wallet`);
//   //     }
//   //
//   //     let selectedAccount = accountsFromWallet[0];
//   //
//   //     try {
//   //       const lastStoredAccountJson = await config.storage.getItem(
//   //         PERSIST_KEY.LAST_SELECTED_ACCOUNT_INFO
//   //       );
//   //       const recentStoredAccountJson = await config.storage.getItem(
//   //         PERSIST_KEY.RECENT_SELECTED_ACCOUNT_INFO
//   //       );
//   //
//   //       const storedAccountJson = lastStoredAccountJson || recentStoredAccountJson;
//   //       if (storedAccountJson) {
//   //         const storedAccount: StoredAccountInfo = JSON.parse(storedAccountJson);
//   //
//   //         const restoredAccount = accountsFromWallet.find((acc) =>
//   //           isSameAddress(acc.address, storedAccount.address)
//   //         );
//   //
//   //         if (restoredAccount) {
//   //           selectedAccount = restoredAccount;
//   //         }
//   //       }
//   //     } catch (e) {
//   //       console.warn('[LunoStore] Failed to restore selected account from storage:', e);
//   //     }
//   //
//   //     set({
//   //       activeConnector: connector,
//   //       accounts: accountsFromWallet,
//   //       status: ConnectionStatus.Connected,
//   //       account: selectedAccount,
//   //     });
//   //
//   //     const storedAccountInfo: StoredAccountInfo = {
//   //       publicKey: selectedAccount.publicKey,
//   //       address: selectedAccount.address,
//   //       name: selectedAccount.name,
//   //       source: selectedAccount.meta?.source,
//   //     };
//   //
//   //     try {
//   //       config.storage.setItem(PERSIST_KEY.LAST_CONNECTOR_ID, connector.id);
//   //       config.storage.setItem(PERSIST_KEY.RECENT_CONNECTOR_ID, connector.id);
//   //       config.storage.setItem(
//   //         PERSIST_KEY.LAST_SELECTED_ACCOUNT_INFO,
//   //         JSON.stringify(storedAccountInfo)
//   //       );
//   //       config.storage.setItem(
//   //         PERSIST_KEY.RECENT_SELECTED_ACCOUNT_INFO,
//   //         JSON.stringify(storedAccountInfo)
//   //       );
//   //     } catch (e) {
//   //       console.error('[LunoStore] Failed to persist connectorId to storage:', e);
//   //     }
//   //
//   //     const currentStoreChainId = get().currentChainId;
//   //     const chainIdToSet = targetChainId || currentStoreChainId || config.chains[0]?.genesisHash;
//   //
//   //     if (chainIdToSet) {
//   //       const newChain = config.chains.find((c) => c.genesisHash === chainIdToSet);
//   //       if (newChain) {
//   //         if (chainIdToSet !== currentStoreChainId || !get().currentApi) {
//   //           set({
//   //             currentChainId: chainIdToSet,
//   //             currentChain: newChain,
//   //             currentApi: undefined,
//   //           });
//   //         }
//   //         try {
//   //           config.storage.setItem(PERSIST_KEY.LAST_CHAIN_ID, chainIdToSet);
//   //         } catch (e) {
//   //           console.error('[LunoStore] Failed to persist chainId to storage:', e);
//   //         }
//   //       } else {
//   //         console.warn(
//   //           `[LunoStore] After connection, target chain ID "${chainIdToSet}" was not found in config. Current chain state might not have changed. Not persisting chainId.`
//   //         );
//   //       }
//   //     }
//   //     // else {
//   //     //   console.warn(
//   //     //     `[LunoStore] Could not determine target chain ID after connection. Please check config.`
//   //     //   );
//   //     // }
//   //   } catch (err: any) {
//   //     cleanupActiveConnectorListeners();
//   //     set({
//   //       status: ConnectionStatus.Disconnected,
//   //       activeConnector: undefined,
//   //       accounts: [],
//   //     });
//   //
//   //     throw new Error(`${connector.name}: ${err?.message || err}`);
//   //   }
//   // },
//
//   // disconnect: async () => {
//   //   const { activeConnector, status, config } = get();
//   //
//   //   if (
//   //     !activeConnector ||
//   //     status === ConnectionStatus.Disconnecting ||
//   //     status === ConnectionStatus.Disconnected
//   //   ) {
//   //     return;
//   //   }
//   //
//   //   set({ status: ConnectionStatus.Disconnecting });
//   //   try {
//   //     await activeConnector.disconnect();
//   //
//   //     if (config) {
//   //       try {
//   //         await config.storage.removeItem(PERSIST_KEY.LAST_CONNECTOR_ID);
//   //         await config.storage.removeItem(PERSIST_KEY.LAST_CHAIN_ID);
//   //         await config.storage.removeItem(PERSIST_KEY.LAST_SELECTED_ACCOUNT_INFO);
//   //       } catch (e) {
//   //         console.error(
//   //           '[LunoStore] Failed to remove connection info from storage during disconnect action:',
//   //           e
//   //         );
//   //       }
//   //     }
//   //
//   //     cleanupActiveConnectorListeners();
//   //
//   //     set({
//   //       status: ConnectionStatus.Disconnected,
//   //       activeConnector: undefined,
//   //       accounts: [],
//   //       account: undefined,
//   //     });
//   //     if (get().status !== ConnectionStatus.Disconnected) {
//   //       console.warn(
//   //         "[LunoStore] disconnect method called, but status is not yet 'disconnected' (event handler might be delayed or did not fire). Check connector events."
//   //       );
//   //     }
//   //   } catch (err: any) {
//   //     set({ status: ConnectionStatus.Connected });
//   //     throw new Error(
//   //       `[LunoStore] Error disconnecting from ${activeConnector.name}: ${err?.message || err}`
//   //     );
//   //   }
//   // },
//
//   // switchChain: async (newChainId: string) => {
//   //   const { config, currentChainId, currentApi, activeConnector, account, accounts } = get();
//   //
//   //   if (!config) {
//   //     throw new Error('[LunoStore] LunoConfig has not been initialized. Cannot switch chain.');
//   //   }
//   //   if (newChainId === currentChainId) {
//   //     return;
//   //   }
//   //
//   //   const newChain = config.chains.find((c) => c.genesisHash === newChainId);
//   //   if (!newChain) {
//   //     throw new Error(`[LunoStore] Chain with ID "${newChainId}" not found in LunoConfig.`);
//   //   }
//   //
//   //   try {
//   //     try {
//   //       if (currentApi && currentApi.status === 'connected') {
//   //         await currentApi.disconnect();
//   //       }
//   //     } catch (e) {
//   //       console.warn('[LunoStore] Failed to disconnect from previous chain:', e);
//   //     }
//   //
//   //     set({
//   //       currentChainId: newChainId,
//   //       currentChain: newChain,
//   //       currentApi: undefined,
//   //       isApiReady: false,
//   //       apiError: null,
//   //     });
//   //
//   //     const newApi = await createApi({ config, chainId: newChainId });
//   //
//   //     set({
//   //       currentApi: newApi,
//   //       isApiReady: true,
//   //     });
//   //
//   //     await config.storage.setItem(PERSIST_KEY.LAST_CHAIN_ID, newChainId);
//   //   } catch (e: any) {
//   //     set({
//   //       apiError: e,
//   //       isApiReady: false,
//   //     });
//   //   }
//   // },
//
// }));
