import React, { useState, useContext, createContext, ReactNode, useCallback } from 'react';

export type ModalType = 'ConnectWallet' | 'AccountDetails';

interface ModalContextValue {
  activeModal: ModalType | null;
  openModal: <P = any>(type: ModalType, props?: P) => void;
  closeModal: () => void;
}

const ModalContext = createContext<ModalContextValue | undefined>(undefined);

interface ModalProviderProps {
  children: ReactNode;
}

export const ModalProvider: React.FC<ModalProviderProps> = ({ children }) => {
  const [activeModal, setActiveModal] = useState<ModalType | null>(null);

  const openModal = useCallback(<P = any>(type: ModalType, props?: P) => {
    setActiveModal(type);
  }, []);

  const closeModal = useCallback(() => {
    setActiveModal(null);
  }, []);

  return (
    <ModalContext.Provider value={{ activeModal, modalProps, openModal, closeModal }}>
      {children}
    </ModalContext.Provider>
  );
};

export const useLunoModal = (): ModalContextValue => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error('useLunoModal must be used within a ModalProvider (which is part of LunoKitProvider)');
  }
  return context;
};
