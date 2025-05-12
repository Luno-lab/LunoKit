import type { Connector } from '@luno/core';
import { useLuno } from './useLuno';

export const useActiveConnector = (): Connector | undefined => {
  const { activeConnector } = useLuno();
  return activeConnector;
};
