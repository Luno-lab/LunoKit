import { useConnect } from '@luno-kit/react';
import type { Connector } from '@luno-kit/react/types';
import { isMobileDevice } from '@luno-kit/react/utils';
import type React from 'react';
import { useEffect, useMemo, useState } from 'react';
import { Back, Close } from '../../assets/icons';
import { useWindowSize } from '../../hooks';
import { useAnimatedViews } from '../../hooks/useAnimatedViews';
import { useConnectModal } from '../../providers';
import { cs } from '../../utils';
import { Dialog, DialogClose, DialogTitle, type ModalSize } from '../Dialog';
import { ConnectOptions } from './ConnectOptions';
import { WalletView } from './WalletView';

export enum ConnectModalView {
  connectOptions = 'Connect Wallet',
  walletView = 'walletView',
}

export interface ConnectModalProps {
  size?: ModalSize;
}

export const ConnectModal: React.FC<ConnectModalProps> = ({ size = 'wide' }) => {
  const { isOpen, close } = useConnectModal();
  const {
    connectAsync,
    reset: resetConnect,
    isPending: isConnecting,
    isError: connectError,
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
      [ConnectModalView.connectOptions]: <ConnectOptions onConnect={handleConnect} />,
      [ConnectModalView.walletView]: (
        <WalletView
          connectState={{ isConnecting, isError: connectError }}
          isWide={isWide}
          selectedConnector={selectedConnector}
          qrCode={qrCode}
          onConnect={handleConnect}
        />
      ),
    };
  }, [isWide, selectedConnector, qrCode, handleConnect, isConnecting, connectError]);

  useEffect(() => {
    if (isWide && currentView === ConnectModalView.walletView) {
      handleViewChange(ConnectModalView.connectOptions);
    }
  }, [isWide, currentView]);

  return (
    <Dialog open={isOpen} onOpenChange={_onOpenChange}>
      <div
        className={cs(
          'luno:flex items-stretch luno:justify-between luno:w-full luno:md:max-h-[504px] luno:md:max-w-[724px]'
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
              !isWide && 'pb-4'
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
                    'flex items-center justify-center w-[30px] h-[30px] cursor-pointer rounded-modalControlButton border-none hover:bg-modalControlButtonBackgroundHover transition-colors duration-200'
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
          <div ref={containerRef} className={cs('luno:relative luno:overflow-hidden luno:w-full')}>
            <div ref={currentViewRef}>{viewComponents[currentView]}</div>
          </div>

          {!isWide && currentView === ConnectModalView.connectOptions && (
            <p
              className={
                'luno:cursor-pointer luno:w-full luno:pt-4 luno:text-sm luno:leading-sm luno:text-accentColor luno:font-medium luno:text-center luno:hover:text-modalText'
              }
              onClick={() => window.open('https://polkadot.com/get-started/wallets/')}
            >
              New to wallets?
            </p>
          )}
        </div>

        {isWide && (
          <WalletView
            connectState={{ isConnecting, isError: connectError }}
            isWide={isWide}
            selectedConnector={selectedConnector}
            qrCode={qrCode}
            onConnect={handleConnect}
          />
        )}
      </div>
    </Dialog>
  );
};
