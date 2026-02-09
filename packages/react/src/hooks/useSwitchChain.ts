import {
  ChainType,
  type AnyChain,
  type SubstrateChain,
  type EvmChain,
  type HexString,
  type Optional,
} from '@luno-kit/core/types';
import { useCallback, useMemo } from 'react';
import { useSwitchChain as useWagmiSwitchChain } from 'wagmi';
import { PERSIST_KEY } from '../constants';
import { useLunoStore } from '../store';
import { createApi } from '../utils';
import { type LunoMutationOptions, useLunoMutation } from './useLunoMutation';

type AnyChainId = HexString | number;

export interface SwitchChainVariables<TChainId extends AnyChainId = AnyChainId> {
  chainId: TChainId;
}

export type UseSwitchChainOptions<TChainId extends AnyChainId = AnyChainId> = LunoMutationOptions<
  void,
  Error,
  SwitchChainVariables<TChainId>,
  unknown
>;

interface UseSwitchChainResultBase<TChainId extends AnyChainId = AnyChainId> {
  switchChain: (variables: SwitchChainVariables<AnyChainId>, options?: Optional<UseSwitchChainOptions<AnyChainId>>) => void;
  switchChainAsync: (
    variables: SwitchChainVariables<AnyChainId>,
    options?: Optional<UseSwitchChainOptions<AnyChainId>>
  ) => Promise<void>;
  data: undefined;
  error: Error | null;
  isError: boolean;
  isIdle: boolean;
  isPending: boolean;
  isSuccess: boolean;
  reset: () => void;
  variables: SwitchChainVariables<TChainId> | undefined;
}

export interface UseSwitchChainResult<
  TChain extends AnyChain = AnyChain,
  TChainId extends AnyChainId = AnyChainId,
> extends UseSwitchChainResultBase<TChainId> {
  chains: TChain[];
  chain?: Optional<TChain>;
  chainId?: TChainId;
  chainType: ChainType;
}

export function useSwitchChain(
  parameters: { namespace: 'substrate' },
  mutationOptions?: Optional<UseSwitchChainOptions<HexString>>
): UseSwitchChainResult<SubstrateChain, HexString>;

export function useSwitchChain(
  parameters: { namespace: 'evm' },
  mutationOptions?: Optional<UseSwitchChainOptions<number>>
): UseSwitchChainResult<EvmChain, number>;

export function useSwitchChain<
  TChain extends AnyChain = AnyChain,
  TChainId extends AnyChainId = AnyChainId,
>(
  parameters?: { namespace?: ChainType },
  mutationOptions?: Optional<UseSwitchChainOptions>
): UseSwitchChainResult<TChain, TChainId>;

