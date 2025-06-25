import type { DedotClient } from 'dedot';
import { useLuno } from './useLuno';

export interface UseApiResult {
  api?: DedotClient;
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
