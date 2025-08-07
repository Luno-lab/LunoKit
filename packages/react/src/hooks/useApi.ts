import type { LegacyClient } from 'dedot';
import { useLuno } from './useLuno';

export interface UseApiResult {
  api?: LegacyClient;
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
