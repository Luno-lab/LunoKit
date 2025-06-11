import type { ApiPromise } from '@polkadot/api';
import { useLuno } from './useLuno';

export interface UseApiResult {
  api?: ApiPromise;
  isApiReady: boolean;
  isApiConnected: boolean;
  apiError: Error | null;
}

export const useApi = (): UseApiResult => {
  const { currentApi, isApiReady, apiError, isApiConnected } = useLuno();

  return {
    api: currentApi,
    isApiReady,
    isApiConnected,
    apiError,
  };
};