export function useSwitchChain(
  parameters: { namespace?: ChainType } = {},
  mutationOptions?: Optional<UseSwitchChainOptions<any>>
): UseSwitchChainResult<AnyChain, AnyChainId> {
  const { namespace } = parameters;

  const config = useLunoStore((state) => state.config);
  const activeNamespace = useLunoStore((state) => state.activeNamespace);

  const substrateChains = useLunoStore((state) => state.config?.substrate?.chains);
  const substrateChain = useLunoStore((state) => state.substrate.chain);
  const substrateChainId = useLunoStore((state) => state.substrate.chainId);
  const substrateApi = useLunoStore((state) => state.substrate.currentApi);

  const evmChains = useLunoStore((state) => state.config?.evm?.chains);
  const evmChain = useLunoStore((state) => state.evm.chain);
  const evmChainId = useLunoStore((state) => state.evm.chainId);

  const setSubstrateState = useLunoStore((state) => state.setSubstrateState);

  const targetNamespace = namespace || activeNamespace;

  const wagmiSwitchChain = useWagmiSwitchChain();

  const switchSubstrate = async (newChainId: HexString): Promise<void> => {
    if (!config) {
      throw new Error('[useSwitchChain] Config not found');
    }

    if (newChainId.toLowerCase() === substrateChainId?.toLowerCase()) {
      return;
    }

    const newChain: SubstrateChain | undefined = config.substrate?.chains.find((c: SubstrateChain) => c.genesisHash.toLowerCase() === newChainId.toLowerCase());
    if (!newChain) {
      throw new Error(`[useSwitchChain] Substrate chain with ID "${newChainId}" not found.`);
    }

    try {
      try {
        if (substrateApi && substrateApi.status === 'connected') {
          await substrateApi.disconnect();
        }
      } catch (e) {
        console.warn('[useSwitchChain] Failed to disconnect from previous chain:', e);
      }

      setSubstrateState({
        chainId: newChainId,
        chain: newChain,
        currentApi: undefined,
        isApiReady: false,
        apiError: null,
      });

      const newApi = await createApi({ config: config.substrate!, chainId: newChainId });

      setSubstrateState({
        currentApi: newApi,
        isApiReady: true,
      });

      if (config.storage) {
        await config.storage.setItem(PERSIST_KEY.LAST_CHAIN_ID, newChainId);
      }
    } catch (e: any) {
      setSubstrateState({
        apiError: e,
        isApiReady: false,
      });
      throw e;
    }
  };

  const switchEvm = async (newChainId: number): Promise<void> => {
    if (!config) {
      throw new Error('[useSwitchChain] Config not found');
    }

    if (newChainId === evmChainId) {
      return;
    }

    const newChain: EvmChain | undefined = config.evm?.chains.find((c: EvmChain) => c.id === newChainId);
    if (!newChain) {
      throw new Error(`[useSwitchChain] EVM chain with ID "${newChainId}" not found.`);
    }

    try {
      await wagmiSwitchChain.mutateAsync({ chainId: newChainId });
    } catch (e) {
      console.error('[useSwitchChain] EVM Switch Chain Error:', e);
      throw e;
    }
  };

  const switchChainFn = useCallback(
    async (variables: SwitchChainVariables): Promise<void> => {
      switch (targetNamespace) {
        case ChainType.SUBSTRATE: {
          await switchSubstrate(variables.chainId as HexString);
          break;
        }

        case ChainType.EVM: {
          await switchEvm(variables.chainId as number);
          break;
        }

        default:
          throw new Error(`[useSwitchChain] Invalid namespace "${targetNamespace}".`);
      }
    },
    [targetNamespace, config, substrateChainId, substrateApi, evmChainId, wagmiSwitchChain]
  );

  const mutationResult = useLunoMutation<void, Error, SwitchChainVariables, unknown>(
    switchChainFn,
    mutationOptions
  );

  const chains: AnyChain[] = useMemo(() => {
    switch (targetNamespace) {
      case ChainType.SUBSTRATE:
        return substrateChains ? [...substrateChains] : [];
      case ChainType.EVM:
        return evmChains ? [...evmChains] : [];
      default:
        return [];
    }
  }, [targetNamespace, substrateChains, evmChains]);

  const currentChain = useMemo(() => {
    switch (targetNamespace) {
      case ChainType.SUBSTRATE:
        return substrateChain;
      case ChainType.EVM:
        return evmChain;
      default:
        return undefined;
    }
  }, [targetNamespace, substrateChain, evmChain]);

  const currentChainId = useMemo(() => {
    switch (targetNamespace) {
      case ChainType.SUBSTRATE:
        return substrateChainId;
      case ChainType.EVM:
        return evmChainId;
      default:
        return undefined;
    }
  }, [targetNamespace, substrateChainId, evmChainId]);

  return {
    switchChain: mutationResult.mutate,
    switchChainAsync: mutationResult.mutateAsync,
    chains,
    chain: currentChain,
    chainId: currentChainId,
    chainType: targetNamespace,
    data: mutationResult.data as undefined,
    error: mutationResult.error,
    isError: mutationResult.isError,
    isIdle: mutationResult.isIdle,
    isPending: mutationResult.isPending,
    isSuccess: mutationResult.isSuccess,
    reset: mutationResult.reset,
    variables: mutationResult.variables,
  };
}
