import React, {ReactNode, useCallback, useEffect, useMemo} from 'react';
import { DedotClient } from 'dedot';
import type { Chain, Config, Transport } from '@luno-kit/core';
import { useLunoStore } from '../store'
import { PERSIST_KEY } from '../constants'
import { LunoContext, LunoContextState } from './LunoContext'
import {wsProvider} from '@luno-kit/core'

interface LunoProviderProps {
  config: Config;
  children: ReactNode;
}

export const LunoProvider: React.FC<LunoProviderProps> = ({ config: configFromProps, children }: LunoProviderProps) => {
  const {
    _setConfig,
    _setApi,
    _setIsApiReady,
    _setApiError,
    _setIsApiConnected,
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
    isApiConnected,
    apiError,
    disconnect,
    switchChain,
  } = useLunoStore()

  const clearApiState = useCallback(() => {
    _setApi(undefined);
    _setIsApiConnected(false)
    _setIsApiReady(false)
  }, [_setApi, _setIsApiConnected, _setIsApiReady])

  useEffect(() => {
    if (configFromProps) {
      console.log('[LunoProvider] Setting config to store:', configFromProps);
      _setConfig(configFromProps);
    }
  }, [configFromProps]);

  useEffect(() => {
    let currentApiInstance: DedotClient | null = null;

    const handleApiConnected = () => {
      if (currentApiInstance) {
        _setIsApiConnected(true)
        // _setIsApiReady(true);

        console.log(`[LunoProvider] API (re)connected: ${configFromProps.transports[currentChainId!]}`);

        // currentApiInstance.isReady
        //   .then(() => {
        //     console.log('[LunoProvider] API confirmed ready after reconnection');
        //     _setIsApiReady(true);
        //     _setApiError(null);
        //   })
        //   .catch((error) => {
        //     console.error('[LunoProvider] API failed to become ready after reconnection:', error);
        //     _setApiError(error);
        //   });
      }
    };

    const handleApiReady = async () => {
      if (currentApiInstance) {
        const runtimeVersion = await currentApiInstance.getRuntimeVersion()
        console.log(`[LunoProvider] API READY: ${runtimeVersion.specVersion}`);
        _setIsApiReady(true);
        _setApiError(null);
      }
    };

    const handleApiError = (error: any) => {
      if (currentApiInstance) {
        _setIsApiConnected(false)
        _setApiError(error);
        // console.error(`[LunoProvider] API error on:`, error.target.url || error.currentTarget.url);
        console.error(`[LunoProvider] API error on:`, error);
      }
    };

    const handleApiDisconnected = () => {
      if (currentApiInstance) {
        console.warn(`[LunoProvider] API disconnected...`);
        clearApiState()
      }
    };

    if (currentApi && currentApi.status === 'connected' && currentApi.genesisHash) {
      if (currentApi.genesisHash === currentChainId ) {
        console.log('[LunoProvider] API is already connected to the target chain and ready. No action needed.');
        return;
      }
    }

    if (!configFromProps || !currentChainId) {
      if (currentApi && currentApi.status === 'connected') {
        currentApi.disconnect().catch(console.error);
      }
      clearApiState()
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
      clearApiState()
      throw new Error(`Configuration missing for chainId: ${currentChainId}`)
    }

    if (currentApi && currentApi.status === 'connected') {
      console.log('[LunoProvider] Disconnecting API from previous render cycle:', currentApi.chainSpec.chainName());
      currentApi.disconnect().catch(e => console.error('[LunoProvider] Error disconnecting previous API:', e));
    }

    clearApiState()

    console.log(`[LunoProvider] Constructing new ApiPromise for chain: ${chainConfig.name} (${currentChainId})`);
    const provider = wsProvider(transportConfig);

    try {
      const newApi = new DedotClient(provider);

      currentApiInstance = newApi;
      _setApi(newApi);

      newApi.on('ready', handleApiReady);
      newApi.on('error', handleApiError);
      newApi.on('disconnected', handleApiDisconnected);
      newApi.on('connected', handleApiConnected);

    } catch (error: any) {
      clearApiState()
      throw new Error(`[LunoProvider] Failed to construct ApiPromise for ${chainConfig.name}: ${error?.message || error}`)
    }

    return () => {
      if (currentApiInstance) {
        const instanceToClean = currentApiInstance;
        console.log(`[LunoProvider] Cleaning up ApiPromise instance: ${instanceToClean}`);

        instanceToClean.off('ready', handleApiReady);
        instanceToClean.off('error', handleApiError);
        instanceToClean.off('disconnected', handleApiDisconnected);
        instanceToClean.off('connected', handleApiConnected);

        if (instanceToClean.status === 'connected') {
          instanceToClean.disconnect().catch(e => console.error('[LunoProvider] Error disconnecting API in cleanup:', e));
        }
      }
      clearApiState()
    };
  }, [configFromProps, currentChainId]);

  useEffect(() => {
    const performAutoConnect = async () => {

      if (!configFromProps.autoConnect) {
        console.log('[LunoProvider][AutoConnect] AutoConnect disabled or config not set.');
        return;
      }

      if (!configFromProps.storage) {
        console.warn('[LunoProvider][AutoConnect] Storage not available, cannot auto-connect.');
        return;
      }

      try {
        const lastConnectorId = await configFromProps.storage.getItem(PERSIST_KEY.LAST_CONNECTOR_ID);
        const lastChainId = await configFromProps.storage.getItem(PERSIST_KEY.LAST_CHAIN_ID);

        if (lastConnectorId && lastChainId) {
          console.log(`[LunoProvider][AutoConnect] Found persisted session: Connector ID "${lastConnectorId}", Chain ID "${lastChainId}"`);
          await connect(lastConnectorId, lastChainId);
        } else {
          console.log('[LunoProvider][AutoConnect] No persisted session found or missing data.');
        }
      } catch (error) {
        console.error('[LunoProvider][AutoConnect] Error during auto-connect process:', error);
      }
    };

    if (configFromProps) {
      performAutoConnect();
    }

  }, [configFromProps]);


  useEffect(() => {
    if (isApiReady && currentApi && currentChain && currentChain.ss58Format) {
      try {
        const apiSs58 = currentApi.consts.system.ss58Prefix;

        if (apiSs58 && apiSs58 !== currentChain.ss58Format) {
          console.error(
            `[LunoProvider] SS58 Format Mismatch for chain "${currentChain.name}" (genesisHash: ${currentChain.genesisHash}):\n` +
            `  - Configured SS58Format: ${currentChain.ss58Format}\n` +
            `  - Node Runtime SS58Format: ${apiSs58}\n` +
            `Please verify your Luno configuration for this chain to ensure correct address display and interaction.`
          );
        } else if (!apiSs58) {
          console.warn(
            `[LunoProvider] Could not determine SS58 format from the API for chain "${currentChain.name}". ` +
            `Cannot validate configured SS58Format (${currentChain.ss58Format}). The application will use the configured value.`
          );
        } else {
        }
      } catch (e) {
        console.error(
          `[LunoProvider] Error retrieving SS58 format from API for chain "${currentChain.name}" while attempting validation:`,
          e
        );
      }
    }
  }, [isApiReady, currentApi, currentChain]);

  const contextValue = useMemo<LunoContextState>(() => ({
    config: configInStore,
    status,
    activeConnector,
    accounts,
    account,
    setAccount,
    currentChainId,
    currentChain,
    currentApi,
    isApiConnected,
    isApiReady,
    connect,
    disconnect,
    switchChain,
    apiError,
  }), [
    configInStore, status, activeConnector, accounts, account, currentChainId, currentChain, currentApi, isApiReady, isApiConnected, apiError,
    connect, disconnect, switchChain, setAccount
  ]);

  return <LunoContext.Provider value={contextValue}>{children}</LunoContext.Provider>;
};
