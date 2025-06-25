import { QueryMultiItem, useSubscription, UseSubscriptionResult } from './useSubscription';
import type { AccountBalance } from '@luno-kit/core';
import type { DedotClient } from 'dedot';
import { useLuno } from './useLuno'
import { formatBalance } from '@luno-kit/core'

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
  reasons?: string | number;
}

export interface ChainProperties {
  ss58Format?: number;
  tokenDecimals?: number;
  tokenSymbol?: string;
}

const DEFAULT_TOKEN_DECIMALS = 10

const transformBalance = (results: any[], chainProperties: ChainProperties) => {
  const accountInfo: AccountData = results[0];
  const locks: BalanceLock[] = results[1];

  const free = accountInfo.data.free;
  const reserved = accountInfo.data.reserved;
  const frozen = accountInfo.data.frozen;
  const total = BigInt(free) + BigInt(reserved);

  const transferable = free > frozen ? BigInt(free) - BigInt(frozen) : 0n;

  return {
    free,
    total,
    reserved,
    transferable,
    formattedTransferable: formatBalance(transferable, chainProperties.tokenDecimals),
    formattedTotal: formatBalance(total, chainProperties.tokenDecimals),
    locks: locks.map(lock => ({
      id: lock.id,
      amount: lock.amount,
      reason: lock.reasons,
      lockHuman: formatBalance(lock.amount, chainProperties.tokenDecimals)
    }))
  } as AccountBalance;
}

export interface UseBalanceProps {
  address?: string;
}

export type UseBalanceResult = UseSubscriptionResult<AccountBalance>;

export const useBalance = ({ address }: UseBalanceProps): UseBalanceResult => {
  const { currentApi, isApiReady, currentChain } = useLuno();

  return useSubscription<
    QueryMultiItem[],
    [AccountData, BalanceLock[]],
    AccountBalance
  >({
    queryKey: '/native-balance',
    factory: (api: DedotClient) => api.queryMulti,
    params: (api: DedotClient) => [
      { fn: api.query.system.account, args: [address] },
      { fn: api.query.balances.locks, args: [address] },
    ],
    options: {
      enabled: !!currentApi && isApiReady && !!address,
      transform: (results, ) => {
        const chainProperties: ChainProperties = {
          tokenDecimals: currentChain?.nativeCurrency?.decimals ?? DEFAULT_TOKEN_DECIMALS,
          tokenSymbol: currentChain?.nativeCurrency?.symbol,
          ss58Format: currentChain?.ss58Format,
        };
        return transformBalance(results, chainProperties)
      }
    }
  });
}
