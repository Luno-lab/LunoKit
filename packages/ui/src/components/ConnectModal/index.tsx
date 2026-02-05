import { useConnect } from '@luno-kit/react';
import type { Connector, Optional } from '@luno-kit/react/types';
import { isMobileDevice } from '@luno-kit/react/utils';
import type React from 'react';
import { useEffect, useMemo, useState } from 'react';
import { Back, Close } from '../../assets/icons';
import { useWindowSize } from '../../hooks';
import { useAnimatedViews } from '../../hooks/useAnimatedViews';
import { type AppInfo, useConnectModal } from '../../providers';
import { cs } from '../../utils';
import { renderAppInfoText } from '../../utils/renderAppInfo';
import { Dialog, DialogClose, DialogTitle, type ModalContainer, type ModalSize } from '../Dialog';
import { ConnectOptions } from './ConnectOptions';
import { WalletView } from './WalletView';

export enum ConnectModalView {
  connectOptions = 'Connect Wallet',
  walletView = 'walletView',
}

export interface ConnectModalProps {
  size?: Optional<ModalSize>;
  appInfo?: Optional<Partial<AppInfo>>;
  container?: Optional<ModalContainer>;
  showInstalledGroup?: Optional<boolean>;
}

export const ConnectModal: React.FC<ConnectModalProps> = ({
  appInfo,
  container,
  showInstalledGroup = true,
  size = 'wide',
}) => {
  const { isOpen, close } = useConnectModal();
  const {
    connectAsync,
    reset: resetConnect,
    isPending: isConnecting,
    isError: connectError,
    error: connectErrorMsg,
  } = useConnect();
  const [selectedConnector, setSelectedConnector] = useState<Connector | null>(null);
  const [qrCode, setQrCode] = useState<string | undefined>();

  const { width: windowWidth } = useWindowSize();

  const isLargeWindow = windowWidth && windowWidth > 768;
  const isWide = !!(size === 'wide' && isLargeWindow);

  const { containerRef, currentViewRef, resetView, handleViewChange, currentView } =
    useAnimatedViews({ initialView: ConnectModalView.connectOptions });

  const onQrCode = async (connector: Connector) => {
    const uri = await connector.getConnectionUri();

    setQrCode(uri);
  };

  const handleConnect = async (connector: Connector) => {
    if (isMobileDevice() && connector.links.deepLink) {
      try {
        await connectAsync({ connectorId: connector.id });
        _onOpenChange(false);
        return;
      } catch (error) {
        window.location.href = `${connector.links.deepLink}?url=${window.location.href}`;
        return;
      }
    }

    !isWide && handleViewChange(ConnectModalView.walletView);
    setSelectedConnector(connector);
    setQrCode(undefined);
    if (connector.hasConnectionUri()) {
      onQrCode(connector);
    }
    await connectAsync({ connectorId: connector.id });
    _onOpenChange(false);
  };

  const _onOpenChange = (open: boolean) => {
    !open && close();
    resetConnect();
    resetView();
    setSelectedConnector(null);
    setQrCode(undefined);
  };

  const viewComponents = useMemo(() => {
    return {
      [ConnectModalView.connectOptions]: <ConnectOptions onConnect={handleConnect} showInstalledGroup={showInstalledGroup} />,
      [ConnectModalView.walletView]: (
        <WalletView
          connectState={{ isConnecting, isError: connectError, error: connectErrorMsg }}
          isWide={isWide}
          selectedConnector={selectedConnector}
          qrCode={qrCode}
          onConnect={handleConnect}
          appInfo={appInfo}
        />
      ),
    };
  }, [
    isWide,
    selectedConnector,
    qrCode,
    handleConnect,
    isConnecting,
    connectError,
    connectErrorMsg,
    appInfo,
    showInstalledGroup,
  ]);

  useEffect(() => {
    if (isWide && currentView === ConnectModalView.walletView) {
      handleViewChange(ConnectModalView.connectOptions);
    }
  }, [isWide, currentView]);

  return (
    <Dialog open={isOpen} onOpenChange={_onOpenChange} container={container}>
      <div
        className={cs(
          'luno:flex luno:items-stretch luno:justify-between luno:w-full luno:md:max-h-[504px] luno:md:max-w-[724px]'
        )}
      >
        <div
          className={cs(
            'luno:flex luno:flex-col luno:items-start luno:py-4 luno:px-5 luno:w-full luno:md:w-auto',
            isWide
              ? 'luno:md:min-w-[300px] luno:border-r-[1px] luno:border-r-solid luno:border-r-separatorLine'
              : 'luno:md:min-w-[360px]'
          )}
        >
          <div
            className={cs(
              'luno:flex luno:items-center luno:justify-between luno:w-full',
              !isWide && 'luno:pb-4'
            )}
          >
            {currentView === ConnectModalView.connectOptions ? (
              <>
                {!isWide && <div className={cs('luno:w-[30px] luno:h-[30px]')} aria-hidden />}
                <DialogTitle
                  className={cs(
                    'luno:text-lg luno:leading-lg luno:text-modalText luno:font-bold',
                    isWide ? 'luno:pb-6' : 'luno:flex-1 luno:text-center'
                  )}
                >
                  Connect Wallet
                </DialogTitle>
              </>
            ) : (
              <>
                <button
                  className={cs(
                    'luno:flex luno:items-center luno:justify-center luno:w-[30px] luno:h-[30px] luno:cursor-pointer luno:rounded-modalControlButton luno:border-none luno:hover:bg-modalControlButtonBackgroundHover luno:transition-colors luno:duration-200'
                  )}
                  onClick={() => handleViewChange(ConnectModalView.connectOptions)}
                  aria-label="Back"
                >
                  <Back />
                </button>
                <DialogTitle
                  className={cs(
                    'luno:text-lg luno:leading-lg luno:text-modalText luno:font-semibold luno:transition-opacity luno:duration-300'
                  )}
                >
                  {selectedConnector?.name}
                </DialogTitle>
              </>
            )}

            {!isWide && (
              <DialogClose
                className={
                  'luno:z-10 luno:w-[30px] luno:h-[30px] luno:flex luno:items-center luno:justify-center luno:cursor-pointer luno:rounded-modalControlButton luno:border-none luno:hover:bg-modalControlButtonBackgroundHover luno:transition-colors luno:duration-200'
                }
              >
                <Close />
              </DialogClose>
            )}
          </div>
          <div
            ref={containerRef}
            className={cs(
              'luno:relative luno:overflow-hidden luno:w-full',
              !isWide && 'luno:flex-1 luno:overflow-auto'
            )}
          >
            <div ref={currentViewRef}>{viewComponents[currentView]}</div>
          </div>

          {!isWide &&
            currentView === ConnectModalView.connectOptions &&
            renderAppInfoText(
              appInfo?.guideText,
              <p
                className={
                  'luno:cursor-pointer luno:w-full luno:pt-4 luno:text-sm luno:leading-sm luno:text-accentColor luno:font-medium luno:text-center luno:hover:text-modalText'
                }
                onClick={() =>
                  window.open(appInfo?.guideLink || 'https://polkadot.com/get-started/wallets/')
                }
              >
                New to wallets?
              </p>
            )}
        </div>

        {isWide && (
          <WalletView
            connectState={{ isConnecting, isError: connectError, error: connectErrorMsg }}
            isWide={isWide}
            selectedConnector={selectedConnector}
            qrCode={qrCode}
            onConnect={handleConnect}
            appInfo={appInfo}
          />
        )}
      </div>

      {!isWide &&
        currentView === ConnectModalView.connectOptions &&
        appInfo?.policyLinks?.terms &&
        appInfo?.policyLinks?.privacy && (
          <div
            className={
              'luno:w-full luno:border-t luno:border-t-separatorLine luno:flex luno:flex-col luno:items-center luno:gap-1 luno:p-3'
            }
          >
            <div
              className={
                'luno:text-modalTextSecondary luno:text-xs luno:leading-xs luno:font-regular luno:text-center'
              }
            >
              By connecting your wallet, you agree to our
            </div>
            <div
              className={
                'luno:text-xs luno:leading-xs luno:font-regular luno:text-center luno:text-modalTextSecondary'
              }
            >
              <a
                href={appInfo.policyLinks.terms}
                target={appInfo.policyLinks.target || '_blank'}
                rel="noreferrer noopener"
                className={'luno:text-accentColor luno:font-medium luno:hover:text-modalText'}
              >
                Terms of Service
              </a>
              <span className={'luno:px-1'}>&amp;</span>
              <a
                href={appInfo.policyLinks.privacy}
                target={appInfo.policyLinks.target || '_blank'}
                rel="noreferrer noopener"
                className={'luno:text-accentColor luno:font-medium luno:hover:text-modalText'}
              >
                Privacy Policy
              </a>
            </div>
          </div>
        )}
    </Dialog>
  );
};
