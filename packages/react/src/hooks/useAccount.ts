import type { Account } from '@luno/core';
import { useLuno } from './useLuno';
import { useSs58Format } from './useSs58Format'
import { convertAddress } from '@luno/core'
import { useMemo } from 'react'

export interface UseAccountResult {
  account?: Account;
  address?: string;
}

export const useAccount = (): UseAccountResult => {
  const { account, currentChain } = useLuno();


  const formattedAccount = useMemo(() => {
    if (!account) return
    if (!currentChain?.ss58Format || !account?.publicKey) return account

    try {
      const newAddress = convertAddress(account.address, currentChain.ss58Format); // 重点：使用 publicKey
      return {
        ...account,
        address: newAddress,
      };
    } catch (error) {
      console.error(`[useAccount] Failed to re-format address for account with publicKey ${account.publicKey}:`, error);
      return { ...account };
    }
  }, [account, currentChain?.ss58Format])

  return {
    account: formattedAccount,
    address: formattedAccount?.address,
  };
};
