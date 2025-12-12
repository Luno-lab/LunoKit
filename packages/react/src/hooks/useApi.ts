import type { LegacyClient } from 'dedot';
import type { Optional } from '../types';
import { useLuno } from './useLuno';

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
