import type { Chain } from '@luno-kit/core';
import { useLuno } from './useLuno';

export const useChains = (): Chain[] => {
  const { config } = useLuno();
  return config?.chains ? [...config.chains] : [];
};
