import type { Connector } from '@luno-kit/react/types';
import React, { useMemo } from 'react';
import { Close } from '../../assets/icons';
import type { AppInfo } from '../../providers';
import { useLunoTheme } from '../../theme';
import { cs } from '../../utils';
import { renderAppInfoText } from '../../utils/renderAppInfo';
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
    error: Error | null;
  };
  appInfo?: Partial<AppInfo>;
}

export const WalletView = React.memo(
  ({ selectedConnector, onConnect, qrCode, isWide, connectState, appInfo }: Props) => {
    const { themeMode } = useLunoTheme();

    const decorativeImage = useMemo(() => {
      if (!appInfo?.decorativeImage) return undefined;
      const { light, dark } = appInfo.decorativeImage;
      const url = themeMode === 'dark' ? dark || light : light;
      return { url };
    }, [appInfo?.decorativeImage, themeMode]);

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
            selectedConnector && showQRCode ? 'luno:max-w-[300px]' : 'luno:max-w-[360px]'
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
                  {selectedConnector.id === 'ledger'
                    ? connectState.error?.message
                    : 'Confirm connection in the extension'}
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
                    Don't have {selectedConnector.name}?
                  </div>
                )}
                {!connectState.isConnecting &&
                  connectState.isError &&
                   (selectedConnector?.isInstalled() || selectedConnector?.id === 'ledger') && (
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
            <div
              className={
                'luno:relative luno:flex luno:flex-col luno:items-center luno:w-full luno:grow luno:gap-4 luno:pt-[60px]'
              }
            >
              {decorativeImage?.url ? (
                <div className={'luno:w-[160px] luno:h-[160px]'}>
                  <img
                    src={decorativeImage.url}
                    alt="Luno Kit"
                    className={'luno:w-full luno:h-full luno:object-contain'}
                  />
                </div>
              ) : (
                <div className={'luno:w-[160px] luno:h-[160px]'}>
                  <SpiralAnimation />
                </div>
              )}

              {renderAppInfoText(
                appInfo?.guideText,
                <div
                  className={
                    'luno:cursor-pointer luno:text-base luno:leading-base luno:text-accentColor luno:font-semibold luno:text-center luno:hover:text-modalText'
                  }
                  onClick={() =>
                    window.open(appInfo?.guideLink || 'https://polkadot.com/get-started/wallets/')
                  }
                >
                  New to wallets?
                </div>
              )}
              {renderAppInfoText(
                appInfo?.description,
                <p
                  className={
                    'luno:text-modalTextSecondary luno:w-[250px] luno:text-sm luno:leading-sm luno:font-medium luno:text-center'
                  }
                >
                  Connect your wallet to start exploring and interacting with DApps.
                </p>
              )}

              {isWide && appInfo?.policyLinks?.terms && appInfo?.policyLinks?.privacy && (
                <div
                  className={
                    'luno:absolute luno:bottom-0 luno:left-0 luno:right-0 luno:text-modalTextSecondary luno:text-xs luno:leading-xs luno:font-regular luno:text-center'
                  }
                >
                  <span>By connecting your wallet, you agree to our </span>
                  <a
                    href={appInfo.policyLinks.terms}
                    target={appInfo.policyLinks.target || '_blank'}
                    rel="noreferrer noopener"
                    className={'luno:text-accentColor luno:font-regular luno:hover:text-modalText'}
                  >
                    Terms of Service
                  </a>
                  <span> &amp; </span>
                  <a
                    href={appInfo.policyLinks.privacy}
                    target={appInfo.policyLinks.target || '_blank'}
                    rel="noreferrer noopener"
                    className={'luno:text-accentColor luno:font-medium luno:hover:text-modalText'}
                  >
                    Privacy Policy
                  </a>
                </div>
              )}
            </div>
          )}
        </div>

        <div />
      </div>
    );
  }
);
