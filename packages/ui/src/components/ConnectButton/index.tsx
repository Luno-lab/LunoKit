import React from 'react';
import { useLunoWallet } from '../../hooks';
import { cs } from '../../utils';
import {ChainIcon} from '../ChainIcon'


export const transitionClassName = 'transition-transform transition-[125] hover:scale-[1.03] transition-ease'

export interface ConnectButtonProps {
  className?: string;
  label?: string;
  accountStatus?: 'full' | 'address';
  chainStatus?: 'full' | 'icon' | 'name' | 'none';
  showBalance?: boolean;
}

export const ConnectButton: React.FC<ConnectButtonProps> = ({
  className,
  label = 'Connect Wallet',
  accountStatus = 'full',
  chainStatus = 'full',
  showBalance = true,
}) => {
  const {
    isConnected,
    isDisconnected,
    displayAddress,
    balance,
    openConnectModal,
    openAccountModal,
    openChainModal,
    chainIconUrl,
    chainName,
    currentChain,
    activeConnector,
  } = useLunoWallet();

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
    <div className={cs('text-modalText flex items-center bg-transparent font-semibold text-base leading-base gap-3', className)}>
      {chainStatus !== 'none' && (
        <button
          type="button"
          onClick={() => openChainModal?.()}
          className={cs(
            'flex items-center rounded-currentNetworkButton cursor-pointer',
            'bg-currentNetworkButtonBackground shadow-button',
            'py-2 px-2.5 gap-1.5',
            transitionClassName,
          )}
          aria-label="Switch chain"
        >
          {(chainStatus === 'full' || chainStatus === 'icon')
            ? <ChainIcon chainIconUrl={chainIconUrl} chainName={chainName} className="w-[24px] h-[24px]"/>
            : null}
          {(chainStatus === 'full' || chainStatus === 'name') && (
            <span>{currentChain?.name || 'Unknown Chain'}</span>
          )}
        </button>
      )}

      <button
        type="button"
        onClick={() => openAccountModal?.()}
        className={cs(
          'flex items-center cursor-pointer rounded-connectButton py-1px bg-connectButtonBackground shadow-button',
          transitionClassName,
        )}
        aria-label="Open account modal"
      >

        {showBalance && (
          <div className="p-2 pl-3">
            {balance === undefined ? (
              <div className="animate-pulse rounded w-[80px] h-[20px] bg-accountActionItemBackgroundHover" />
            ) : (
              <span className="">
                {balance?.formattedTransferable || balance?.formattedTotal || 0}
                {'  '}{currentChain?.nativeCurrency?.symbol || ''}
              </span>
            )}
          </div>
        )}

        <div className={cs(
          "flex items-center bg-connectButtonInnerBackground border-2 border-connectButtonBackground rounded-connectButton",
          'py-1.5 px-2 gap-1.5',
        )}>
          {accountStatus === 'full' && (
            <span className="w-[24px] h-[24px]">
              <img src={activeConnector.icon} alt="luno" />
            </span>
          )}
          <span
            aria-label="Wallet icon placeholder"
            className={''}>{displayAddress}</span>
        </div>
      </button>
    </div>
  );
};
