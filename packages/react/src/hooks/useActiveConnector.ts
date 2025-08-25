import type { Connector } from '../types';
import { useLuno } from './useLuno';

export const useActiveConnector = (): Connector | undefined => {
  const { activeConnector } = useLuno();
  return activeConnector;
};
