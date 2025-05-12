import type { Account } from '@luno/core';
import { useLuno } from './useLuno';

export interface UseAccountResult {
  account?: Account;
  address?: string;
}

export const useAccount = (): UseAccountResult => {
  const { account } = useLuno();
  return {
    account,
    address: account?.address,
  };
};
