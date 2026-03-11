import { ChainType, type EvmAccount, type HexString, type SubstrateAccount, type SubstrateSigner, type EvmSigner,type SubstrateConnectorType, type EvmChain, type EvmConnectorType, type SubstrateChain, type Transport, type Config } from '@luno-kit/core/types';
import React, { useRef, useSyncExternalStore } from 'react';
import { type ReactNode, useCallback, useEffect, useMemo } from 'react';
import { WagmiProvider} from 'wagmi';
import { PERSIST_KEY } from '../constants';
import { useIsInitialized } from '../hooks/useIsInitialized';
import { useLunoStore } from '../store';
import { createApi, sleep } from '../utils';
import { LunoContext, type LunoContextState } from './LunoContext';
import { useConnect } from '../hooks'
import { useSubstrateEvents } from '../hooks/useSubstrateEvents'
import { ConnectionStatus } from '../types'
import { watchConnection, watchChainId, getChainId, disconnect } from '@wagmi/core'

interface LunoProviderProps {
  config: Config;
  children: ReactNode;
}

const EvmStateSync = () => {
  const setEvmState = useLunoStore((state) => state.setEvmState);
  const evmConnectors = useLunoStore((state) => state.config?.evm?.connectors);
  const wagmiConfig = useLunoStore((state) => state.config?.evm?.wagmiConfig);

  const config = useLunoStore((state) => state.config);

  const unwatchRef = useRef<null | (() => void)>(null)

  const reconnectCheckedRef = useRef(false);

  useSyncExternalStore(
    (onChange) => {
      if (!wagmiConfig) return () => {};

      const initialChainId = getChainId(wagmiConfig);
      const evmChains = config?.evm?.chains;
      const initMatchedChain = evmChains?.find((c: EvmChain) => c.id === initialChainId);
      setEvmState({
        chainId: initMatchedChain ? initialChainId : evmChains?.[0]?.id,
        chain: initMatchedChain || evmChains?.[0],
      });

      let timeoutId: ReturnType<typeof setTimeout>;
      const unwatch = watchChainId(wagmiConfig, {
        onChange(chainId) {
          clearTimeout(timeoutId);
          timeoutId = setTimeout(() => {
            const evmChains = config?.evm?.chains;
            const matchedChain = evmChains?.find((c: EvmChain) => c.id === chainId);
            setEvmState({
              chainId: matchedChain ? chainId : evmChains?.[0]?.id,
              chain: matchedChain || evmChains?.[0],
            });
            onChange();
          }, 300);
        },
      });
      return () => {
        clearTimeout(timeoutId);
        unwatch();
      };
    },
    () => wagmiConfig ? getChainId(wagmiConfig) : undefined,
    () => wagmiConfig ? getChainId(wagmiConfig) : undefined,
  );

  useEffect(() => {
    if (!wagmiConfig) return;

    unwatchRef.current?.()

    unwatchRef.current = watchConnection(wagmiConfig, {
      onChange: async (connection) => {
        if (connection.status === ConnectionStatus.Reconnecting) {
          return;
        }
        if (!reconnectCheckedRef.current && connection.status !== ConnectionStatus.Disconnected) {
          reconnectCheckedRef.current = true;
          const hasLunoEvmRecord = await config?.storage?.getItem(PERSIST_KEY.EVM_LAST_CONNECTOR_ID);

          if (!hasLunoEvmRecord) {
            await disconnect(wagmiConfig);
            return;
          }
        }
        reconnectCheckedRef.current = true;

        const resolvedConnector: EvmConnectorType | undefined = evmConnectors?.find(
          (c: EvmConnectorType) =>
            c.id === connection?.connector?.id || c.id === connection?.connector?.type
        );

        if (resolvedConnector && connection && connection.status !== ConnectionStatus.Disconnected) {
          const account: EvmAccount | undefined = connection.address
            ? {
                address: connection.address,
                source: resolvedConnector.id,
                name: resolvedConnector.name,
                chainType: ChainType.EVM,
              }
            : undefined;

          setEvmState({
            status: connection.status as ConnectionStatus,
            account,
            allAccounts: account ? [account] : [],
            connector: resolvedConnector,
          });
        } else {
          setEvmState({
            status: ConnectionStatus.Disconnected,
            chainId: undefined,
            chain: undefined,
            account: undefined,
            allAccounts: [],
            connector: undefined,
          });
        }
      },
    });

    return () => {
      unwatchRef.current?.();
      unwatchRef.current = null;
    };
  }, [wagmiConfig, evmConnectors, config]);

  return null;
};

