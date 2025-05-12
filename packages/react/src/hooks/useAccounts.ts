import type { Account } from '@luno/core';
import { useLuno } from './useLuno';

export interface UseAccountsResult {
  accounts: Account[];
  selectAccount: (accountOrAddress: Account | string) => void;
}

export const useAccounts = (): UseAccountsResult => {
  const { accounts, setAccount } = useLuno();
  return { accounts, selectAccount: setAccount };
};
