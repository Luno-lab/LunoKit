import { formatAddress } from '@luno-kit/react/utils';
import type React from 'react';
import { useConnectButton, useWindowSize } from '../../hooks';
import { cs } from '../../utils';
import { Icon } from '../Icon';

export const transitionClassName =
  'transition-transform transition-[125] hover:scale-[1.03] transition-ease';

export interface ConnectButtonProps {
  className?: string;
  label?: string;
  accountStatus?: 'full' | 'address';
  chainStatus?: 'full' | 'icon' | 'name' | 'none';
  showBalance?: boolean;
  displayPreference?: 'address' | 'name';
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
          'cursor-pointer font-semibold inline-flex items-center justify-center focus:outline-none',
          'text-connectButtonText bg-connectButtonBackground shadow-button active:scale-[0.95]',
          'rounded-connectButton',
          transitionClassName,
          'px-3.5 text-base leading-base min-h-[40px]',
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
        'text-modalText flex items-stretch bg-transparent font-semibold text-base leading-base gap-3',
        className
      )}
    >
      {chainStatus !== 'none' && configuredChains.length > 0 && (
        <button
          type="button"
          onClick={() => openChainModal?.()}
          className={cs(
            'flex items-center rounded-currentNetworkButton cursor-pointer',
            'bg-currentNetworkButtonBackground shadow-button',
            'py-2 px-2.5 gap-1.5',
            transitionClassName
          )}
          aria-label="Switch chain"
        >
          {chainStatus === 'full' || chainStatus === 'icon' ? (
            <Icon
              iconUrl={chainIconUrl}
              resourceName={`${chainName}-chain`}
              className="w-[24px] h-[24px]"
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
          'flex items-center cursor-pointer rounded-connectButton bg-connectButtonBackground shadow-button',
          transitionClassName
        )}
        aria-label="Open account modal"
      >
        {configuredChains.length > 0 && showBalance && isLargeWindow && (
          <div className="p-2 pl-3">
            {balance ? (
              <span>
                {balance?.formattedTransferable || balance?.formattedTotal || 0}{' '}
                {currentChain?.nativeCurrency?.symbol || ''}
              </span>
            ) : (
              <span className="block animate-pulse rounded w-[80px] h-[20px] bg-accountActionItemBackgroundHover" />
            )}
          </div>
        )}

        <div
          className={cs(
            'flex items-center overflow-hidden bg-connectButtonInnerBackground border-2 border-connectButtonBackground rounded-connectButton gap-1.5 max-h-[40px]',
            configuredChains.length > 0 && showBalance && isLargeWindow
              ? 'bg-connectButtonInnerBackground py-1.5 px-2'
              : 'bg-connectButtonBackground py-2 px-2.5'
          )}
        >
          {accountStatus === 'full' && (
            <span className="w-[24px] h-[24px] flex items-center justify-center">
              <img src={activeConnector.icon} alt="luno" />
            </span>
          )}
          <span
            className={cs(
              displayPreference === 'name' && account?.name
                ? 'text-ellipsis overflow-hidden max-w-[115px] whitespace-nowrap'
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
