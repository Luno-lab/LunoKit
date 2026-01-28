import { useEffect, useRef } from 'react';
import { useLunoStore } from '../store';
import { useDisconnect } from './useDisconnect';
import { PERSIST_KEY } from '../constants';
import { Substrate } from '@luno-kit/core/utils';
import type { SubstrateAccount } from '@luno-kit/core/types';
import { ChainType } from '@luno-kit/core/types';

interface StoredAccountInfo {
  publicKey?: string;
  address: string;
  name?: string;
  source?: string;
}

export const useSubstrateEvents = () => {
  const config = useLunoStore((state) => state.config);
  const connector = useLunoStore((state) => state.substrate.connector);
  const setSubstrateState = useLunoStore((state) => state.setSubstrateState);

  const { disconnectAsync } = useDisconnect({ namespace: ChainType.SUBSTRATE });

  const unsubscribeRef = useRef<(() => void) | null>(null);

  useEffect(() => {
    if (unsubscribeRef.current) {
      unsubscribeRef.current();
      unsubscribeRef.current = null;
    }

    if (!connector || !config) return;

    const handleAccountsChanged = async (newAccounts: SubstrateAccount[]) => {
      if (newAccounts.length === 0) {
        await disconnectAsync();
        return;
      }

      newAccounts.forEach((acc) => {
        if (!acc.publicKey) {
          console.warn(
            `[LunoStore] Account ${acc.address} (from ${connector.name}) is missing publicKey.`
          );
        }
      });

      let selectedAccount = newAccounts[0];

      try {
        const lastStoredAccountJson = await config.storage.getItem(
          PERSIST_KEY.LAST_SELECTED_ACCOUNT_INFO
        );
        const recentStoredAccountJson = await config.storage.getItem(
          PERSIST_KEY.RECENT_SELECTED_ACCOUNT_INFO
        );
        const storedAccountJson = lastStoredAccountJson || recentStoredAccountJson;

        if (storedAccountJson) {
          const storedAccount: StoredAccountInfo = JSON.parse(storedAccountJson);

          const restoredAccount = newAccounts.find((acc) =>
            Substrate.isSameAddress(acc.address, storedAccount.address)
          );

          if (restoredAccount) {
            selectedAccount = restoredAccount;
          }
        }
      } catch (e) {
        console.warn('[LunoStore] Failed to restore account during accountsChanged:', e);
      }

      setSubstrateState({ allAccounts: newAccounts, account: selectedAccount });
    };

    const handleDisconnect = async () => {
      try {
        config.storage.removeItem(PERSIST_KEY.LAST_CONNECTOR_ID);
        config.storage.removeItem(PERSIST_KEY.LAST_CHAIN_ID);
      } catch (e) {
        console.error('[LunoStore] Failed to remove connection info from storage:', e);
      }

      await disconnectAsync();
    };

    connector.on('accountsChanged', handleAccountsChanged);
    connector.on('disconnect', handleDisconnect);

    unsubscribeRef.current = () => {
      connector.off('accountsChanged', handleAccountsChanged);
      connector.off('disconnect', handleDisconnect);
    };

    return () => {
      if (unsubscribeRef.current) {
        unsubscribeRef.current();
        unsubscribeRef.current = null;
      }
    };
  }, [connector, config]);
};
