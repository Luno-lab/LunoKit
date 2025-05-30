import React, {createContext, type ReactNode, useCallback, useContext, useEffect, useMemo, useState} from 'react';
import {ConnectionStatus, useStatus} from '@luno-kit/react'

function useModalVisibility() {
  const [isOpen, setIsOpen] = useState(false);
  const open = useCallback(() => setIsOpen(true), []);
  const close = useCallback(() => setIsOpen(false), []);
  return { isOpen, open, close };
}

interface ModalContextValue {
  isConnectModalOpen: boolean;
  openConnectModal?: () => void;

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
  const { isOpen: isConnectModalOpen, open: openConnectModal, close: closeConnectModal } = useModalVisibility();
  const { isOpen: isAccountModalOpen, open: openAccountModal, close: closeAccountModal } = useModalVisibility();
  const { isOpen: isChainModalOpen, open: openChainModal, close: closeChainModal } = useModalVisibility(); // 示例

  const connectionStatus = useStatus()

  const closeAllModals = useCallback(() => {
    closeConnectModal();
    closeAccountModal();
    closeChainModal();
  }, [closeConnectModal, closeAccountModal, closeChainModal]);

  useEffect(() => {
    if (connectionStatus === ConnectionStatus.Connected) closeConnectModal();
    if (connectionStatus === ConnectionStatus.Disconnected) { closeAccountModal(); closeChainModal(); }
  }, [connectionStatus, closeConnectModal, closeAccountModal, closeChainModal]);


  const contextValue = useMemo(() => ({
    isConnectModalOpen,
    isAccountModalOpen,
    isChainModalOpen,
    openConnectModal: connectionStatus === ConnectionStatus.Disconnected || connectionStatus === ConnectionStatus.Disconnecting ? openConnectModal : undefined,
    closeConnectModal,
    openAccountModal: connectionStatus === ConnectionStatus.Connected ? openAccountModal : undefined,
    closeAccountModal,
    openChainModal: connectionStatus === ConnectionStatus.Connected ? openChainModal: undefined,
    closeChainModal,
    closeAllModals,
  }), [
    isConnectModalOpen, openConnectModal, closeConnectModal,
    isAccountModalOpen, openAccountModal, closeAccountModal,
    isChainModalOpen, openChainModal, closeChainModal,
    closeAllModals, connectionStatus
  ]);

  return (
    <ModalContext.Provider value={contextValue}>
      {children}
    </ModalContext.Provider>
  );
};

// 4. 特定 Hooks
export const useConnectModal = (): { isOpen: boolean; open?: () => void; close: () => void } => {
  const context = useContext(ModalContext);
  if (!context) throw new Error('[ModalContext]: useConnectModal must be used within a ModalProvider');

  return {
    isOpen: context.isConnectModalOpen,
    open: context.openConnectModal,
    close: context.closeConnectModal,
  };
};

export const useAccountModal = (): { isOpen: boolean; open?: () => void; close: () => void } => {
  const context = useContext(ModalContext);
  if (!context) throw new Error('[ModalContext]: useAccountModal must be used within a ModalProvider');
  return {
    isOpen: context.isAccountModalOpen,
    open: context.openAccountModal,
    close: context.closeAccountModal,
  };
};

export const useChainModal = (): { isOpen: boolean; open?: () => void; close: () => void } => { // 示例
  const context = useContext(ModalContext);
  if (!context) throw new Error('[ModalContext]: useChainModal must be used within a ModalProvider');
  return {
    isOpen: context.isChainModalOpen,
    open: context.openChainModal,
    close: context.closeChainModal,
  };
};

export const useCloseAllModals = (): () => void => {
  const context = useContext(ModalContext);
  if (!context) throw new Error('[ModalContext]: useCloseAllModals must be used within a ModalProvider');
  return context.closeAllModals;
}
