import type { LegacyClient } from 'dedot';
import { useLuno } from './useLuno';
import type { Optional } from '../types';

export interface UseApiResult<T extends LegacyClient = LegacyClient> {
  api?: Optional<T>;
  isApiReady: boolean;
  apiError: Error | null;
}

export const useApi = <T extends LegacyClient = LegacyClient>(): UseApiResult<T> => {
  const { currentApi, isApiReady, apiError } = useLuno();

  return {
    api: currentApi as T | undefined,
    isApiReady,
    apiError,
  };
};