const SubstrateStateSync = () => {
  const config = useLunoStore((state) => state.config);
  const substrateChainId = useLunoStore((state) => state.substrate.chainId);
  const substrateApi = useLunoStore((state) => state.substrate.currentApi);
  const isApiReady = useLunoStore((state) => state.substrate.isApiReady);
  const substrateChain = useLunoStore((state) => state.substrate.chain);

  const _setApi = useLunoStore((state) => state._setApi);
  const _setIsApiReady = useLunoStore((state) => state._setIsApiReady);
  const _setApiError = useLunoStore((state) => state._setApiError);

  const { connectAsync } = useConnect({ namespace: ChainType.SUBSTRATE, setActiveNamespace: false });

  const { isInitialized: isApiInitialized, markAsInitialized: markApiInitialized } = useIsInitialized();
  const { isInitialized: isAutoConnectInitialized, markAsInitialized: markAutoConnectInitialized } = useIsInitialized();

  useSubstrateEvents()
  const clearApiState = useCallback(() => {
    _setApi(undefined);
    _setIsApiReady(false);
  }, [_setApi, _setIsApiReady]);

  useEffect(() => {
    if (!config?.substrate || isApiInitialized) return;

    if (!substrateChainId) {
      if (substrateApi && substrateApi.status === 'connected') {
        substrateApi.disconnect().catch(console.error);
      }
      clearApiState();
      markApiInitialized();
      return;
    }

    const chainConfig = config.substrate.chains.find(
      (c: SubstrateChain) => c.genesisHash === substrateChainId
    );
    const transportConfig: Transport | undefined = config.substrate.transports[substrateChainId];

    if (!chainConfig || !transportConfig) {
      if (substrateApi?.status === 'connected') {
        substrateApi.disconnect().catch(console.error);
      }
      clearApiState();
      markApiInitialized();
      return;
    }

    if (substrateApi && substrateApi.status === 'connected') {
      substrateApi.disconnect().catch(console.error);
    }

    clearApiState();
    markApiInitialized();

    createApi({ config: config.substrate, chainId: substrateChainId })
      .then((api) => {
        _setApi(api);
        _setIsApiReady(true);
      })
      .catch((e) => {
        clearApiState();
        _setApiError(e);
      });
  }, [config, substrateChainId]);

  useEffect(() => {
    const performAutoConnect = async () => {
      if (!config?.autoConnect) return;

      markAutoConnectInitialized();

      await sleep(500);

      if (!config.storage) {
        console.warn('[LunoProvider]: AutoConnect Storage not available.');
        return;
      }

      try {
        const lastConnectorId = await config.storage.getItem(
          PERSIST_KEY.SUBSTRATE_LAST_CONNECTOR_ID
        );
        const lastChainId = await config.storage.getItem(PERSIST_KEY.SUBSTRATE_LAST_CHAIN_ID);

        if (lastConnectorId) {
          await connectAsync({
            connectorId: lastConnectorId,
            chainId: lastChainId as HexString || undefined,
          });
        }
      } catch (error) {
        console.error('[LunoProvider]: AutoConnect Error:', error);
      }
    };

    if (config?.substrate && !isAutoConnectInitialized) {
      performAutoConnect();
    }
  }, [config]);

  useEffect(() => {
    if (!config?.substrate || !isApiReady || !substrateApi || !substrateChain) return;

    if (
      substrateChain.ss58Format !== undefined &&
      substrateChain.ss58Format !== null
    ) {
      try {
        const apiSs58 = substrateApi.consts.system.ss58Prefix;

        if (apiSs58 !== null && apiSs58 !== undefined && apiSs58 !== substrateChain.ss58Format) {
          console.error(
            `[LunoProvider]: SS58 Format Mismatch for chain "${substrateChain.name}" (genesisHash: ${substrateChain.genesisHash}):\n` +
            `  - Configured SS58Format: ${substrateChain.ss58Format}\n` +
            `  - Node Runtime SS58Format: ${apiSs58}\n` +
            `Please verify your Luno configuration.`
          );
        }
      } catch (e) {
        console.error(`[LunoProvider]: Error retrieving SS58 format from API`, e);
      }
    }
  }, [isApiReady, substrateApi, substrateChain, config]);

  return null;
};

export const LunoProvider: React.FC<LunoProviderProps> = ({
  config: configFromProps,
  children,
}: LunoProviderProps) => {
  const store = useLunoStore();

  useEffect(() => {
    if (configFromProps) {
      store._setConfig(configFromProps);
    }
  }, [configFromProps]);

  const contextValue = useMemo<LunoContextState>(() => store, [store]);

  const content = (
    <LunoContext.Provider value={contextValue}>
      {configFromProps.substrate && <SubstrateStateSync />}
      {configFromProps.evm?.wagmiConfig && <EvmStateSync />}
      {children}
    </LunoContext.Provider>
  );

  if (configFromProps.evm?.wagmiConfig) {
    return (
      <WagmiProvider config={configFromProps.evm.wagmiConfig}>{content}</WagmiProvider>
    );
  }

  return content;
};
