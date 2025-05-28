import React, { ReactNode, useState } from 'react';
import { LunoProvider } from '@luno/react';
import type { Config as LunoCoreConfig } from '@luno/core'
import { QueryClient, QueryClientProvider, type QueryClientConfig } from '@tanstack/react-query';
import { ModalProvider, useAccountModal, useChainModal, useConnectModal } from './ModalContext';
import { ThemeProvider, ThemeMode } from './ThemeContext';
import { ConnectModal, AccountDetailsModal } from '../components'
import { ModalSize } from '../components/Dialog'

export interface LunoKitProviderProps {
  children: ReactNode;
  config: LunoCoreConfig & { modalSize?: ModalSize };
  queryClientConfig?: QueryClientConfig;
  // theme?: ThemeMode | LunoTheme;
  theme?: ThemeMode;
}

export const LunoKitProvider: React.FC<LunoKitProviderProps> = ({
  children,
  config,
  queryClientConfig,
  theme,
}) => {
  const [queryClient] = useState(() => new QueryClient(queryClientConfig));

  return (
    <QueryClientProvider client={queryClient}>
      <LunoProvider config={config}>
        <ThemeProvider initialTheme={theme}>
          <ModalProvider>
            {children}
            <RenderModals modalSize={config.modalSize} />
          </ModalProvider>
        </ThemeProvider>
      </LunoProvider>
    </QueryClientProvider>
  );
};


const RenderModals: React.FC = ({ modalSize }: { modalSize?: ModalSize }) => {
  const { isOpen: isAccountModalOpen, close: closeAccountModal } = useAccountModal();
  const { isOpen: isChainModalOpen, close: closeChainModal } = useChainModal(); // 示例

  return (
    <>
      <ConnectModal size={modalSize} />
      <AccountDetailsModal />
      {/*<AccountDetailsModal*/}
      {/*  open={isAccountModalOpen}*/}
      {/*  onClose={closeAccountModal}*/}
      {/*/>*/}
      {/*<ChainSelectorModal // 示例*/}
      {/*  open={isChainModalOpen}*/}
      {/*  onClose={closeChainModal}*/}
      {/*/>*/}
    </>
  );
}
