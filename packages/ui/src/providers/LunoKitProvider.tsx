import React, { ReactNode, useState } from 'react';
import { LunoProvider } from '@luno/react';
import type { Config as LunoCoreConfig } from '@luno/core'
import { QueryClient, QueryClientProvider, type QueryClientConfig } from '@tanstack/react-query';
import { ModalProvider, useAccountModal, useChainModal, useConnectModal } from './ModalContext';
import { ThemeProvider, ThemeMode } from './ThemeContext';

export interface LunoKitProviderProps {
  children: ReactNode;
  config: LunoCoreConfig;
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
            {/*<RenderModals />*/}
          </ModalProvider>
        </ThemeProvider>
      </LunoProvider>
    </QueryClientProvider>
  );
};


const RenderModals: React.FC = () => {
  const { isOpen: isConnectModalOpen, close: closeConnectModal } = useConnectModal();
  const { isOpen: isAccountModalOpen, close: closeAccountModal } = useAccountModal();
  const { isOpen: isChainModalOpen, close: closeChainModal } = useChainModal(); // 示例

  return (
    <>
      <ConnectModal
        open={isConnectModalOpen}
        onClose={closeConnectModal}
      />
      <AccountDetailsModal
        open={isAccountModalOpen}
        onClose={closeAccountModal}
      />
      <ChainSelectorModal // 示例
        open={isChainModalOpen}
        onClose={closeChainModal}
      />
    </>
  );
}
