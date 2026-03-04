import { ChainType, type NativeBalance, type Optional, type HexString } from '@luno-kit/core/types';
import { Substrate } from '@luno-kit/core/utils';
import { getBalance as getEvmBalance } from 'wagmi/actions';
import type { LegacyClient } from 'dedot';
import { isEvmAddress } from 'dedot/utils';
import { useMemo } from 'react';
import { formatUnits } from 'viem';
import { useQuery } from '@tanstack/react-query';
import { useLunoStore } from '../store';
import {
  type QueryMultiItem,
  useSubscription,
} from './useSubscription';

interface AccountData {
  data: {
    free: bigint | string | number;
    reserved: bigint | string | number;
    frozen: bigint | string | number;
  };
}

interface BalanceLock {
  id: string | number;
  amount: bigint | string | number;
  reasons?: Optional<string | number>;
}

const DEFAULT_TOKEN_DECIMALS = 10;

const ZERO_BALANCE: NativeBalance = {
  value: 0n,
  formatted: '0',
  symbol: '',
  decimals: 0,
};

export interface UseBalanceParameters {
  address?: Optional<string>;
  namespace?: Optional<ChainType>;
}

export interface UseBalanceResult {
  data?: Optional<NativeBalance>;
  isLoading: boolean;
  error?: Optional<Error>;
}

export function useBalance(
  parameters: { namespace: 'substrate'; address?: Optional<string> }
): UseBalanceResult;

export function useBalance(
  parameters: { namespace: 'evm'; address?: Optional<HexString> }
): UseBalanceResult;

export function useBalance(
  parameters?: UseBalanceParameters
): UseBalanceResult;

export function useBalance(
  parameters: UseBalanceParameters = {}
): UseBalanceResult {
  const { address, namespace } = parameters;

  const activeNamespace = useLunoStore((state) => state.activeNamespace);
  const substrateChain = useLunoStore((state) => state.substrate.chain);
  const substrateApi = useLunoStore((state) => state.substrate.currentApi);
  const isApiReady = useLunoStore((state) => state.substrate.isApiReady);

  const targetNamespace = namespace || activeNamespace;

  const shouldQuerySubstrate = useMemo(() => {
    if (targetNamespace !== ChainType.SUBSTRATE) return false;
    if (!substrateApi || !isApiReady || !address) return false;

    const isEthereumChain = substrateApi.isEthereum;
    return isEthereumChain ? isEvmAddress(address) : !isEvmAddress(address);
  }, [targetNamespace, substrateApi, isApiReady, address]);

  const substrateResult = useSubscription<
    QueryMultiItem[],
    [AccountData, BalanceLock[]],
    NativeBalance
  >({
    queryKey: '/native-balance',
    factory: (api: LegacyClient) => api.queryMulti,
    params: (api: LegacyClient) => [
      { fn: api.query.system.account, args: [address] },
      { fn: api.query.balances.locks, args: [address] },
    ],
    options: {
      enabled: shouldQuerySubstrate,
      transform: (results): NativeBalance => {
        const accountInfo: AccountData = results[0];

        const free = accountInfo.data.free;
        const frozen = accountInfo.data.frozen;
        const transferable =
          free > frozen ? BigInt(free) - BigInt(frozen) : 0n;

        const decimals =
          substrateChain?.nativeCurrency?.decimals ?? DEFAULT_TOKEN_DECIMALS;
        const symbol = substrateChain?.nativeCurrency?.symbol ?? '';

        return {
          value: transferable,
          formatted: Substrate.formatBalance(transferable, decimals),
          symbol,
          decimals,
        };
      },
    },
  });

  const wagmiConfig = useLunoStore((state) => state.config?.evm?.wagmiConfig);
  const evmChainId = useLunoStore((state) => state.evm.chainId);

  const shouldQueryEvm = targetNamespace === ChainType.EVM && !!address && isEvmAddress(address) && !!wagmiConfig;

  const evmResult = useQuery({
    queryKey: ['evm-balance', address],
    queryFn: async () => {
      const result = await getEvmBalance(wagmiConfig!, {
        address: address as HexString,
        chainId: evmChainId,
      });
      return {
        value: result.value,
        formatted: formatUnits(result.value, result.decimals),
        symbol: result.symbol,
        decimals: result.decimals,
      } satisfies NativeBalance;
    },
    enabled: shouldQueryEvm,
  });

  return useMemo(() => {
    switch (targetNamespace) {
      case ChainType.SUBSTRATE: {
        if (substrateApi && isApiReady && address && !shouldQuerySubstrate) {
          return {
            data: ZERO_BALANCE,
            isLoading: false,
            error: undefined,
          };
        }

        return {
          data: substrateResult.data,
          isLoading: substrateResult.isLoading,
          error: substrateResult.error,
        };
      }

      case ChainType.EVM:
        return {
          data: evmResult.data,
          isLoading: evmResult.isLoading,
          error: evmResult.error ?? undefined,
        };

      default:
        return {
          data: undefined,
          isLoading: false,
          error: undefined,
        };
    }
  }, [
    targetNamespace,
    substrateApi,
    isApiReady,
    address,
    shouldQuerySubstrate,
    substrateResult.data,
    substrateResult.isLoading,
    substrateResult.error,
    evmResult.data,
    evmResult.isLoading,
    evmResult.error,
  ]);
}
