import React, { ReactNode, useEffect, useMemo } from 'react';
import { ApiPromise } from '@polkadot/api';
import type { Chain, Config, Transport } from '@luno/core';
import { useLunoStore } from '../store/createLunoStore'
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
        console.log(`[LunoProvider] API (re)connected: ${currentApiInstance.runtimeChain?.toString()}`);
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

    if (currentApi && currentApi.isConnected && currentApi.genesisHash /* && 其他匹配检查 */) {
      if (currentApi.genesisHash.toHex() === currentChainId /* && 其他相关配置也匹配当前 configFromProps */) {
        console.log('[LunoProvider] API is already connected to the target chain and ready (or connecting). No action needed.');
        return;
      }
    }

    // --- 开始时的状态设置与检查 ---
    if (!configFromProps || !currentChainId) {
      if (currentApi && currentApi.isConnected) { // currentApi 是来自上一个 render 周期的 store 值
        currentApi.disconnect().catch(console.error);
      }
      _setApi(undefined);
      _setIsApiReady(false);
      return; // 提前退出
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
    // 初始设置：在创建新实例前，确保 API 状态为非就绪
    _setApi(undefined);
    _setIsApiReady(false);

    // --- 直接构造新的 ApiPromise ---
    console.log(`[LunoProvider] Constructing new ApiPromise for chain: ${chainConfig.name} (${currentChainId})`);
    const provider = transportConfig; // provider 应该是 WsProvider 或 ScProvider 的实例

    try {
      const newApi = new ApiPromise({
        provider,
        registry: configFromProps.registry, // || 默认的或共享的 registry
        types: configFromProps.types,
        typesBundle: configFromProps.typesBundle,
        rpc: configFromProps.rpc,
        signer: configFromProps.signer,
      });
      currentApiInstance = newApi; // 将新实例赋值给 effect 作用域内的变量
      _setApi(newApi); // 将新实例设置到 Store

      // --- 注册事件监听器 ---
      newApi.on('ready', handleApiReady);
      newApi.on('error', handleApiError);
      newApi.on('disconnected', handleApiDisconnected);
      newApi.on('connected', handleApiConnected);

      // 对于非 light client (如 WsProvider)，连接通常是自动开始的。
      // 对于 light client (ScProvider)，如果之前没有 await provider.connect()，可能需要在这里处理。
      // 但通常 new ApiPromise() 后，它会自行处理连接和 'ready' 事件的触发。

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
        instanceToClean.off('connected', handleApiConnected);

        if (instanceToClean.isConnected) {
          instanceToClean.disconnect().catch(e => console.error('[LunoProvider] Error disconnecting API in cleanup:', e));
        }
      }
      _setApi(undefined);
      _setIsApiReady(false);
    };
  }, [configFromProps, currentChainId, currentApi]);

  // 3. 处理自动连接 (autoConnect)
  useEffect(() => {
    const performAutoConnect = async () => {
      // 1. 从 store 获取最新的 config 和 status
      //    这仍然是一个挑战，不直接调用 getState() 的话，就需要依赖它们

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
          // 调用 connect action
          // connectAction 是从 useLunoStore(state => state.connect) 获取的
          await connect(lastConnectorId, lastChainId);
          console.log('[LunoProvider][AutoConnect] Auto-connect process initiated.');
        } else {
          console.log('[LunoProvider][AutoConnect] No persisted session found or missing data.');
        }
      } catch (error) {
        console.error('[LunoProvider][AutoConnect] Error during auto-connect process:', error);
      }
    };

    if (configFromProps) { // 确保 configFromProps 至少存在
      performAutoConnect();
    }

  }, [configFromProps]);

  // Create context value for LunoContext.Provider
  const contextValue = useMemo<LunoContextState>(() => ({
    config: configInStore,
    status,
    activeConnector,
    accounts: accounts,
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
