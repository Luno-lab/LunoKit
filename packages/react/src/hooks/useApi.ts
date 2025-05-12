import type { ApiPromise } from '@polkadot/api';
import { useLuno } from './useLuno';

export interface UseApiResult {
  api?: ApiPromise;
  isApiReady: boolean;
}

export const useApi = (): UseApiResult => {
  const { currentApi, isApiReady } = useLuno();

  return {
    api: currentApi,
    isApiReady,
  };
};
