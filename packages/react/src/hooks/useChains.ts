import type { Chain } from '../types';
import { useLuno } from './useLuno';

export const useChains = (): Chain[] => {
  const { config } = useLuno();
  return config?.chains ? [...config.chains] : [];
};
