import { convertAddress } from '@luno-kit/core/utils';
import { useMemo } from 'react';
import type { Account, Optional } from '../types';
import { useLuno } from './useLuno';

export interface UseAccountResult {
  account?: Optional<Account>;
  address?: Optional<string>;
}

export const useAccount = (): UseAccountResult => {
  const { account, currentChain } = useLuno();

  const formattedAccount = useMemo(() => {
    if (!account) return;
    if (!currentChain || currentChain?.ss58Format === undefined) return account;

    try {
      const newAddress = convertAddress(account.address, currentChain.ss58Format);
      return {
        ...account,
        address: newAddress,
      };
    } catch (error) {
      console.error(
        `[useAccount]: Failed to re-format address for account ${account.address}:`,
        error
      );
      return { ...account };
    }
  }, [account, currentChain, currentChain?.ss58Format]);

  return {
    account: formattedAccount,
    address: formattedAccount?.address,
  };
};
