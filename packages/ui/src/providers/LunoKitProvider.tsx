import React, { ReactNode, useState } from 'react';
import { LunoProvider } from '@luno/react';
import type { Config as LunoCoreConfig } from '@luno/core'
import { QueryClient, QueryClientProvider, type QueryClientConfig } from '@tanstack/react-query';
import { ModalProvider, useLunoModal } from './ModalContext';
import { ThemeProvider, ThemeMode } from './ThemeContext';

export interface LunoKitProviderProps {
  children: ReactNode;
  config: LunoCoreConfig;
  queryClientConfig?: QueryClientConfig;
  // theme?: ThemeMode | LunoTheme;
  theme?: ThemeMode;
}

const ModalRenderer: React.FC = () => {
  const { activeModal, closeModal } = useLunoModal();

  if (!activeModal) return null;

  return (
    <div style={{ position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', background: 'var(--luno-colors-background, white)', color: 'var(--luno-colors-text, black)', border: '1px solid black', padding: '20px', zIndex: 1000 }}>
      Modal Type: {activeModal} (Placeholder) <button onClick={closeModal}>Close</button>
      {/* TODO: Replace with actual modal components */}
      {/*todo*/}
    </div>
  );
};

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
            <ModalRenderer />
          </ModalProvider>
        </ThemeProvider>
      </LunoProvider>
    </QueryClientProvider>
  );
};
