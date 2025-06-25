import { useSubscription, UseSubscriptionResult } from './useSubscription';
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
  isEthereum?: boolean;
  ss58Format?: number;
  tokenDecimals?: number | Array<number>;
  tokenSymbol?: string | Array<string>;
  [prop: string]: any;
}

const DEFAULT_TOKEN_DECIMALS = 10

const transformBalance = (results: any[]) => {
  const accountInfo: AccountData = results[0];
  const locks: BalanceLock[] = results[1];
  const properties: ChainProperties = results[2]

  const decimals = (typeof properties.tokenDecimals === 'number'
    ? properties.tokenDecimals : properties.tokenDecimals?.[0]) ?? DEFAULT_TOKEN_DECIMALS

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
    formattedTransferable: formatBalance(transferable, decimals),
    formattedTotal: formatBalance(total, decimals),
    locks: locks.map(lock => ({
      id: lock.id,
      amount: lock.amount,
      reason: lock.reasons,
      lockHuman: formatBalance(lock.amount, decimals)
    }))
  } as AccountBalance;
}

export interface UseBalanceProps {
  address?: string;
}

export type UseBalanceResult = UseSubscriptionResult<AccountBalance>;

export const useBalance = ({ address }: UseBalanceProps): UseBalanceResult => {
  const { currentApi, isApiReady } = useLuno();

  return useSubscription<
    [Array<any>],
    Array<any>,
    AccountBalance
  >({
    factory: (api: DedotClient) => api.queryMulti,
    params: (api: DedotClient) => [
      [
        { fn: api.query.system.account, args: [address] },
        { fn: api.query.balances.locks, args: [address] },
        { fn: api.rpc.system_properties, args: [] },
      ]
    ],
    options: {
      enabled: !!currentApi && isApiReady && !!address,
      transform: transformBalance
    }
  });
}
