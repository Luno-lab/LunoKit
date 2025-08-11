import React, {useEffect, useMemo, useState} from 'react';
import { useConnect, isMobileDevice } from '@luno-kit/react';
import { Dialog, DialogClose, DialogTitle, ModalSize } from '../Dialog';
import { cs } from '../../utils';
import { useConnectModal } from '../../providers/ModalContext'
import type { Connector } from '@luno-kit/react'
import { Back, Close } from '../../assets/icons'
import { useWindowSize } from '../../hooks'
import { WalletView } from './WalletView'
import { useAnimatedViews } from '../../hooks/useAnimatedViews'
import { ConnectOptions } from './ConnectOptions'

export enum ConnectModalView {
  connectOptions = 'Connect Wallet',
  walletView = 'walletView',
}

export interface ConnectModalProps {
  size?: ModalSize;
}

export const ConnectModal: React.FC<ConnectModalProps> = ({
  size = 'wide',
}) => {
  const { isOpen, close } = useConnectModal();
  const { connectAsync, reset: resetConnect, isPending: isConnecting, isError: connectError } = useConnect()
  const [selectedConnector, setSelectedConnector] = useState<Connector | null>(null)
  const [qrCode, setQrCode] = useState<string | undefined>()

  const { width: windowWidth } = useWindowSize()

  const isLargeWindow = windowWidth && windowWidth > 768;
  const isWide = !!(size === 'wide' && isLargeWindow);

  const {
    containerRef,
    currentViewRef,
    resetView,
    handleViewChange,
    currentView,
  } = useAnimatedViews({ initialView: ConnectModalView.connectOptions })

  const onQrCode = async (connector: Connector) => {
    const uri = await connector.getConnectionUri()

    setQrCode(uri)
  }

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

    !isWide && handleViewChange(ConnectModalView.walletView)
    setSelectedConnector(connector)
    setQrCode(undefined)
    if (connector.hasConnectionUri()) {
      onQrCode(connector)
    }
    await connectAsync({ connectorId: connector.id })
    _onOpenChange(false)
  }

  const _onOpenChange = (open: boolean) => {
    !open && close()
    resetConnect()
    resetView()
    setSelectedConnector(null)
    setQrCode(undefined)
  }

  const viewComponents = useMemo(() => {
    return {
      [ConnectModalView.connectOptions]: <ConnectOptions onConnect={handleConnect} />,
      [ConnectModalView.walletView]: (
        <WalletView
          connectState={{ isConnecting, isError: connectError }}
          isWide={isWide}
          selectedConnector={selectedConnector}
          qrCode={qrCode}
          onConnect={handleConnect} />
      ),
    }
  }, [isWide, selectedConnector, qrCode, handleConnect, isConnecting, connectError])

  useEffect(() => {
    if (isWide && currentView === ConnectModalView.walletView) {
      handleViewChange(ConnectModalView.connectOptions);
    }
  }, [isWide, currentView]);

  return (
    <Dialog open={isOpen} onOpenChange={_onOpenChange}>
      <div className={cs('flex items-stretch justify-between w-full md:max-h-[504px] md:max-w-[724px]')}>
        <div className={cs(
          'flex flex-col items-start py-4 px-5 w-full md:w-auto',
          isWide ? 'md:min-w-[300px] border-r-[1px] border-r-solid border-r-separatorLine' : 'md:min-w-[360px]'
        )}>
          <div className={cs('flex items-center justify-between w-full', !isWide && 'pb-4')}>
            {currentView === ConnectModalView.connectOptions ? (
              <>
                {!isWide && <div className="w-[30px] h-[30px]" aria-hidden />}
                <DialogTitle className={cs('text-lg leading-lg text-modalText font-bold', isWide ? 'pb-6' : 'flex-1 text-center')}>
                  Connect Wallet
                </DialogTitle>
              </>
            ) : (
              <>
                <button
                  className="flex items-center justify-center w-[30px] h-[30px] cursor-pointer rounded-modalControlButton border-none hover:bg-modalControlButtonBackgroundHover  transition-colors duration-200"
                  onClick={() => handleViewChange(ConnectModalView.connectOptions)}
                  aria-label="Back"
                >
                  <Back  />
                </button>
                <DialogTitle
                  className={cs(
                    'text-lg leading-lg text-modalText font-semibold transition-opacity duration-300',
                  )}>
                  {selectedConnector?.name}
                </DialogTitle>
              </>
            )}

            {!isWide && (
              <DialogClose
                className={'z-10 w-[30px] h-[30px] flex items-center justify-center cursor-pointer rounded-modalControlButton border-none hover:bg-modalControlButtonBackgroundHover  transition-colors duration-200'}>
                <Close/>
              </DialogClose>
            )}
          </div>
          <div
            ref={containerRef}
            className="relative overflow-hidden w-full">
            <div ref={currentViewRef}>
              {viewComponents[currentView]}
            </div>
          </div>

          {!isWide && currentView === ConnectModalView.connectOptions && (
            <>
               <p 
                className={'cursor-pointer w-full pt-4 text-sm leading-sm text-accentColor font-medium text-center hover:text-modalText'}
                onClick={() => window.open('https://polkadot.com/get-started/wallets/')}>
                New to wallets?
              </p>
            </>
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
