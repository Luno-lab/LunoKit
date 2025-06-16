// packages/react/src/hooks/useBlockNumber.ts
import { useSubscription, UseSubscriptionResult } from './useSubscription';
import type { BlockNumber } from '@polkadot/types/interfaces';
import { useLuno } from './useLuno';
import {ApiPromise} from '@polkadot/api'

export type UseBlockNumberResult = UseSubscriptionResult<number>;

export const useBlockNumber = (): UseBlockNumberResult => {
  const { currentApi, isApiReady } = useLuno();

  const transform = (blockNumberBn: BlockNumber): number => {
    return blockNumberBn.toNumber();
  };

  return useSubscription<[], BlockNumber, number>({
    factory: (api: ApiPromise) => api.derive.chain.bestNumber,
    params: [],
    options: {
      enabled: !!currentApi && isApiReady,
      transform: transform,
    }
  });
};
