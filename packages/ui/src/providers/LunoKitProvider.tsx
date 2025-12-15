import { LunoProvider } from '@luno-kit/react';
import type { Config as LunoCoreConfig, Optional } from '@luno-kit/react/types';
import type React from 'react';
import type { ReactNode } from 'react';
import { AccountDetailsModal, ChainModal, ConnectModal } from '../components';
import type { ModalSize } from '../components/Dialog';
import type { LunokitThemeOverrides, PartialLunokitTheme } from '../theme';
import { ThemeProvider } from '../theme';
import { ModalProvider } from './ModalContext';

export interface DecorativeImage {
  light: string;
  dark?: Optional<string>;
}

export interface PolicyLinks {
  terms: string;
  privacy: string;
  target?: Optional<'_blank' | '_self'>;
}

export interface AppInfo {
  decorativeImage?: Optional<DecorativeImage>;
  guideText?: Optional<string>;
  guideLink?: Optional<string>;
  description?: Optional<string>;
  policyLinks?: Optional<PolicyLinks>;
}

export interface LunoKitProviderProps {
  children: ReactNode;
  config: LunoCoreConfig & { modalSize?: Optional<ModalSize> };
  theme?: Optional<PartialLunokitTheme | LunokitThemeOverrides>;
  appInfo?: Optional<Partial<AppInfo>>;
}

export const LunoKitProvider: React.FC<LunoKitProviderProps> = ({
  children,
  config,
  theme,
  appInfo,
}) => {
  return (
    <LunoProvider config={config}>
      <ThemeProvider theme={theme}>
        <ModalProvider>
          <div>{children}</div>
          <RenderModals appInfo={appInfo} modalSize={config.modalSize} />
        </ModalProvider>
      </ThemeProvider>
    </LunoProvider>
  );
};

interface RenderModalsProps {
  modalSize?: Optional<ModalSize>;
  appInfo?: Optional<Partial<AppInfo>>;
}

const RenderModals: React.FC<RenderModalsProps> = ({ modalSize, appInfo }: RenderModalsProps) => {
  return (
    <>
      <ConnectModal size={modalSize} appInfo={appInfo} />
      <AccountDetailsModal />
      <ChainModal />
    </>
  );
};
