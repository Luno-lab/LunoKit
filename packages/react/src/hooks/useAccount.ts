import {
  ChainType,
  type SubstrateAccount,
  type EvmAccount,
  type HexString,
  type AccountType,
} from '@luno-kit/core/types';
import { Substrate } from '@luno-kit/core/utils';
import { useMemo } from 'react';
import { useLunoStore } from '../store';
import { ConnectionStatus, type Optional } from '../types';

export interface UseAccountResult<TAccount = AccountType> {
  account?: Optional<TAccount>;
  allAccounts?: Optional<TAccount[]>;
  address?: TAccount extends SubstrateAccount ? string : HexString;
  isConnected: boolean;
  status: ConnectionStatus;
  chainType: ChainType;
}

export function useAccount(
  parameters: { namespace: ChainType.SUBSTRATE }
): UseAccountResult<SubstrateAccount>;

export function useAccount(
  parameters: { namespace: ChainType.EVM }
): UseAccountResult<EvmAccount>;

export function useAccount<TAccount extends AccountType = AccountType>(
  parameters?: Optional<{ namespace?: Optional<ChainType> }>
): UseAccountResult<TAccount>;

export function useAccount(
  parameters: { namespace?: Optional<ChainType> } = {}
): UseAccountResult {
  const { namespace } = parameters;

  const activeNamespace = useLunoStore((state) => state.activeNamespace);

  const substrateAccount = useLunoStore((state) => state.substrate.account);
  const allSubstrateAccounts = useLunoStore((state) => state.substrate.allAccounts);
  const substrateStatus = useLunoStore((state) => state.substrate.status);
  const substrateChain = useLunoStore((state) => state.substrate.chain);

  const evmAccount = useLunoStore((state) => state.evm.account);
  const allEvmAccounts = useLunoStore((state) => state.evm.allAccounts);
  const evmStatus = useLunoStore((state) => state.evm.status);

  const targetNamespace = namespace || activeNamespace;

  const formattedSubstrateAccount = useMemo(() => {
    if (!substrateAccount) return undefined;
    if (!substrateChain || substrateChain.ss58Format === undefined) return substrateAccount;

    try {
      const newAddress = Substrate.convertAddress(substrateAccount.address, substrateChain.ss58Format);
      return {
        ...substrateAccount,
        address: newAddress,
      };
    } catch (error) {
      console.error(
        `[useAccount]: Failed to re-format address for account ${substrateAccount.address}:`,
        error
      );
      return substrateAccount;
    }
  }, [substrateAccount, substrateChain?.ss58Format]);

  return useMemo(() => {
    switch (targetNamespace) {
      case ChainType.SUBSTRATE:
        return {
          account: formattedSubstrateAccount,
          allAccounts: allSubstrateAccounts,
          address: formattedSubstrateAccount?.address,
          isConnected: substrateStatus === ConnectionStatus.Connected,
          status: substrateStatus,
          chainType: ChainType.SUBSTRATE,
        };

      case ChainType.EVM:
        return {
          account: evmAccount,
          allAccounts: allEvmAccounts,
          address: evmAccount?.address as HexString,
          isConnected: evmStatus === ConnectionStatus.Connected,
          status: evmStatus,
          chainType: ChainType.EVM,
        };

      default:
        return {
          account: undefined,
          allAccounts: undefined,
          address: undefined,
          isConnected: false,
          status: ConnectionStatus.Disconnected,
          chainType: targetNamespace as ChainType,
        };
    }
  }, [
    targetNamespace,
    formattedSubstrateAccount,
    allSubstrateAccounts,
    substrateStatus,
    evmAccount,
    allEvmAccounts,
    evmStatus,
  ]);
}
