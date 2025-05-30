import type { Connector } from '@luno-kit/core';
import { useLuno } from './useLuno';

export const useConnectors = (): Connector[] => {
  const { config } = useLuno();
  return config?.connectors ? [...config.connectors] : [];
};
