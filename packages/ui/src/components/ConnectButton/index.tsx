import React from 'react';
import { useLunoWallet } from '../../hooks';
import { cs } from '../../utils';
import {ChainIcon} from '../ChainIcon'

const sizes: Record<'sm' | 'md' | 'lg', Record<string, string>> = {
  sm: {
    button: 'px-2.5 text-xs leading-xs min-h-[36px]',
    connected: 'text-xs leading-xs gap-2.5',
    icon: 'w-[20px] h-[20px]',
    chain: 'py-1.5 px-6 gap-1',
    account: 'py-1 px-2.5 gap-1',
    balance: 'p-1.5 pl-2.5',
  },
  md: {
    button: 'px-3.5 text-base leading-base min-h-[40px]',
    connected: 'text-base leading-base gap-3',
    icon: 'w-[24px] h-[24px]',
    chain: 'py-2 px-2.5 gap-1.5',
    account: 'py-1.5 px-2 gap-1.5',
    balance: 'p-2 pl-3',
  },
  lg: {
    button: 'px-4.5 text-lg leading-lg min-h-[46px]' ,
    connected: 'text-lg leading-lg gap-3.5',
    icon: 'w-[28px] h-[28px]',
    chain: 'py-2.5 px-3 gap-2',
    account: 'py-2 px-2.5 gap-2',
    balance: 'p-2.5 pl-3.5',
  },
};

export const transitionClassName = 'transition-transform transition-[125] hover:scale-[1.03] transition-ease'

export interface ConnectButtonProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  label?: string;
  accountStatus?: 'full' | 'address';
  chainStatus?: 'full' | 'icon' | 'name' | 'none';
  showBalance?: boolean;
}

export const ConnectButton: React.FC<ConnectButtonProps> = ({
  size = 'md',
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
          sizes[size].button,
          className
        )}
      >
        {label}
      </button>
    );
  }

  const sizeConfig = sizes[size];

  return (
    <div className={cs('text-modalText flex items-center bg-transparent font-semibold', sizeConfig.connected, className)}>
      {chainStatus !== 'none' && (
        <button
          type="button"
          onClick={() => openChainModal?.()}
          className={cs(
            'flex items-center rounded-currentNetworkButton cursor-pointer',
            'bg-currentNetworkButtonBackground shadow-button',
            sizeConfig.chain,
            transitionClassName,
          )}
          aria-label="Switch chain"
        >
          {(chainStatus === 'full' || chainStatus === 'icon')
            ? <ChainIcon chainIconUrl={chainIconUrl} chainName={chainName} className={sizeConfig.icon}/>
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
          <div className={sizeConfig.balance}>
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
          sizeConfig.account,
        )}>
          {accountStatus === 'full' && (
            <span className={cs(sizeConfig.icon)}>
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
