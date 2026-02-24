import type { Config } from '@luno-kit/core/types';
import { useLunoStore } from '../store'

export const useConfig = (): Config | undefined => {
  const { config } = useLunoStore();
  return config;
};
