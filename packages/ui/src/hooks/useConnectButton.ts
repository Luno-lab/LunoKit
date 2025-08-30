import {
  useStatus,
  useAccount,
  useChain,
  useBalance,
  ConnectionStatus,
  useChains,
  useActiveConnector,
} from '@luno-kit/react';
import type { Account, Chain, AccountBalance, Connector } from '@luno-kit/react/types'
import {
  useConnectModal,
  useAccountModal,
  useChainModal,
} from '../providers';
import { formatAddress } from '@luno-kit/react/utils'

export interface UseConnectButtonProps {
  displayPreference: 'address' | 'name'
}

export interface UseConnectButtonReturn {
  connectionStatus: ConnectionStatus;
  isConnected: boolean;
  isDisconnected: boolean;
  isConnecting: boolean;

  account?: Account;
  address?: string;
  displayAccount: string;

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
}

export function useConnectButton({ displayPreference }: UseConnectButtonProps): UseConnectButtonReturn {
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
    displayAccount: displayPreference === 'name' && account?.name ? account?.name : formatAddress(address),

    currentChain,
    configuredChains,
    isChainSupported,
    chainIconUrl: currentChain?.chainIconUrl!,
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
