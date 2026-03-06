import {
  ChainType,
  type AnyConnector,
  type SubstrateAccount,
  type SubstrateConnectOptions,
  type EvmConnectOptions,
  type SubstrateChain,
  type HexString,
  type SubstrateConnectorType,
  type EvmConnectorType,
  type Optional,
} from '@luno-kit/core/types';
import { Substrate as SubstrateUtils } from '@luno-kit/core/utils';
import { useCallback, useMemo } from 'react';
import { PERSIST_KEY } from '../constants';
import { type StoredAccountInfo, useLunoStore } from '../store';
import { ConnectionStatus } from '../types';
import { sleep } from '../utils';
import { type LunoMutationOptions, useLunoMutation } from './useLunoMutation';

export interface BaseConnectVariables {
  connectorId: string;
}

export interface SubstrateConnectVariables extends BaseConnectVariables {
  chainId?: Optional<HexString>;
}

export interface EvmConnectVariables extends BaseConnectVariables {
  chainId?: Optional<number>;
  withCapabilities?: Optional<boolean>;
}

export type ConnectVariables = SubstrateConnectVariables | EvmConnectVariables;

export type UseConnectOptions<TVariables = ConnectVariables> = LunoMutationOptions<void, Error, TVariables, unknown>;

interface UseConnectResultBase<TVariables = ConnectVariables> {
  connect: (variables: ConnectVariables, options?: Optional<UseConnectOptions<ConnectVariables>>) => void;
  connectAsync: (variables: ConnectVariables, options?: Optional<UseConnectOptions<ConnectVariables>>) => Promise<void>;
  status: ConnectionStatus;
  data: undefined;
  error: Error | null;
  isError: boolean;
  isIdle: boolean;
  isPending: boolean;
  isSuccess: boolean;
  reset: () => void;
  variables: TVariables | undefined;
}

export interface UseConnectResult<TConnector extends AnyConnector, TVariables = ConnectVariables> extends UseConnectResultBase<TVariables> {
  connectors: TConnector[];
  activeConnector?: Optional<TConnector>;
}

export function useConnect(
  parameters: { namespace: 'substrate'; setActiveNamespace?: Optional<boolean>; mutation?: Optional<UseConnectOptions<SubstrateConnectVariables>> }
): UseConnectResult<SubstrateConnectorType, SubstrateConnectVariables>;

export function useConnect(
  parameters: { namespace: 'evm'; setActiveNamespace?: Optional<boolean>; mutation?: Optional<UseConnectOptions<EvmConnectVariables>> }
): UseConnectResult<EvmConnectorType, EvmConnectVariables>;

export function useConnect<TConnector extends AnyConnector = AnyConnector>(
  parameters?: Optional<{ namespace?: Optional<ChainType>; setActiveNamespace?: Optional<boolean>; mutation?: Optional<UseConnectOptions<ConnectVariables>> }>
): UseConnectResult<TConnector, ConnectVariables>;

