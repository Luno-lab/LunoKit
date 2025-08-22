import type { Config } from '../types';
import { useLuno } from './useLuno';

export const useConfig = (): Config | undefined => {
  const { config } = useLuno();
  return config;
};
