import {
  ConnectionStatus,
  useAccount,
  useActiveConnector,
  useBalance,
  useChain,
  useChains,
  useStatus,
} from '@luno-kit/react';
import type { AccountType, NativeBalance, AnyChain, AnyConnector, Optional } from '@luno-kit/react/types';
import { useAccountModal, useChainModal, useConnectModal } from '../providers';

export interface UseConnectButtonReturn {
  connectionStatus: ConnectionStatus;
  isConnected: boolean;
  isDisconnected: boolean;
  isConnecting: boolean;

  account?: Optional<AccountType>;
  address?: Optional<string>;

  currentChain?: Optional<AnyChain>;
  configuredChains: AnyChain[];
  isChainSupported: boolean;
  chainIconUrl: string;
  chainName?: Optional<string>;

  balance?: Optional<NativeBalance>;

  activeConnector?: Optional<AnyConnector>;

  openConnectModal?: Optional<() => void>;
  openAccountModal?: Optional<() => void>;
  openChainModal?: Optional<() => void>;

  isConnectModalOpen: boolean;
  isAccountModalOpen: boolean;
  isChainModalOpen: boolean;
}

export function useConnectButton(): UseConnectButtonReturn {
  const { account, address } = useAccount();
  const connectionStatus = useStatus()
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
  const isDisconnected = connectionStatus === ConnectionStatus.Disconnected;

  const isChainSupported: boolean =
    !!currentChain &&
    configuredChains.some((c) => c.id === currentChain.id);

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
