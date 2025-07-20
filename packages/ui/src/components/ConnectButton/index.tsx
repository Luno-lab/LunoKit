import React from 'react';
import { useLunoWallet } from '../../hooks';
import { cs } from '../../utils';
import {ChainIcon} from '../ChainIcon'

const sizes: Record<'sm' | 'md' | 'lg', Record<string, string>> = {
  sm: {
    button: 'px-2.5 text-sm leading-sm min-h-[36px]',
    connected: 'text-sm leading-sm gap-[10px]',
    icon: 'w-[20px] h-[20px]',
    chain: 'py-[6px] px-6 gap-[4px]',
    account: 'py-[4px] px-2.5 gap-[4px]',
    balance: 'p-[6px] pl-[10px]',
  },
  md: {
    button: 'px-3.5 text-primary leading-primary min-h-[40px]',
    connected: 'text-primary leading-primary gap-[12px]',
    icon: 'w-[24px] h-[24px]',
    chain: 'py-[8px] px-2.5 gap-[6px]',
    account: 'py-[6px] px-2 gap-[6px]',
    balance: 'p-[8px] pl-[12px]',
  },
  lg: {
    button: 'px-4.5 text-title leading-title min-h-[46px]' ,
    connected: 'text-title leading-title gap-[14px]',
    icon: 'w-[28px] h-[28px]',
    chain: 'py-[10px] px-3 gap-[8px]',
    account: 'py-[8px] px-2.5 gap-[8px]',
    balance: 'p-[10px] pl-[14px]',
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
          'cursor-pointer font-[600] inline-flex items-center justify-center focus:outline-none',
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
    <div className={cs('text-modalText flex items-center bg-transparent font-[600]', sizeConfig.connected, className)}>
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
