import {
  ChainType,
  type SubstrateAccount,
  type EvmAccount,
  type HexString,
  type AccountType,
  type Optional,
} from '@luno-kit/core/types';
import { Substrate } from '@luno-kit/core/utils';
import {useCallback, useMemo} from 'react';
import { useLunoStore } from '../store';
import { ConnectionStatus } from '../types';

export interface UseAccountResult<TAccount extends AccountType = AccountType> {
  account?: Optional<TAccount>;
  allAccounts: TAccount[];
  address?: TAccount extends SubstrateAccount ? string : HexString;
  isConnected: boolean;
  status: ConnectionStatus;
  chainType: ChainType;
  selectAccount?: Optional<(account: AccountType) => void>;
}

export function useAccount(
  parameters: { namespace: 'substrate' }
): UseAccountResult<SubstrateAccount>;

export function useAccount(
  parameters: { namespace: 'evm' }
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

  const setActiveNamespace = useLunoStore((state) => state.setActiveNamespace);

  const setSubstrateState = useLunoStore((state) => state.setSubstrateState);
  const setEvmState = useLunoStore((state) => state.setEvmState);

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

  const selectAccount = useCallback((account: AccountType) => {
    switch (targetNamespace) {
      case ChainType.SUBSTRATE:
        setSubstrateState({ account: account as SubstrateAccount });
        setActiveNamespace(ChainType.SUBSTRATE);
        break;
      case ChainType.EVM:
        setEvmState({ account: account as EvmAccount });
        setActiveNamespace(ChainType.EVM);
        break;
    }
  }, [targetNamespace, setSubstrateState, setEvmState, setActiveNamespace]);

  return useMemo(() => {
    switch (targetNamespace) {
      case ChainType.SUBSTRATE:
        return {
          account: formattedSubstrateAccount,
          allAccounts: allSubstrateAccounts || [],
          address: formattedSubstrateAccount?.address,
          isConnected: substrateStatus === ConnectionStatus.Connected,
          status: substrateStatus,
          chainType: ChainType.SUBSTRATE,
          selectAccount,
        };

      case ChainType.EVM:
        return {
          account: evmAccount,
          allAccounts: allEvmAccounts || [],
          address: evmAccount?.address as HexString,
          isConnected: evmStatus === ConnectionStatus.Connected,
          status: evmStatus,
          chainType: ChainType.EVM,
          selectAccount,
        };

      default:
        return {
          account: undefined,
          allAccounts: [],
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
    selectAccount,
  ]);
}
