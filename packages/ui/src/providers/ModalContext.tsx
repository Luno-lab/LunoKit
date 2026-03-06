import { ConnectionStatus, useConfig, useStatus } from '@luno-kit/react';
import { ChainType } from '@luno-kit/react/types';
import React, {
  createContext,
  type ReactNode,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';

function useModalVisibility<T = undefined>() {
  const [isOpen, setIsOpen] = useState(false);
  const [data, setData] = useState<T | undefined>();

  const open = useCallback((d?: T) => {
    setData(d);
    setIsOpen(true);
  }, []);

  const close = useCallback(() => {
    setIsOpen(false);
    setData(undefined);
  }, []);

  return { isOpen, data, open, close };
}

interface ModalContextValue {
  isConnectModalOpen: boolean;
  connectTargetNamespace?: ChainType;
  openConnectModal?: (namespace?: ChainType) => void;
  closeConnectModal: () => void;

  isAccountModalOpen: boolean;
  openAccountModal?: () => void;
  closeAccountModal: () => void;

  isChainModalOpen: boolean;
  openChainModal?: () => void;
  closeChainModal: () => void;

  closeAllModals: () => void;
}

const ModalContext = createContext<ModalContextValue | undefined>(undefined);

interface ModalProviderProps {
  children: ReactNode;
}

export const ModalProvider: React.FC<ModalProviderProps> = ({ children }) => {
  const {
    isOpen: isConnectModalOpen,
    data: connectTargetNamespace,
    open: openConnectModal,
    close: closeConnectModal,
  } = useModalVisibility<ChainType>();
  const {
    isOpen: isAccountModalOpen,
    open: openAccountModal,
    close: closeAccountModal,
  } = useModalVisibility();
  const {
    isOpen: isChainModalOpen,
    open: openChainModal,
    close: closeChainModal,
  } = useModalVisibility();

  const connectionStatus = useStatus();
  const substrateStatus = useStatus({ namespace: ChainType.SUBSTRATE });
  const evmStatus = useStatus({ namespace: ChainType.EVM });
  const config = useConfig();

  const closeAllModals = useCallback(() => {
    closeConnectModal();
    closeAccountModal();
    closeChainModal();
  }, [closeConnectModal, closeAccountModal, closeChainModal]);

  useEffect(() => {
    if (connectionStatus === ConnectionStatus.Disconnected) {
      closeAccountModal();
      closeChainModal();
    }
  }, [connectionStatus, closeAccountModal, closeChainModal]);

  const allConfiguredConnected = useMemo(() =>
    (!config?.substrate || substrateStatus === ConnectionStatus.Connected) &&
    (!config?.evm || evmStatus === ConnectionStatus.Connected),
    [config?.substrate, config?.evm, substrateStatus, evmStatus]
  );

  const contextValue = useMemo(
    () => ({
      isConnectModalOpen,
      connectTargetNamespace,
      isAccountModalOpen,
      isChainModalOpen,
      openConnectModal: allConfiguredConnected ? undefined : openConnectModal,
      closeConnectModal,
      openAccountModal:
        connectionStatus === ConnectionStatus.Connected ? openAccountModal : undefined,
      closeAccountModal,
      openChainModal: connectionStatus === ConnectionStatus.Connected ? openChainModal : undefined,
      closeChainModal,
      closeAllModals,
    }),
    [
      isConnectModalOpen,
      connectTargetNamespace,
      openConnectModal,
      closeConnectModal,
      isAccountModalOpen,
      openAccountModal,
      closeAccountModal,
      isChainModalOpen,
      openChainModal,
      closeChainModal,
      closeAllModals,
      connectionStatus,
      allConfiguredConnected,
    ]
  );

  return <ModalContext.Provider value={contextValue}>{children}</ModalContext.Provider>;
};

export const useConnectModal = (): {
  isOpen: boolean;
  targetNamespace?: ChainType;
  open?: (namespace?: ChainType) => void;
  close: () => void;
} => {
  const context = useContext(ModalContext);
  if (!context)
    throw new Error('[ModalContext]: useConnectModal must be used within a ModalProvider');

  return {
    isOpen: context.isConnectModalOpen,
    targetNamespace: context.connectTargetNamespace,
    open: context.openConnectModal,
    close: context.closeConnectModal,
  };
};

export const useAccountModal = (): { isOpen: boolean; open?: () => void; close: () => void } => {
  const context = useContext(ModalContext);
  if (!context)
    throw new Error('[ModalContext]: useAccountModal must be used within a ModalProvider');
  return {
    isOpen: context.isAccountModalOpen,
    open: context.openAccountModal,
    close: context.closeAccountModal,
  };
};

export const useChainModal = (): { isOpen: boolean; open?: () => void; close: () => void } => {
  const context = useContext(ModalContext);
  if (!context)
    throw new Error('[ModalContext]: useChainModal must be used within a ModalProvider');
  return {
    isOpen: context.isChainModalOpen,
    open: context.openChainModal,
    close: context.closeChainModal,
  };
};

export const useCloseAllModals = (): (() => void) => {
  const context = useContext(ModalContext);
  if (!context)
    throw new Error('[ModalContext]: useCloseAllModals must be used within a ModalProvider');
  return context.closeAllModals;
};