export function useConnect(
  parameters: { namespace?: Optional<ChainType>; setActiveNamespace?: Optional<boolean>; mutation?: Optional<UseConnectOptions<any>> } = {}
): UseConnectResult<AnyConnector, ConnectVariables> {
  const { namespace, setActiveNamespace: shouldSetActiveNamespace = true, mutation: mutationOptions } = parameters;

  const config = useLunoStore((state) => state.config);
  const activeNamespace = useLunoStore((state) => state.activeNamespace);

  const substrateConnectors = useLunoStore((state) => state.config?.substrate?.connectors);
  const evmConnectors = useLunoStore((state) => state.config?.evm?.connectors);
  const substrateActiveConnector = useLunoStore((state) => state.substrate.connector);
  const evmActiveConnector = useLunoStore((state) => state.evm.connector);
  const substrateStatus = useLunoStore((state) => state.substrate.status);
  const evmStatus = useLunoStore((state) => state.evm.status);
  const substrateChainId = useLunoStore((state) => state.substrate.chainId)

  const setSubstrateState = useLunoStore((state) => state.setSubstrateState);
  const setActiveNamespace = useLunoStore((state) => state.setActiveNamespace);

  const targetNamespace = namespace || activeNamespace;

  const connectSubstrate = async (
    connectorId: string,
    chainId?: Optional<HexString>
  ): Promise<void> => {
    if (!config) {
      setSubstrateState({ status: ConnectionStatus.Disconnected });
      throw new Error('[useConnect] Config not found');
    }

    const connector: SubstrateConnectorType | undefined = config.substrate?.connectors.find(
      (c: SubstrateConnectorType) => c.id === connectorId
    );
    if (!connector) {
      setSubstrateState({ status: ConnectionStatus.Disconnected });
      throw new Error(`[useConnect] Substrate connector "${connectorId}" not found.`);
    }

    setSubstrateState({ status: ConnectionStatus.Connecting });

    try {
      const options: SubstrateConnectOptions = {
        chains: config.substrate?.chains ? [...config.substrate.chains] : [],
        appName: config.appName,
      };

      const accounts: SubstrateAccount[] | undefined = await connector.connect(options);

      if (!accounts || accounts.length === 0) {
        throw new Error('[useConnect] No accounts found');
      }

      let selectedAccount = accounts[0];
      if (config.storage) {
        const lastStoredAccountJson = await config.storage.getItem(
          PERSIST_KEY.SUBSTRATE_LAST_SELECTED_ACCOUNT
        );
        const recentStoredAccountJson = await config.storage.getItem(
          PERSIST_KEY.SUBSTRATE_RECENT_SELECTED_ACCOUNT
        );
        const storedAccountJson = lastStoredAccountJson || recentStoredAccountJson;

        if (storedAccountJson) {
          const storedAccount: StoredAccountInfo = JSON.parse(storedAccountJson);
          const found = accounts.find((a) =>
            SubstrateUtils.isSameAddress(a.address, storedAccount.address)
          );
          if (found) selectedAccount = found;
        }
      }

      setSubstrateState({
        status: ConnectionStatus.Connected,
        connector,
        allAccounts: accounts,
        account: selectedAccount,
      });
      if (config.storage) {
        await config.storage.setItem(PERSIST_KEY.SUBSTRATE_LAST_CONNECTOR_ID, connectorId);
        await config.storage.setItem(PERSIST_KEY.SUBSTRATE_RECENT_CONNECTOR_ID, connectorId);

        const storedAccountInfo = {
          publicKey: selectedAccount.publicKey,
          address: selectedAccount.address,
          name: selectedAccount.name,
          source: selectedAccount.meta?.source,
        };
        const accountInfoStr = JSON.stringify(storedAccountInfo);
        await config.storage.setItem(PERSIST_KEY.SUBSTRATE_LAST_SELECTED_ACCOUNT, accountInfoStr);
        await config.storage.setItem(PERSIST_KEY.SUBSTRATE_RECENT_SELECTED_ACCOUNT, accountInfoStr);
      }

      const chainIdToSet = chainId || substrateChainId || config.substrate?.chains[0]?.genesisHash;

      if (chainIdToSet) {
        const newChain = config.substrate?.chains.find(
          (c: SubstrateChain) => c.genesisHash === chainIdToSet
        );
        if (newChain) {
          if (chainIdToSet !== substrateChainId) {
            setSubstrateState({
              chainId: chainIdToSet,
              chain: newChain,
              currentApi: undefined,
              isApiReady: false,
            });
          }
          if (config.storage) {
            await config.storage.setItem(PERSIST_KEY.SUBSTRATE_LAST_CHAIN_ID, chainIdToSet);
          }
        } else {
          console.warn(
            `[useConnect] After connection, target chain ID "${chainIdToSet}" was not found in config.`
          );
        }
      }
    } catch (err) {
      setSubstrateState({
        status: ConnectionStatus.Disconnected,
        connector: undefined,
        allAccounts: undefined,
      });
      throw err;
    }
  };

  const connectEvm = async (
    connectorId: string,
    chainId?: Optional<number>,
    withCapabilities?: Optional<boolean>
  ): Promise<void> => {
    if (!config) {
      throw new Error('[useConnect] Config not found');
    }

    const connector: EvmConnectorType | undefined = config.evm?.connectors.find(
      (c: EvmConnectorType) => c.id === connectorId
    );
    if (!connector) {
      throw new Error(`[useConnect] EVM connector "${connectorId}" not found.`);
    }

    try {
      const options: EvmConnectOptions = {
        chainId,
        withCapabilities,
      };
      await connector.connect(options);

      if (config.storage) {
        await config.storage.setItem(PERSIST_KEY.EVM_LAST_CONNECTOR_ID, connectorId);
        await config.storage.setItem(PERSIST_KEY.EVM_RECENT_CONNECTOR_ID, connectorId);
      }
    } catch (err) {
      console.error('[useConnect] EVM Connect Error:', err);
      throw err;
    }
  };

  const connectFn = useCallback(async (variables: ConnectVariables): Promise<undefined> => {
    switch (targetNamespace) {
      case ChainType.SUBSTRATE: {
        const { chainId, connectorId } = variables as SubstrateConnectVariables;
        await connectSubstrate(connectorId, chainId);
        shouldSetActiveNamespace && setActiveNamespace(ChainType.SUBSTRATE);
        break;
      }

      case ChainType.EVM: {
        const { connectorId, chainId, withCapabilities } = variables as EvmConnectVariables;
        await connectEvm(connectorId, chainId, withCapabilities);
        shouldSetActiveNamespace && setActiveNamespace(ChainType.EVM);
        break;
      }

      default:
        throw new Error(`[useConnect] Invalid namespace "${targetNamespace}".`);
    }

    await sleep();
  }, [targetNamespace, config, substrateChainId, shouldSetActiveNamespace, setActiveNamespace]);

  const mutationResult = useLunoMutation<undefined, Error, ConnectVariables, unknown>(
    connectFn,
    mutationOptions
  );

  const currentConnectors: AnyConnector[] = useMemo(() => {
    switch (targetNamespace) {
      case ChainType.SUBSTRATE:
        return substrateConnectors || [];
      case ChainType.EVM:
        return evmConnectors || [];
      default:
        return [];
    }
  }, [targetNamespace, substrateConnectors, evmConnectors]);

  const activeConnector = useMemo(() => {
    switch (targetNamespace) {
      case ChainType.SUBSTRATE:
        return substrateActiveConnector;
      case ChainType.EVM:
        return evmActiveConnector;
      default:
        return undefined;
    }
  }, [targetNamespace, substrateActiveConnector, evmActiveConnector]);

  const status = useMemo(() => {
    switch (targetNamespace) {
      case ChainType.SUBSTRATE:
        return substrateStatus;
      case ChainType.EVM:
        return evmStatus;
      default:
        return ConnectionStatus.Disconnected;
    }
  }, [targetNamespace, substrateStatus, evmStatus]);

  return {
    connect: mutationResult.mutate,
    connectAsync: mutationResult.mutateAsync,
    connectors: currentConnectors,
    activeConnector,
    status,
    data: mutationResult.data,
    error: mutationResult.error,
    isError: mutationResult.isError,
    isIdle: mutationResult.isIdle,
    isPending: mutationResult.isPending,
    isSuccess: mutationResult.isSuccess,
    reset: mutationResult.reset,
    variables: mutationResult.variables,
  };
}
