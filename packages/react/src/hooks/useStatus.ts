import { useLuno } from './useLuno';
import { ConnectionStatus } from '../types';

export const useStatus = (): ConnectionStatus => {
  const { status } = useLuno();
  return status;
};
