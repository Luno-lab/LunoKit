import type { Connector } from '../types';
import { useLuno } from './useLuno';

export const useConnectors = (): Connector[] => {
  const { config } = useLuno();
  return config?.connectors ? [...config.connectors] : [];
};
