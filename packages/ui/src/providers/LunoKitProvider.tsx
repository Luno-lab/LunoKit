import React, { ReactNode, useState } from 'react';
import { LunoProvider } from '@luno-kit/react';
import type { Config as LunoCoreConfig } from '@luno-kit/react/types'
// @ts-ignore - @tanstack/react-query v5 API changes
import { QueryClient, QueryClientProvider, QueryClientConfig } from '@tanstack/react-query';
import { ModalProvider} from './ModalContext';
import { ThemeProvider } from '../theme';
import type { PartialLunokitTheme, LunokitThemeOverrides } from '../theme';
import { ConnectModal, AccountDetailsModal, ChainModal } from '../components'
import { ModalSize } from '../components/Dialog'

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
