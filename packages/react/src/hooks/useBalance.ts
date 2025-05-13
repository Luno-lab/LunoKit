import { useSubscription, UseSubscriptionResult } from './useSubscription';
import { formatBalance } from '@polkadot/util';
import type { DeriveBalancesAll } from '@polkadot/api-derive/types'; // 导入 DeriveBalancesAll 类型
import type { ApiPromise } from '@polkadot/api';
import { useLuno } from './useLuno';
import {AccountBalance} from '@luno/core'


// 2. Hook 参数 (保持不变)
export interface UseBalanceProps {
  address?: string;
}

// 3. Hook 返回值 (现在是 AccountBalance)
export type UseBalanceResult = UseSubscriptionResult<AccountBalance>;

// 4. 实现
export const useBalance = ({ address }: UseBalanceProps): UseBalanceResult => {
  const { currentApi } = useLuno();

  // 定义新的转换函数，将 DeriveBalancesAll 转换为 AccountBalance
  const transform = (balancesAll: DeriveBalancesAll, api: ApiPromise): AccountBalance => {
    const decimals = api.registry.chainDecimals[0];
    const symbol = api.registry.chainTokens[0];

    // 先获取 BN 实例
    const freeBalanceBn = balancesAll.freeBalance;
    const reservedBalanceBn = balancesAll.reservedBalance;
    const availableBalanceBn = balancesAll.availableBalance;

    // 正确地将 BN 转换为 bigint
    const free = BigInt(freeBalanceBn.toString());
    const reserved = BigInt(reservedBalanceBn.toString());
    const transferable = BigInt(availableBalanceBn.toString());
    // BN 相加后转 bigint
    const total = BigInt(freeBalanceBn.add(reservedBalanceBn).toString());

    // 格式化
    const options = { withUnit: symbol, withSi: false, decimals };
    const formattedFree = formatBalance(free, options);
    // 再次确认 formatBalance 对 bigint 的支持，如果不行，用 .toString()
    const formattedTotal = formatBalance(total, options); // 或 total.toString()

    // 正确处理 locks (使用 lockedBreakdown)
    const locks = balancesAll.lockedBreakdown.map((lock) => {
      let reasonStr = 'Unknown';
      // 正确检查 LockReasons 枚举
      if (lock.reasons) {
        if (lock.reasons.isFee) reasonStr = 'Fee';
        else if (lock.reasons.isMisc) reasonStr = 'Misc';
        else if (lock.reasons.isVesting) reasonStr = 'Vesting';
        else if (lock.reasons.isDemocracy) reasonStr = 'Democracy';
        else if (lock.reasons.isPhragmen) reasonStr = 'Election';
        else if (lock.reasons.isStaking) reasonStr = 'Staking';
        // ... 根据需要添加更多检查 ...
        else {
          // 使用 .type 获取枚举成员名称作为备用
          reasonStr = lock.reasons.type;
        }
      }

      return {
        id: lock.id.toHex(),
        amount: BigInt(lock.amount.toString()), // 正确转换 BN to BigInt
        reason: reasonStr,
      };
    });

    return {
      free,
      total,
      reserved,
      transferable,
      formattedFree,
      formattedTotal,
      locks: locks.length > 0 ? locks : undefined,
    };
  };

  // 调用通用的 useSubscription Hook，使用 api.derive.balances.all
  return useSubscription<[string | undefined], DeriveBalancesAll, AccountBalance>({
    // factory 现在是 api.derive.balances.all
    factory: currentApi?.derive.balances.all,
    params: [address],
    options: {
      enabled: !!address && !!currentApi,
      transform: transform,
      // 可以为 AccountBalance 设置一个合理的默认值，例如全为 0
      defaultValue: undefined, // 或者一个全 0 的 AccountBalance 对象
    }
  });
};
