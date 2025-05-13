// packages/react/src/hooks/useBlockNumber.ts
import { useSubscription, UseSubscriptionResult } from './useSubscription';
import type { BlockNumber } from '@polkadot/types/interfaces';
import { useLuno } from './useLuno';

export type UseBlockNumberResult = UseSubscriptionResult<number>; // 返回 number 类型更常用

export const useBlockNumber = (): UseBlockNumberResult => {
  const { currentApi, isApiReady } = useLuno();

  // api.derive.chain.bestNumber() 返回的是 BN 类型，需要转换
  const transform = (blockNumberBn: BlockNumber): number => {
    return blockNumberBn.toNumber();
  };

  return useSubscription<[], BlockNumber, number>({
    factory: currentApi?.derive.chain.bestNumber,
    params: [], // bestNumber 不需要参数
    options: {
      enabled: !!currentApi && isApiReady,
      transform: transform,
    }
  });
};
