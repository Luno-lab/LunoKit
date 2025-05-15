import type { Account } from '@luno/core';
import { useLuno } from './useLuno';
import { useMemo } from 'react'
import { useSs58Format } from './useSs58Format'
import { convertAddress } from '@luno/core'
import type { HexString } from '@polkadot/util/types'

export interface UseAccountsResult {
  accounts: Account[];
  selectAccount: (accountOrAddress: Account | HexString) => void;
}

export const useAccounts = (): UseAccountsResult => {
  const { accounts, setAccount, currentChain } = useLuno();

  const formattedAccounts = useMemo(() => {
    if (!currentChain?.ss58Format) return accounts ?? []
    return (accounts || []).map(acc => {
      if (!acc.publicKey) {
        console.warn(`[useAccounts] Account ${acc.name || acc.address} is missing publicKey. Cannot re-format address.`);
        return acc;
      }

      try {
        const newAddress = convertAddress(acc.address, currentChain.ss58Format); // 重点：使用 publicKey
        return {
          ...acc,
          address: newAddress,
        };
      } catch (error) {
        console.error(`[useAccounts] Failed to re-format address for account with publicKey ${acc.publicKey}:`, error);
        return { ...acc };
      }
    })
  }, [accounts, currentChain?.ss58Format])

  return { accounts: formattedAccounts, selectAccount: setAccount };
};
