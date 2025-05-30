import { useSubscription, UseSubscriptionResult } from './useSubscription';
import { formatBalance } from '@polkadot/util';
import type { DeriveBalancesAll } from '@polkadot/api-derive/types';
import type { ApiPromise } from '@polkadot/api';
import { useLuno } from './useLuno';
import { AccountBalance } from '@luno-kit/core'
import { AccountId } from '@polkadot/types/interfaces'

export interface UseBalanceProps {
  address?: string;
}

export type UseBalanceResult = UseSubscriptionResult<AccountBalance>;

export const useBalance = ({ address }: UseBalanceProps): UseBalanceResult => {
  const { currentApi, isApiReady } = useLuno();

  const transform = (balancesAll: DeriveBalancesAll, api: ApiPromise): AccountBalance => {
    const decimals = api.registry.chainDecimals[0];
    const symbol = api.registry.chainTokens[0];

    const freeBalanceBn = balancesAll.freeBalance;
    const reservedBalanceBn = balancesAll.reservedBalance;
    const availableBalanceBn = balancesAll.availableBalance;

    const free = BigInt(freeBalanceBn.toString());
    const reserved = BigInt(reservedBalanceBn.toString());
    const transferable = BigInt(availableBalanceBn.toString());
    const total = BigInt(freeBalanceBn.add(reservedBalanceBn).toString());

    const options = { forceUnit: '-', withSi: false, decimals };
    const formattedTransferable = formatBalance(transferable, options);
    const formattedTotal = formatBalance(total, options);

    const locks = (balancesAll.lockedBreakdown || []).map((lock) => {
      let reasonStr = 'Unknown';
      if (lock.reasons) {
        if (lock.reasons.isFee) reasonStr = 'Fee';
        else if (lock.reasons.isMisc) reasonStr = 'Misc';
        else if (lock.reasons.isVesting) reasonStr = 'Vesting';
        else if (lock.reasons.isDemocracy) reasonStr = 'Democracy';
        else if (lock.reasons.isPhragmen) reasonStr = 'Election';
        else if (lock.reasons.isStaking) reasonStr = 'Staking';
        else {
          reasonStr = lock.reasons.type;
        }
      }

      return {
        id: lock.id.toHex(),
        amount: BigInt(lock.amount.toString()),
        reason: reasonStr,
        lockHuman: lock.id.toHuman() as string,
      };
    });

    return {
      free,
      total,
      reserved,
      transferable,
      formattedTransferable,
      formattedTotal,
      locks: locks.length > 0 ? locks : undefined,
    };
  };

  return useSubscription<[string | AccountId], DeriveBalancesAll, AccountBalance>({
    factory: (api: ApiPromise) => api.derive.balances.all, // <--- 修改这里
    params: [address as string | AccountId],
    options: {
      enabled: !!address && !!currentApi && isApiReady,
      transform: transform,
      defaultValue: undefined,
    }
  });
};
