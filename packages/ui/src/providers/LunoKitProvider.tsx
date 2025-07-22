import React, { ReactNode, useState } from 'react';
import { LunoProvider } from '@luno-kit/react';
import type { Config as LunoCoreConfig } from '@luno-kit/react'
// @ts-ignore - @tanstack/react-query v5 API changes
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ModalProvider, useConnectModal, useAccountModal, useChainModal } from './ModalContext';
import { ThemeProvider } from '../theme/context';
import type { LunokitTheme, LunokitThemeOverrides, ThemeMode } from '../theme/types';
import { ConnectModal, AccountDetailsModal, ChainModal } from '../components'
import { ModalSize } from '../components/Dialog'

export interface LunoKitProviderProps {
  children: ReactNode;
  config: LunoCoreConfig & { modalSize?: ModalSize };
  queryClientConfig?: any;
  theme?: LunokitTheme | LunokitThemeOverrides; // Support both complete themes and partial overrides
  defaultTheme?: ThemeMode; // 新增：设置默认主题模式
}

export const LunoKitProvider: React.FC<LunoKitProviderProps> = ({
  children,
  config,
  queryClientConfig,
  theme,
  defaultTheme = 'light', // 默认值为 light，保持向后兼容
}) => {
  const [queryClient] = useState(() => new QueryClient(queryClientConfig));

  return (
    <QueryClientProvider client={queryClient}>
      <LunoProvider config={config}>
        <ThemeProvider theme={theme} defaultTheme={defaultTheme}>
          <ModalProvider>
            <div className={'font-base luno-kit'} data-theme={theme ? undefined : defaultTheme}>
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
