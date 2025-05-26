import React, { ReactNode, useEffect, useMemo } from 'react';
import { ApiPromise } from '@polkadot/api';
import type { Chain, Config, Transport } from '@luno/core';
import { useLunoStore } from '../store'
import { PERSIST_KEY } from '../constants'
import { LunoContext, LunoContextState } from './LunoContext'

interface LunoProviderProps {
  config: Config;
  children: ReactNode;
}

export const LunoProvider: React.FC<LunoProviderProps> = ({ config: configFromProps, children }: LunoProviderProps) => {
  const {
    _setConfig,
    _setApi,
    _setIsApiReady,
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
    disconnect,
    switchChain,
  } = useLunoStore()

  useEffect(() => {
    if (configFromProps) {
      console.log('[LunoProvider] Setting config to store:', configFromProps);
      _setConfig(configFromProps);
    }
  }, [configFromProps]);

  useEffect(() => {
    let currentApiInstance: ApiPromise | null = null; // 用于在清理时引用

    const handleApiConnected = () => {
      if (currentApiInstance) {
        console.log(`[LunoProvider] API (re)connected: ${configFromProps.transports[currentChainId!].endpoint}`);
      }
    };

    const handleApiReady = () => {
      if (currentApiInstance) {
        console.log(`[LunoProvider] API READY: ${currentApiInstance.runtimeChain?.toString()}`);
        _setIsApiReady(true);
      }
    };

    const handleApiError = (error: Error) => {
      if (currentApiInstance) {
        _setApi(undefined);
        _setIsApiReady(false);

        throw new Error(`[LunoProvider] API error on ${currentApiInstance.runtimeChain?.toString()}: ${error}`);
      }
    };

    const handleApiDisconnected = () => {
      if (currentApiInstance) {
        console.warn(`[LunoProvider] API disconnected: ${currentApiInstance.runtimeChain?.toString()}`);
        _setApi(undefined);
        _setIsApiReady(false);
      }
    };

    if (currentApi && currentApi.isConnected && currentApi.genesisHash) {
      if (currentApi.genesisHash.toHex() === currentChainId ) {
        console.log('[LunoProvider] API is already connected to the target chain and ready (or connecting). No action needed.');
        return;
      }
    }

    if (!configFromProps || !currentChainId) {
      if (currentApi && currentApi.isConnected) {
        currentApi.disconnect().catch(console.error);
      }
      _setApi(undefined);
      _setIsApiReady(false);
      return;
    }

    const chainConfig: Chain | undefined = configFromProps.chains.find(
      (c: Chain) => c.genesisHash === currentChainId
    );
    const transportConfig: Transport | undefined = configFromProps.transports[currentChainId];

    if (!chainConfig || !transportConfig) {
      if (currentApi && currentApi.isConnected) {
        currentApi.disconnect().catch(console.error);
      }
      _setApi(undefined);
      _setIsApiReady(false);
      throw new Error(`Configuration missing for chainId: ${currentChainId}`)
    }

    if (currentApi && currentApi.isConnected) {
      console.log('[LunoProvider] Disconnecting API from previous render cycle:', currentApi.runtimeChain?.toString());
      currentApi.disconnect().catch(e => console.error('[LunoProvider] Error disconnecting previous API:', e));
    }

    _setApi(undefined);
    _setIsApiReady(false);

    console.log(`[LunoProvider] Constructing new ApiPromise for chain: ${chainConfig.name} (${currentChainId})`);
    const provider = transportConfig;

    try {
      const newApi = new ApiPromise({
        provider,
        registry: configFromProps.registry,
        types: configFromProps.types,
        typesBundle: configFromProps.typesBundle,
        rpc: configFromProps.rpc,
        // signer: configFromProps.signer,
      });
      currentApiInstance = newApi;
      _setApi(newApi);

      newApi.on('ready', handleApiReady);
      newApi.on('error', handleApiError);
      newApi.on('disconnected', handleApiDisconnected);
      newApi.on('connected', handleApiConnected);

    } catch (error: any) {
      _setApi(undefined);
      _setIsApiReady(false);
      console.error(`[LunoProvider] Failed to construct ApiPromise for ${chainConfig.name}:`, error);
      throw new Error(`[LunoProvider] Failed to construct ApiPromise for ${chainConfig.name}: ${error?.message || error}`)
    }

    // --- 清理函数 ---
    return () => {
      console.log('[LunoProvider] Cleanup function running.');
      if (currentApiInstance) {
        const instanceToClean = currentApiInstance;
        console.log(`[LunoProvider] Cleaning up ApiPromise instance: ${instanceToClean.runtimeChain?.toString()}`);

        instanceToClean.off('ready', handleApiReady);
        instanceToClean.off('error', handleApiError);
        instanceToClean.off('disconnected', handleApiDisconnected);
        // instanceToClean.off('connected', handleApiConnected);

        if (instanceToClean.isConnected) {
          instanceToClean.disconnect().catch(e => console.error('[LunoProvider] Error disconnecting API in cleanup:', e));
        }
      }
      _setApi(undefined);
      _setIsApiReady(false);
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

      console.log('[LunoProvider][AutoConnect] Attempting to auto-connect...');
      try {
        const lastConnectorId = await configFromProps.storage.getItem(PERSIST_KEY.LAST_CONNECTOR_ID);
        const lastChainId = await configFromProps.storage.getItem(PERSIST_KEY.LAST_CHAIN_ID);

        if (lastConnectorId && lastChainId) {
          console.log(`[LunoProvider][AutoConnect] Found persisted session: Connector ID "${lastConnectorId}", Chain ID "${lastChainId}"`);
          await connect(lastConnectorId, lastChainId);
          console.log('[LunoProvider][AutoConnect] Auto-connect process initiated.');
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
        const apiSs58 = currentApi.registry.chainSS58;

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
    isApiReady,
    connect,
    disconnect,
    switchChain,
  }), [
    configInStore, status, activeConnector, accounts, account, currentChainId, currentChain, currentApi, isApiReady,
    connect, disconnect, switchChain, setAccount
  ]);

  return <LunoContext.Provider value={contextValue}>{children}</LunoContext.Provider>;
};
