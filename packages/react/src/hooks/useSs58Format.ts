import { isNumber } from 'dedot/utils';
import { useMemo } from 'react';
import { useLuno } from './useLuno';

const DEFAULT_SS58_FORMAT = 42;

export interface UseSs58FormatResult {
  data?: number;
  isLoading: boolean;
}

export const useSs58Format = (): UseSs58FormatResult => {
  const { currentApi, isApiReady, currentChain } = useLuno();

  const configuredSs58Fallback =
    currentChain?.ss58Format !== undefined ? currentChain.ss58Format : DEFAULT_SS58_FORMAT;

  return useMemo(() => {
    if (currentApi && isApiReady) {
      let ss58: number | undefined;
      try {
        const format = currentApi.consts.system.ss58Prefix;

        ss58 = isNumber(format) ? format : DEFAULT_SS58_FORMAT;
      } catch (e) {
        console.error('[useSs58Format] Error fetching chainSS58:', e);
        ss58 = configuredSs58Fallback;
      }
      return { data: ss58, isLoading: false };
    } else {
      return { data: undefined, isLoading: true };
    }
  }, [currentApi, isApiReady, configuredSs58Fallback]);
};
