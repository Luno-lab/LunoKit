import { LunoProvider } from '@luno-kit/react';
import type { Config as LunoCoreConfig } from '@luno-kit/react/types';
// @ts-ignore - @tanstack/react-query v5 API changes
import { QueryClient, type QueryClientConfig, QueryClientProvider } from '@tanstack/react-query';
import type React from 'react';
import { type ReactNode, useState } from 'react';
import { AccountDetailsModal, ChainModal, ConnectModal } from '../components';
import type { ModalSize } from '../components/Dialog';
import type { LunokitThemeOverrides, PartialLunokitTheme } from '../theme';
import { ThemeProvider } from '../theme';
import { ModalProvider } from './ModalContext';

export interface LunoKitProviderProps {
  children: ReactNode;
  config: LunoCoreConfig & { modalSize?: ModalSize };
  queryClientConfig?: QueryClientConfig;
  theme?: PartialLunokitTheme | LunokitThemeOverrides; // Support both complete themes and partial overrides
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
        <ThemeProvider theme={theme}>
          <ModalProvider>
            <div>{children}</div>
            <RenderModals modalSize={config.modalSize} />
          </ModalProvider>
        </ThemeProvider>
      </LunoProvider>
    </QueryClientProvider>
  );
};

const RenderModals: React.FC<{ modalSize?: ModalSize }> = ({
  modalSize,
}: {
  modalSize?: ModalSize;
}) => {
  return (
    <>
      <ConnectModal size={modalSize} />
      <AccountDetailsModal />
      <ChainModal />
    </>
  );
};
