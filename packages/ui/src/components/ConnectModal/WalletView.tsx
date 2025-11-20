import type { Connector } from '@luno-kit/react/types';
import React from 'react';
import { Close } from '../../assets/icons';
import type { AppInfo } from '../../providers';
import { cs } from '../../utils';
import { renderAppInfoContent } from '../../utils/renderAppInfo';
import { transitionClassName } from '../ConnectButton';
import { Copy } from '../Copy';
import { DialogClose } from '../Dialog';
import { QRCode } from '../QRCode';
import { SpiralAnimation } from '../SpiralAnimation';

interface Props {
  selectedConnector: Connector | null;
  onConnect: (connector: Connector) => Promise<void>;
  qrCode?: string;
  isWide: boolean;
  connectState: {
    isConnecting: boolean;
    isError: boolean;
  };
  appInfo?: Partial<AppInfo>;
}

export const WalletView = React.memo(
  ({ selectedConnector, onConnect, qrCode, isWide, connectState, appInfo }: Props) => {
    const showQRCode = selectedConnector?.hasConnectionUri();

    return (
      <div
        className={cs(
          'luno:flex luno:flex-col luno:items-center',
          isWide
            ? 'luno:w-[450px] luno:p-4 luno:min-h-[472px]'
            : 'luno:justify-center luno:w-full luno:min-h-[400px]'
        )}
      >
        {isWide && (
          <div className={'luno:w-full'}>
            <div className={'luno:flex luno:items-center luno:justify-between'}>
              <div />
              <DialogClose
                className={
                  'luno:z-10 luno:w-[30px] luno:h-[30px] luno:flex luno:items-center luno:justify-center luno:cursor-pointer luno:rounded-modalControlButton luno:border-none luno:hover:bg-modalControlButtonBackgroundHover luno:transition-colors luno:duration-200'
                }
              >
                <Close />
              </DialogClose>
            </div>
          </div>
        )}

        <div
          className={cs(
            'luno:flex luno:items-center luno:gap-4 luno:flex-col luno:grow luno:justify-center',
            selectedConnector && showQRCode ? 'luno:max-w-[300px]' : 'luno:max-w-[360px]',
            appInfo?.disclaimer && 'luno:pt-12'
          )}
        >
          {selectedConnector ? (
            showQRCode ? (
              <div className={'luno:flex luno:flex-col luno:items-center luno:gap-2.5'}>
                <QRCode size={300} logoBackground={selectedConnector.icon} uri={qrCode} />
                <div
                  className={
                    'luno:text-base luno:leading-base luno:font-medium luno:text-center luno:text-modalTextSecondary'
                  }
                >
                  Scan the QR code with{' '}
                  {selectedConnector.id === 'nova' ? 'the Nova' : 'your phone'}
                </div>

                <div className="luno:min-h-[20px] luno:flex luno:items-center luno:justify-center">
                  {selectedConnector.links?.browserExtension ? (
                    <div
                      onClick={() => window.open(selectedConnector.links.browserExtension)}
                      className={
                        'luno:cursor-pointer luno:text-sm luno:text-accentColor luno:font-medium luno:text-center luno:hover:text-modalText'
                      }
                    >
                      Don't have {selectedConnector.name}?
                    </div>
                  ) : qrCode ? (
                    <Copy
                      className={
                        'luno:text-sm luno:leading-sm luno:font-medium luno:text-accentColor'
                      }
                      copyText={qrCode}
                      label={'Copy Link'}
                    />
                  ) : null}
                </div>
              </div>
            ) : (
              <>
                <div className={'luno:w-[80px] luno:h-[80px]'}>
                  <img src={selectedConnector.icon} className={'luno:w-full luno:h-full'} alt="" />
                </div>
                <p className={'luno:text-lg luno:leading-lg luno:text-modalFont luno:font-bold'}>
                  Opening {selectedConnector.name}...
                </p>
                <p
                  className={
                    'luno:pb-[10px] luno:text-base luno:text-modalTextSecondary luno:leading-base luno:font-medium luno:text-center'
                  }
                >
                  Confirm connection in the extension
                </p>
                {connectState.isConnecting && (
                  <div className="luno-loading luno:text-modalText luno:w-[24px]"></div>
                )}
                {!selectedConnector.isInstalled() && selectedConnector.links.browserExtension && (
                  <div
                    onClick={() => window.open(selectedConnector.links.browserExtension)}
                    className={
                      'luno:cursor-pointer luno:pt-6 luno:text-sm luno:text-accentColor luno:font-medium luno:text-center luno:hover:text-modalText'
                    }
                  >
                    Don‘t have {selectedConnector.name}?
                  </div>
                )}
                {!connectState.isConnecting &&
                  connectState.isError &&
                  selectedConnector.isInstalled() && (
                    <button
                      className={cs(
                        'luno:rounded-connectButton luno:focus:outline-none luno:py-[4px] luno:px-[12px] luno:cursor-pointer luno:font-semibold luno:text-sm luno:text-modalText luno:bg-connectButtonBackground luno:shadow-connectButton luno:active:scale-[0.95]',
                        transitionClassName
                      )}
                      onClick={() => onConnect(selectedConnector!)}
                    >
                      Retry
                    </button>
                  )}
              </>
            )
          ) : (
            <>
              {renderAppInfoContent(
                appInfo?.decorativeImage,
                <div className={'luno:w-[160px] luno:h-[160px] luno:mb-4'}>
                  <SpiralAnimation />
                </div>
              )}
              {renderAppInfoContent(
                appInfo?.guideText,
                <div
                  className={
                    'luno:cursor-pointer luno:text-base luno:leading-base luno:text-accentColor luno:font-semibold luno:text-center'
                  }
                  onClick={() => window.open('https://polkadot.com/get-started/wallets/')}
                >
                  New to wallets?
                </div>
              )}
              {renderAppInfoContent(
                appInfo?.description,
                <p
                  className={
                    'luno:text-modalTextSecondary luno:w-[250px] luno:text-sm luno:leading-sm luno:font-medium luno:text-center'
                  }
                >
                  Connect your wallet to start exploring and interacting with DApps.
                </p>
              )}
              {appInfo?.disclaimer && (
                <div
                  className={
                    'luno:grow-1 luno:flex luno:items-end luno:text-modalTextSecondary luno:text-sm luno:leading-sm luno:font-medium luno:text-center'
                  }
                >
                  {appInfo?.disclaimer}
                </div>
              )}
            </>
          )}
        </div>

        <div />
      </div>
    );
  }
);
