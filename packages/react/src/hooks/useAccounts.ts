import type { SubstrateAccount, EvmAccount } from '@luno-kit/core/types';
import { Substrate } from '@luno-kit/core/utils';
import { useMemo } from 'react';
import { useLunoStore } from '../store';

export interface UseAccountsResult {
  substrateAccounts: SubstrateAccount[];
  evmAccounts: EvmAccount[];
}

export function useAccounts(): UseAccountsResult {
  const allSubstrateAccounts = useLunoStore((state) => state.substrate.allAccounts);
  const substrateChain = useLunoStore((state) => state.substrate.chain);
  const allEvmAccounts = useLunoStore((state) => state.evm.allAccounts);

  const formattedSubstrateAccounts = useMemo(() => {
    if (!allSubstrateAccounts?.length) return [];
    if (!substrateChain || substrateChain.ss58Format === undefined) return allSubstrateAccounts;

    return allSubstrateAccounts.map((acc) => {
      try {
        return {
          ...acc,
          address: Substrate.convertAddress(acc.address, substrateChain.ss58Format),
        };
      } catch (error) {
        console.error(`[useAccounts] Failed to re-format address for account ${acc.address}:`,
          error);
        return acc;
      }
    });
  }, [allSubstrateAccounts, substrateChain?.ss58Format]);

  return {
    substrateAccounts: formattedSubstrateAccounts,
    evmAccounts: allEvmAccounts || [],
  };
}
