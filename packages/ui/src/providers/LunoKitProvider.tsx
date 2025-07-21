import React, { ReactNode, useState } from 'react';
import { LunoProvider } from '@luno-kit/react';
import type { Config as LunoCoreConfig } from '@luno-kit/react'
// @ts-ignore - @tanstack/react-query v5 API changes
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ModalProvider, useConnectModal, useAccountModal, useChainModal } from './ModalContext';
import { ThemeProvider } from '../theme/context';
import { lunokitLightTheme } from '../theme/defaultTheme';
import type { LunokitTheme } from '../theme/types';
import { ConnectModal, AccountDetailsModal, ChainModal } from '../components'
import { ModalSize } from '../components/Dialog'

export interface LunoKitProviderProps {
  children: ReactNode;
  config: LunoCoreConfig & { modalSize?: ModalSize };
  queryClientConfig?: any;
  theme?: LunokitTheme; // Support for custom theme object
}

export const LunoKitProvider: React.FC<LunoKitProviderProps> = ({
  children,
  config,
  queryClientConfig,
  theme, // Remove default value, let ThemeProvider handle default theme
}) => {
  const [queryClient] = useState(() => new QueryClient(queryClientConfig));

  return (
    <QueryClientProvider client={queryClient}>
      <LunoProvider config={config}>
        <ThemeProvider theme={theme}>
          <ModalProvider>
            <div className={'font-base luno-kit'}>
              {children}
            </div>
            <RenderModals modalSize={config.modalSize} />
          </ModalProvider>
        </ThemeProvider>
      </LunoProvider>
    </QueryClientProvider>
  );
};


const RenderModals: React.FC<{modalSize?: ModalSize}> = ({ modalSize }: { modalSize?: ModalSize }) => {
  const { isOpen: isConnectModalOpen, close: closeConnectModal } = useConnectModal();
  const { isOpen: isAccountModalOpen, close: closeAccountModal } = useAccountModal();
  const { isOpen: isChainModalOpen, close: closeChainModal } = useChainModal();

  return (
    <>
      {isConnectModalOpen && (
        <ConnectModal size={modalSize} />
      )}
      {isAccountModalOpen && (
        <AccountDetailsModal />
      )}
      {isChainModalOpen && (
        <ChainModal
          size={modalSize}
          open={isChainModalOpen}
          onOpenChange={(open) => {
            if (!open) closeChainModal();
          }}
        />
      )}
    </>
  );
}
