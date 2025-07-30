import React, {useState} from 'react';
import { useConnect, useConnectors } from '@luno-kit/react';
import { Dialog, DialogClose, DialogTitle, ModalSize } from '../Dialog';
import { cs } from '../../utils';
import { useConnectModal } from '../../providers/ModalContext'
import type { Connector } from '@luno-kit/react'
import { Close, Loading } from '../../assets/icons'
import { SpiralAnimation } from '../SpiralAnimation'
import { transitionClassName } from '../ConnectButton'
import { QRCode } from '../QRCode'
import { useWindowSize } from '../../hooks'

export interface ConnectModalProps {
  size?: ModalSize;
}

export const ConnectModal: React.FC<ConnectModalProps> = ({
  size = 'wide',
}) => {
  const { isOpen, close } = useConnectModal();
  const connectors = useConnectors();
  const { connectAsync, isError: connectError, isPending: isConnecting, reset: resetConnect } = useConnect()
  const [selectedConnector, setSelectedConnector] = useState<Connector | null>(null)
  const [qrCode, setQrCode] = useState<string | undefined>()

  const showQRCode = selectedConnector?.hasConnectionUri();

  const { width: windowWidth } = useWindowSize()

  const isLargeWindow = windowWidth && windowWidth > 768;
  const isWide = size === 'wide' && isLargeWindow;

  const installedConnectors = connectors.filter(c => c.isInstalled())

  const moreConnectors = connectors.filter(c => !c.isInstalled())

  const onQrCode = async (connector: Connector) => {
    const uri = await connector.getConnectionUri()

    setQrCode(uri)
  }

  const handleConnect = async (connector: Connector) => {
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
    setSelectedConnector(null)
    setQrCode(undefined)
  }

  return (
    <Dialog open={isOpen} onOpenChange={_onOpenChange}>
      <div className={cs('flex items-stretch justify-between w-full md:max-h-[504px] md:max-w-[724px]')}>
        <div className={cs(
          'flex flex-col items-start py-4 px-5 md:min-w-[360px] w-full md:w-auto',
          isWide && 'border-r-[1px] border-r-solid border-r-separatorLine'
          )}>
          <div className={cs('flex items-center justify-between w-full', !isWide && 'pb-4')}>
            <DialogTitle className={cs('text-lg leading-lg text-modalText font-bold', isWide && 'pb-6')}>
              Connect Wallet
            </DialogTitle>
            {!isWide && (
              <DialogClose className={'z-10 w-[30px] h-[30px] flex items-center justify-center cursor-pointer rounded-modalControlButton border-none hover:bg-modalControlButtonBackgroundHover  transition-colors duration-200'}>
                <Close/>
              </DialogClose>
            )}
          </div>

          <div className={'flex flex-col items-start gap-4 w-full'}>
            <div className={'flex flex-col items-start gap-3 w-full'}>
              <div className={'text-base text-modalText font-semibold leading-base'}>Installed</div>
              <div className={'flex flex-col items-start gap-1.5 w-full'}>
                {installedConnectors.map(i => (
                  <ConnectorItem key={i.id} connector={i} onConnect={() => handleConnect(i)}/>
                ))}
              </div>
            </div>

            {moreConnectors.length > 0 && (
              <div className={'flex flex-col items-start gap-3 w-full'}>
                <div className={'text-base text-modalText font-semibold leading-base'}>More</div>
                <div className={'flex flex-col items-start gap-1 w-full'}>
                  {moreConnectors.map(i => (
                    <ConnectorItem key={i.id} connector={i} onConnect={() => handleConnect(i)}/>
                  ))}
                </div>
              </div>
            )}
          </div>

        </div>

        {isWide && (
          <div className={'flex flex-col items-center p-4 min-h-[472px] w-[400px]'}>
            <div className={'w-full'}>
              <div className={'flex items-center justify-between'}>
                <div/>
                <DialogClose className={'z-10 w-[30px] h-[30px] flex items-center justify-center cursor-pointer rounded-modalControlButton border-none hover:bg-modalControlButtonBackgroundHover  transition-colors duration-200'}>
                  <Close />
                </DialogClose>
              </div>
            </div>


            <div className={'flex items-center flex-col max-w-[312px] grow justify-center'}>
              {selectedConnector ?
                showQRCode ? <QRCode logoBackground={selectedConnector.icon} uri={qrCode}/> : (
                  <>
                    <div className={'w-[102px] h-[102px] pb-[8px]'}>
                      <img src={selectedConnector.icon} className={'w-full h-full'} alt=""/>
                    </div>
                    <p className={'pb-[10px] text-primary leading-primary text-modalFont font-[600]'}>
                      Opening {selectedConnector.name}...
                    </p>
                    <p className={'pb-[10px] text-secondaryFont text-secondary leading-secondary font-[500]'}>
                      Confirm connection in the extension
                    </p>
                    {isConnecting && (
                      <Loading className={'w-[24px] h-[24px] text-secondaryFont animate-[spin_3s_linear_infinite]'}/>
                    )}
                    { !isConnecting && connectError && (
                      <button
                        className={cs(
                          'rounded-connectButton focus:outline-none py-[4px] px-[12px] cursor-pointer font-[600] text-primaryFont bg-connectButtonBackground shadow-connectButton active:scale-[0.95]',
                          transitionClassName
                        )}
                        onClick={() => handleConnect(selectedConnector)}>
                        Retry
                      </button>
                    )}
                  </>
                ) : (
                <>
                  <div className={'w-[160px] h-[160px] mb-4'}>
                    <SpiralAnimation />
                  </div>

                  <p className={'cursor-pointer pb-[16px] text-base leading-base text-accentColor font-bold text-center'}>
                    New to wallets?
                  </p>
                  <p className={'text-modalTextSecondary text-sm leading-sm font-medium text-center'}>
                    Your gateway to the decentralized world Connect a wallet to get started
                  </p>
                </>
              )}
            </div>

            <div/>
          </div>
        )}
      </div>
    </Dialog>
  );
};

interface ConnectorItemProps {
  connector: Connector;
  onConnect: () => void;
}

const ConnectorItem: React.FC<ConnectorItemProps> = React.memo(({ connector, onConnect }) => {
  return (
    <button
      onClick={onConnect}
      className={cs(
        'cursor-pointer bg-walletSelectItemBackground p-2 w-full flex items-center gap-3 rounded-walletSelectItem border-none',
        'hover:bg-walletSelectItemBackgroundHover transition-transform active:scale-[0.95]',
        'text-left'
      )}
    >
      <div className={'w-[24px] h-[24px]'}>
        <img
          src={connector.icon}
          alt={connector.name}
          className="w-full h-full"
        />
      </div>

      <span className="font-semibold leading-base text-base text-modalText">{connector.name}</span>
    </button>
  );
});
