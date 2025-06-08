import type { ApiPromise } from '@polkadot/api';
import { useLuno } from './useLuno';

export interface UseApiResult {
  api?: ApiPromise;
  isApiReady: boolean;
  apiError: Error | null;
}

export const useApi = (): UseApiResult => {
  const { currentApi, isApiReady, apiError } = useLuno();

  return {
    api: currentApi,
    isApiReady,
    apiError,
  };
};
