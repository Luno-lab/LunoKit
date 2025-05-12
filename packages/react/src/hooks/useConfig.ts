import type { Config } from '@luno/core';
import { useLuno } from './useLuno';

export const useConfig = (): Config | undefined => {
  const { config } = useLuno();
  return config;
};
