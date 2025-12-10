import { formatAddress } from '@luno-kit/react/utils';
import type { Optional } from '@luno-kit/react/types';
import type React from 'react';
import { useConnectButton, useWindowSize } from '../../hooks';
import { cs } from '../../utils';
import { Icon } from '../Icon';

export const transitionClassName =
  'luno:transition-transform luno:transition-[125] luno:hover:scale-[1.03] luno:transition-ease';

export interface ConnectButtonProps {
  className?: Optional<string>;
  label?: Optional<string>;
  accountStatus?: Optional<'full' | 'address'>;
  chainStatus?: Optional<'full' | 'icon' | 'name' | 'none'>;
  showBalance?: Optional<boolean>;
  displayPreference?: Optional<'address' | 'name'>;
}

export const ConnectButton: React.FC<ConnectButtonProps> = ({
  className,
  label = 'Connect Wallet',
  accountStatus = 'full',
  chainStatus = 'full',
  showBalance = true,
  displayPreference = 'address',
}) => {
  const {
    isConnected,
    isDisconnected,
    account,
    balance,
    openConnectModal,
    openAccountModal,
    openChainModal,
    chainIconUrl,
    chainName,
    currentChain,
    configuredChains,
    activeConnector,
  } = useConnectButton();
  const { width: windowWidth } = useWindowSize();

  const isLargeWindow = windowWidth && windowWidth > 768;

  if (isDisconnected || !isConnected || !activeConnector) {
    return (
      <button
        type="button"
        onClick={() => openConnectModal?.()}
        className={cs(
          'luno-kit luno:cursor-pointer luno:font-semibold luno:inline-flex luno:items-center luno:justify-center luno:focus:outline-none',
          'luno:text-connectButtonText luno:bg-connectButtonBackground luno:shadow-button luno:active:scale-[0.95]',
          'luno:rounded-connectButton',
          transitionClassName,
          'luno:px-3.5 luno:text-base luno:leading-base luno:min-h-[40px]',
          className
        )}
      >
        {label}
      </button>
    );
  }

  return (
    <div
      className={cs(
        'luno-kit luno:text-modalText luno:flex luno:items-stretch luno:bg-transparent luno:font-semibold luno:text-base luno:leading-base luno:gap-3',
        className
      )}
    >
      {chainStatus !== 'none' && configuredChains.length > 0 && (
        <button
          type="button"
          onClick={() => openChainModal?.()}
          className={cs(
            'luno:flex luno:items-center luno:rounded-currentNetworkButton luno:cursor-pointer',
            'luno:bg-currentNetworkButtonBackground luno:shadow-button',
            'luno:py-2 luno:px-2.5 luno:gap-1.5',
            transitionClassName
          )}
          aria-label="Switch chain"
        >
          {chainStatus === 'full' || chainStatus === 'icon' ? (
            <Icon
              iconUrl={chainIconUrl}
              resourceName={`${chainName}-chain`}
              className={cs('luno:w-[24px] luno:h-[24px]')}
            />
          ) : null}
          {(chainStatus === 'full' || chainStatus === 'name') && isLargeWindow && (
            <span>{currentChain?.name || 'Unknown Chain'}</span>
          )}
        </button>
      )}

      <button
        type="button"
        onClick={() => openAccountModal?.()}
        className={cs(
          'luno:flex luno:items-center luno:cursor-pointer luno:rounded-connectButton luno:bg-connectButtonBackground luno:shadow-button',
          transitionClassName
        )}
        aria-label="Open account modal"
      >
        {configuredChains.length > 0 && showBalance && isLargeWindow && (
          <div className={cs('luno:p-2 luno:pl-3')}>
            {balance ? (
              <span>
                {balance?.formattedTransferable || balance?.formattedTotal || 0}{' '}
                {currentChain?.nativeCurrency?.symbol || ''}
              </span>
            ) : (
              <span
                className={cs(
                  'luno:block luno:animate-pulse luno:rounded luno:w-[80px] luno:h-[20px] luno:bg-accountActionItemBackgroundHover'
                )}
              />
            )}
          </div>
        )}

        <div
          className={cs(
            'luno:flex luno:items-center luno:overflow-hidden luno:bg-connectButtonInnerBackground luno:border-2 luno:border-connectButtonBackground luno:rounded-connectButton luno:gap-1.5 luno:max-h-[40px]',
            configuredChains.length > 0 && showBalance && isLargeWindow
              ? 'luno:bg-connectButtonInnerBackground luno:py-1.5 luno:px-2'
              : 'luno:bg-connectButtonBackground luno:py-2 luno:px-2.5'
          )}
        >
          {accountStatus === 'full' && (
            <span
              className={cs(
                'luno:w-[24px] luno:h-[24px] luno:flex luno:items-center luno:justify-center'
              )}
            >
              <img src={activeConnector.icon} alt="luno account" />
            </span>
          )}
          <span
            className={cs(
              displayPreference === 'name' && account?.name
                ? 'luno:text-ellipsis luno:overflow-hidden luno:max-w-[115px] luno:whitespace-nowrap'
                : ''
            )}
          >
            {displayPreference === 'name' && account?.name
              ? account?.name
              : formatAddress(account?.address)}
          </span>
        </div>
      </button>
    </div>
  );
};
