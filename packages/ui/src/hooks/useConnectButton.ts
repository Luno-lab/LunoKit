import {
  ConnectionStatus,
  useAccount,
  useActiveConnector,
  useBalance,
  useChain,
  useChains,
  useStatus,
} from '@luno-kit/react';
import type { Account, AccountBalance, Chain, Connector, Optional } from '@luno-kit/react/types';
import { useAccountModal, useChainModal, useConnectModal } from '../providers';

export interface UseConnectButtonReturn {
  connectionStatus: ConnectionStatus;
  isConnected: boolean;
  isDisconnected: boolean;
  isConnecting: boolean;

  account?: Optional<Account>;
  address?: Optional<string>;

  currentChain?: Optional<Chain>;
  configuredChains: Chain[];
  isChainSupported: boolean;
  chainIconUrl: string;
  chainName?: Optional<string>;

  balance?: Optional<AccountBalance>;

  activeConnector?: Optional<Connector>;

  openConnectModal?: Optional<() => void>;
  openAccountModal?: Optional<() => void>;
  openChainModal?: Optional<() => void>;

  isConnectModalOpen: boolean;
  isAccountModalOpen: boolean;
  isChainModalOpen: boolean;
}

export function useConnectButton(): UseConnectButtonReturn {
  const connectionStatus = useStatus();
  const { account, address } = useAccount();
  const { chain: currentChain } = useChain();
  const configuredChains = useChains();
  const { data: balance } = useBalance({
    address: configuredChains.length > 0 ? address : undefined,
  });
  const activeConnector = useActiveConnector();

  const { open: openConnectModal, isOpen: isConnectModalOpen } = useConnectModal();
  const { open: openAccountModal, isOpen: isAccountModalOpen } = useAccountModal();
  const { open: openChainModal, isOpen: isChainModalOpen } = useChainModal();

  const isConnecting = connectionStatus === ConnectionStatus.Connecting;
  const isConnected = connectionStatus === ConnectionStatus.Connected;
  const isDisconnected =
    connectionStatus === ConnectionStatus.Disconnected ||
    connectionStatus === ConnectionStatus.Disconnecting;

  const isChainSupported: boolean =
    !!currentChain &&
    configuredChains.some(
      (c) => c.genesisHash.toLowerCase() === currentChain.genesisHash.toLowerCase()
    );

  return {
    activeConnector,
    connectionStatus,
    isConnected,
    isDisconnected,
    isConnecting,

    account,
    address,

    currentChain,
    configuredChains,
    isChainSupported,
    chainIconUrl: currentChain?.chainIconUrl!,
    chainName: currentChain?.name,

    balance,

    openConnectModal,
    openAccountModal,
    openChainModal,

    isConnectModalOpen,
    isAccountModalOpen,
    isChainModalOpen,
  };
}
