import type { Connector } from '@luno-kit/core';
import { useLuno } from './useLuno';

export const useActiveConnector = (): Connector | undefined => {
  const { activeConnector } = useLuno();
  return activeConnector;
};
