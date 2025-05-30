// packages/ui/src/hooks/useLunoWallet.ts
import {
  useStatus,
  useAccount,
  useChain,
  useBalance, // 如果要集成余额
  ConnectionStatus, useChains, useActiveConnector
} from '@luno-kit/react';
import type { Account, Chain, AccountBalance, Connector } from '@luno-kit/core'
import {
  useConnectModal,
  useAccountModal,
  useChainModal,
} from '../providers/ModalContext';
import {shortAddress} from '../utils' // 调整 ModalContext 的导入路径

export interface UseConnectButtonReturn {
  connectionStatus: ConnectionStatus;
  isConnected: boolean;
  isDisconnected: boolean;
  isConnecting: boolean;

  account?: Account;
  address?: string;
  displayAddress: string;

  currentChain?: Chain;
  configuredChains: Chain[];
  isChainSupported: boolean;
  chainIconUrl: string;
  chainName?: string;

  balance?: AccountBalance;

  activeConnector?: Connector;

  openConnectModal?: () => void;
  openAccountModal?: () => void;
  openChainModal?: () => void;

  isConnectModalOpen: boolean;
  isAccountModalOpen: boolean;
  isChainModalOpen: boolean;
  // mounted?: boolean; // 用于防止 hydration mismatch，可以稍后考虑
}

export function useLunoWallet(): UseConnectButtonReturn {
  const connectionStatus = useStatus();
  const { account, address } = useAccount();
  const { chain: currentChain } = useChain();
  const configuredChains = useChains();
  const { data: balance } = useBalance({ address });
  const activeConnector = useActiveConnector()

  const { open: openConnectModal, isOpen: isConnectModalOpen } = useConnectModal();
  const { open: openAccountModal, isOpen: isAccountModalOpen } = useAccountModal();
  const { open: openChainModal, isOpen: isChainModalOpen } = useChainModal();

  const isConnecting = connectionStatus === ConnectionStatus.Connecting;
  const isConnected = connectionStatus === ConnectionStatus.Connected;
  const isDisconnected = connectionStatus === ConnectionStatus.Disconnected || connectionStatus === ConnectionStatus.Disconnecting;

  const isChainSupported: boolean = !!currentChain
    && configuredChains.some(c => c.genesisHash.toLowerCase() === currentChain.genesisHash.toLowerCase());

  return {
    activeConnector,
    connectionStatus,
    isConnected,
    isDisconnected,
    isConnecting,

    account,
    address,
    displayAddress: shortAddress(address),

    currentChain,
    configuredChains,
    isChainSupported,
    chainIconUrl: currentChain?.chainIconUrl,
    chainName: currentChain?.name ,

    balance,

    openConnectModal,
    openAccountModal,
    openChainModal,

    isConnectModalOpen,
    isAccountModalOpen,
    isChainModalOpen,
  };
}
