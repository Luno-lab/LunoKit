import type { Chain } from '@luno/core';
import { useLuno } from './useLuno';

export const useChains = (): Chain[] => {
  const { config } = useLuno();
  return config?.chains ?? [];
};
