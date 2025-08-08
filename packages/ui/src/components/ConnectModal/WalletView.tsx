import React from 'react'
import { DialogClose } from '../Dialog'
import { Close, Loading } from '../../assets/icons'
import { QRCode } from '../QRCode'
import { cs } from '../../utils'
import { transitionClassName } from '../ConnectButton'
import { SpiralAnimation } from '../SpiralAnimation'
import type { Connector } from '@luno-kit/react'
import { useConnect } from '@luno-kit/react'
import {Copy} from '../Copy'

interface Props {
  selectedConnector: Connector | null
  onConnect: (connector: Connector) => Promise<void>
  qrCode?: string
  isWide: boolean
  connectState: {
    isConnecting: boolean
    isError: boolean
  }
}

export const WalletView = React.memo(({ selectedConnector, onConnect, qrCode, isWide, connectState }: Props) => {
  const showQRCode = selectedConnector?.hasConnectionUri();

  return (
    <div className={cs(
      'flex flex-col items-center',
      isWide ? 'w-[450px] p-4 min-h-[472px]' : 'justify-center w-full min-h-[400px]'
    )}>
      {isWide && (
        <div className={'w-full'}>
          <div className={'flex items-center justify-between'}>
            <div/>
            <DialogClose
              className={'z-10 w-[30px] h-[30px] flex items-center justify-center cursor-pointer rounded-modalControlButton border-none hover:bg-modalControlButtonBackgroundHover  transition-colors duration-200'}>
              <Close/>
            </DialogClose>
          </div>
        </div>
      )}

      <div className={cs(
        'flex items-center gap-4 flex-col grow justify-center',
        selectedConnector && showQRCode ? 'max-w-[300px]' : 'max-w-[360px]'
      )}>
        {selectedConnector ?
          showQRCode ? (
            <div className={'flex flex-col items-center gap-2.5'}>
              <QRCode size={300} logoBackground={selectedConnector.icon} uri={qrCode}/>
              <div className={'text-base leading-base font-medium text-center text-modalTextSecondary'}>
                Scan the QR code with {selectedConnector.id === 'nova' ? 'the Nova' : 'your phone'}
              </div>

                 <div className="min-h-[20px] flex items-center justify-center ">
                      {selectedConnector.links?.browserExtension
                ? (
                  <p
                    onClick={() => window.open(selectedConnector.links.browserExtension)}
                    className={'cursor-pointer text-sm text-accentColor font-medium text-center hover:text-modalText'}>
                    Don't have {selectedConnector.name}?
                  </p>
                )
                : qrCode
                  ? <Copy className={'text-sm leading-sm font-medium text-accentColor hover:text-modalText'} copyText={qrCode} label={'Copy Link'} />
                  : null}
          
              </div>
              
             
            </div>
          ) : (
            <>
              <div className={'w-[80px] h-[80px]'}>
                <img src={selectedConnector.icon} className={'w-full h-full'} alt=""/>
              </div>
              <p className={'text-lg leading-lg text-modalFont font-bold'}>
                Opening {selectedConnector.name}...
              </p>
              <p className={'pb-[10px] text-base text-modalTextSecondary leading-base font-medium text-center'}>
                Confirm connection in the extension
              </p>
              {connectState.isConnecting && (
                <Loading className={'w-[24px] h-[24px] text-secondaryFont animate-[spin_3s_linear_infinite]'}/>
              )}
              {!selectedConnector.isInstalled() && selectedConnector.links.browserExtension && (
                <p
                  onClick={() => window.open(selectedConnector.links.browserExtension)}
                  className={'cursor-pointer pt-6 text-sm text-accentColor font-medium text-center hover:text-modalText'}>
                  Don‘t have {selectedConnector.name}?
                </p>
              )}
              {!connectState.isConnecting && connectState.isError && selectedConnector.isInstalled() && (
                <button
                  className={cs(
                    'rounded-connectButton focus:outline-none py-[4px] px-[12px] cursor-pointer font-semibold text-sm text-modalText bg-connectButtonBackground shadow-connectButton active:scale-[0.95]',
                    transitionClassName
                  )}
                  onClick={() => onConnect(selectedConnector!)}>
                  Retry
                </button>
              )}
            </>
          ) : (
            <>
              <div className={'w-[160px] h-[160px] mb-4'}>
                <SpiralAnimation/>
              </div>
              <p 
                className={'cursor-pointer  text-base leading-base text-accentColor font-semibold text-center'}
                onClick={() => window.open('https://polkadot.com/get-started/wallets/')}>
                New to wallets?
              </p>
             
              <p className={'text-modalTextSecondary w-[250px] text-sm leading-sm font-medium text-center'}>
              Connect your wallet to sign in and start using your assets.
               </p>
             
              
            </>
          )}
      </div>

      <div/>
    </div>
  )
})
