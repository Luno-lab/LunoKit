import { LunoProvider } from '@luno-kit/react';
import type { Config as LunoCoreConfig, Optional } from '@luno-kit/react/types';
import type React from 'react';
import type { ReactNode } from 'react';
import { AccountDetailsModal, ChainModal, ConnectModal } from '../components';
import type { ModalContainer, ModalSize } from '../components/Dialog';
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
  config: LunoCoreConfig & {
    modalSize?: Optional<ModalSize>;
    modalContainer?: Optional<ModalContainer>;
    showInstalledGroup?: boolean;
  };
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
          <RenderModals
            appInfo={appInfo}
            modalSize={config.modalSize}
            modalContainer={config.modalContainer}
            showInstalledGroup={config.showInstalledGroup}
          />
        </ModalProvider>
      </ThemeProvider>
    </LunoProvider>
  );
};

interface RenderModalsProps {
  modalSize?: Optional<ModalSize>;
  appInfo?: Optional<Partial<AppInfo>>;
  modalContainer?: Optional<ModalContainer>;
  showInstalledGroup?: Optional<boolean>;
}

const RenderModals: React.FC<RenderModalsProps> = ({
  modalSize,
  appInfo,
  modalContainer,
  showInstalledGroup,
}: RenderModalsProps) => {
  return (
    <>
      <ConnectModal
        showInstalledGroup={showInstalledGroup}
        size={modalSize}
        appInfo={appInfo}
        container={modalContainer}
      />
      <AccountDetailsModal container={modalContainer} />
      <ChainModal container={modalContainer} />
    </>
  );
};
