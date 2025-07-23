import React, {useState} from 'react';
import { useConnect, useConnectors } from '@luno-kit/react';
import { Dialog, DialogClose, DialogTitle, ModalSize } from '../Dialog';
import { cs } from '../../utils';
import { useConnectModal } from '../../providers/ModalContext'
import type { Connector } from '@luno-kit/react'
import { Close, Loading } from '../../assets/icons'
import { SpiralAnimation } from '../SpiralAnimation'
import { transitionClassName } from '../ConnectButton'

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

  const isWide = size === 'wide';

  const installedConnectors = connectors.filter(c => c.isInstalled())

  const moreConnectors = connectors.filter(c => !c.isInstalled())

  const handleConnect = async (connector: Connector) => {
    setSelectedConnector(connector)
    await connectAsync({ connectorId: connector.id })
    _onOpenChange(false)
  }

  const _onOpenChange = (open: boolean) => {
    !open && close()
    resetConnect()
    setSelectedConnector(null)
  }

  return (
    <Dialog open={isOpen} onOpenChange={_onOpenChange}>
      <div className={cs('flex items-stretch justify-between max-h-[504px] max-w-[724px]')}>
        <div className={cs(
          'flex flex-col items-start py-4 px-5 min-w-[287px]',
          isWide && 'border-r-[1px] border-r-solid border-r-separatorLine'
          )}>
          <div className={'flex items-center justify-between'}>
            <DialogTitle className="text-lg leading-lg text-modalText font-bold pb-6">
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
              {selectedConnector ? (
                <>
                  <div className={'w-[102px] h-[102px] pb-2'}>
                    <img src={selectedConnector.icon} className={'w-full h-full'} alt=""/>
                  </div>
                  <p className={'pb-2.5 text-base leading-base text-modalText font-semibold'}>
                    Opening {selectedConnector.name}...
                  </p>
                  <p className={'pb-2.5 text-secondaryFont text-sm leading-sm font-medium'}>
                    Confirm connection in the extension
                  </p>
                  {isConnecting && (
                    <Loading className={'w-[24px] h-[24px] text-secondaryFont animate-[spin_3s_linear_infinite]'}/>
                  )}
                  { !isConnecting && connectError && (
                    <button
                      className={cs(
                        'rounded-sm focus:outline-none py-1 px-3 cursor-pointer font-semibold text-primaryFont bg-connectButtonBackground shadow-connectButton active:scale-[0.95]',
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
        'cursor-pointer bg-walletSelectItemBackground p-2 w-full flex items-center gap-3 rounded-sm border-none',
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
