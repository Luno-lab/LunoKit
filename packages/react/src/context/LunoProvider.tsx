import type React from 'react';
import { type ReactNode, useCallback, useEffect, useMemo } from 'react';
import { PERSIST_KEY } from '../constants';
import { useIsInitialized } from '../hooks/useIsInitialized';
import { useLunoStore } from '../store';
import type { Chain, Config, Transport } from '../types';
import { createApi, sleep } from '../utils';
import { LunoContext, type LunoContextState } from './LunoContext';

interface LunoProviderProps {
  config: Config;
  children: ReactNode;
}

export const LunoProvider: React.FC<LunoProviderProps> = ({
  config: configFromProps,
  children,
}: LunoProviderProps) => {
  const {
    _setConfig,
    _setApi,
    _setIsApiReady,
    _setApiError,
    setAccount,
    currentChainId,
    config: configInStore,
    currentApi,
    connect,
    status,
    activeConnector,
    accounts,
    account,
    currentChain,
    isApiReady,
    apiError,
    disconnect,
    switchChain,
  } = useLunoStore();
  const { markAsInitialized, isInitialized } = useIsInitialized();

  const clearApiState = useCallback(() => {
    _setApi(undefined);
    _setIsApiReady(false);
  }, [_setApi, _setIsApiReady]);

  useEffect(() => {
    if (configFromProps) {
      console.log('[LunoProvider] Setting config to store:', configFromProps);
      _setConfig(configFromProps);
    }
  }, [configFromProps]);

  useEffect(() => {
    if (isInitialized) return;
    if (!configFromProps || !currentChainId) {
      if (currentApi && currentApi.status === 'connected') {
        currentApi.disconnect().catch(console.error);
      }
      clearApiState();
      return;
    }

    const chainConfig: Chain | undefined = configFromProps.chains.find(
      (c: Chain) => c.genesisHash === currentChainId
    );
    const transportConfig: Transport | undefined = configFromProps.transports[currentChainId];

    if (!chainConfig || !transportConfig) {
      if (currentApi && currentApi.status === 'connected') {
        currentApi.disconnect().catch(console.error);
      }
      clearApiState();
      return;
    }

    if (currentApi && currentApi.status === 'connected') {
      console.log(
        '[LunoProvider]: Disconnecting API from previous render cycle:',
        currentApi.runtimeVersion.specName
      );
      currentApi
        .disconnect()
        .catch((e) => console.error('[LunoProvider] Error disconnecting previous API:', e));
    }

    clearApiState();

    createApi({ config: configFromProps, chainId: currentChainId })
      .then((api) => {
        _setApi(api);
        _setIsApiReady(true);
      })
      .catch((e) => {
        clearApiState();
        _setApiError(e);
      })
      .finally(() => markAsInitialized());
  }, [configFromProps, currentChainId]);

  useEffect(() => {
    const performAutoConnect = async () => {
      await sleep(500);
      if (!configFromProps.autoConnect) {
        console.log('[LunoProvider]: AutoConnect disabled or config not set.');
        return;
      }

      if (!configFromProps.storage) {
        console.warn('[LunoProvider]: AutoConnect Storage not available, cannot auto-connect.');
        return;
      }

      try {
        const lastConnectorId = await configFromProps.storage.getItem(
          PERSIST_KEY.LAST_CONNECTOR_ID
        );
        const lastChainId = await configFromProps.storage.getItem(PERSIST_KEY.LAST_CHAIN_ID);

        if (lastConnectorId) {
          console.log(
            `[LunoProvider]: AutoConnect Found persisted session: Connector ID "${lastConnectorId}", Chain ID "${lastChainId}"`
          );
          await connect(lastConnectorId, lastChainId || undefined);
        } else {
          console.log('[LunoProvider]: AutoConnect No persisted session found or missing data.');
        }
      } catch (error) {
        console.error('[LunoProvider]: AutoConnect Error during auto-connect process:', error);
      }
    };

    if (configFromProps) {
      performAutoConnect();
    }
  }, [configFromProps]);

  useEffect(() => {
    if (
      isApiReady &&
      currentApi &&
      currentChain &&
      currentChain.ss58Format !== undefined &&
      currentChain.ss58Format !== null
    ) {
      try {
        const apiSs58 = currentApi.consts.system.ss58Prefix;

        if (apiSs58 !== null && apiSs58 !== undefined && apiSs58 !== currentChain.ss58Format) {
          console.error(
            `[LunoProvider]: SS58 Format Mismatch for chain "${currentChain.name}" (genesisHash: ${currentChain.genesisHash}):\n` +
              `  - Configured SS58Format: ${currentChain.ss58Format}\n` +
              `  - Node Runtime SS58Format: ${apiSs58}\n` +
              `Please verify your Luno configuration for this chain to ensure correct address display and interaction.`
          );
        } else if (apiSs58 === null || apiSs58 === undefined) {
          console.warn(
            `[LunoProvider]: Could not determine SS58 format from the API for chain "${currentChain.name}". ` +
              `Cannot validate configured SS58Format (${currentChain.ss58Format}). The application will use the configured value.`
          );
        }
      } catch (e) {
        console.error(
          `[LunoProvider]: Error retrieving SS58 format from API for chain "${currentChain.name}" while attempting validation:`,
          e
        );
      }
    }
  }, [isApiReady, currentApi, currentChain]);

  const contextValue = useMemo<LunoContextState>(
    () => ({
      config: configInStore,
      status,
      activeConnector,
      accounts,
      account,
      setAccount,
      currentChainId,
      currentChain,
      currentApi,
      isApiReady,
      connect,
      disconnect,
      switchChain,
      apiError,
    }),
    [
      configInStore,
      status,
      activeConnector,
      accounts,
      account,
      currentChainId,
      currentChain,
      currentApi,
      isApiReady,
      apiError,
      connect,
      disconnect,
      switchChain,
      setAccount,
    ]
  );

  return <LunoContext.Provider value={contextValue}>{children}</LunoContext.Provider>;
};
