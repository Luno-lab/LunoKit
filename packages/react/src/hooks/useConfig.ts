import type { Config } from '../types';
import { useLunoStore } from '../store'

export const useConfig = (): Config | undefined => {
  const { config } = useLunoStore();
  return config;
};
