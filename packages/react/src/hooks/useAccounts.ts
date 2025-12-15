import type { HexString } from '@luno-kit/core/types';
import { convertAddress } from '@luno-kit/core/utils';
import { useMemo } from 'react';
import type { Account, Optional } from '../types';
import { useLuno } from './useLuno';

export interface UseAccountsResult {
  accounts: Account[];
  selectAccount: (accountOrPublicKey?: Optional<Account | HexString>) => void;
}

export const useAccounts = (): UseAccountsResult => {
  const { accounts, setAccount, currentChain } = useLuno();

  const formattedAccounts = useMemo(() => {
    if (!currentChain || currentChain?.ss58Format === undefined) return accounts ?? [];
    return (accounts || []).map((acc) => {
      try {
        const newAddress = convertAddress(acc.address, currentChain.ss58Format);
        return {
          ...acc,
          address: newAddress,
        };
      } catch (error) {
        console.error(
          `[useAccounts]: Failed to re-format address for account ${acc.address}:`,
          error
        );
        return { ...acc };
      }
    });
  }, [accounts, currentChain, currentChain?.ss58Format]);

  return { accounts: formattedAccounts, selectAccount: setAccount };
};
