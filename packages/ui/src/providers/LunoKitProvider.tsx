import React, { ReactNode, useState } from 'react';
import { LunoProvider } from '@luno/react';
import type { Config as LunoCoreConfig } from '@luno/core'
import { QueryClient, QueryClientProvider, type QueryClientConfig } from '@tanstack/react-query';
import { ModalProvider } from './ModalContext';
import { ThemeProvider, ThemeMode } from './ThemeContext';
import { ConnectModal, AccountDetailsModal, ChainModal } from '../components'
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
        <ThemeProvider initialThemeMode={theme}>
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
  return (
    <>
      <ConnectModal size={modalSize} />
      <AccountDetailsModal />
      <ChainModal />
    </>
  );
}
