import type { ConnectionStatus } from '../types';
import { useLuno } from './useLuno';

export const useStatus = (): ConnectionStatus => {
  const { status } = useLuno();
  return status;
};
