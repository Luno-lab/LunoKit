import type { BlockNumber } from 'dedot/codecs';
import { useLuno } from './useLuno';
import { type UseSubscriptionResult, useSubscription } from './useSubscription';

export type UseBlockNumberResult = UseSubscriptionResult<number>;

export const useBlockNumber = (): UseBlockNumberResult => {
  const { currentApi, isApiReady } = useLuno();

  const transform = (blockNumberBn: BlockNumber): BlockNumber => {
    return blockNumberBn;
  };

  return useSubscription<[], BlockNumber, BlockNumber>({
    queryKey: '/block-number',
    factory: (api) => api.query.system.number,
    params: [],
    options: {
      enabled: !!currentApi && isApiReady,
      transform: transform,
    },
  });
};
