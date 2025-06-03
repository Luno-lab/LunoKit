import React, {useMemo} from 'react';
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
          'cursor-pointer font-[600] inline-flex items-center justify-center border border-transparent rounded-sm focus:outline-none',
          'text-primaryFont bg-connectButtonBackground shadow-connectButton active:scale-[0.95]',
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
    <div
      className={cs(
        'text-modalFont flex items-center bg-transparent font-[600]',
        sizeConfig.connected,
        className
      )}
      role="button"
      tabIndex={0}
      aria-label="Account details"
    >
      {chainStatus !== 'none' && (
        <div
          onClick={() => openChainModal?.()}
          className={cs(
            'flex items-center rounded-sm cursor-pointer',
            'bg-chainButton shadow-accountButton',
            sizeConfig.chain,
            transitionClassName,
          )}>
          {/*<div className={cs(sizeConfig.icon, 'overflow-hidden rounded-full')}>*/}
            {(chainStatus === 'full' || chainStatus === 'icon')
              ? <ChainIcon chainIconUrl={chainIconUrl} chainName={chainName} className={sizeConfig.icon}/>
              : null}
          {/*</div>*/}

          {(chainStatus === 'full' || chainStatus === 'name') && (
            <span className={''}>{currentChain?.name || 'Unknown Chain'}</span>
          )}
        </div>
      )}


      <div
        onClick={() => openAccountModal?.()}
        className={cs(
        'flex items-center cursor-pointer rounded-sm py-1px bg-chainButton shadow-accountButton',
        transitionClassName,
        )}
      >

        {showBalance && (
          <div className={sizeConfig.balance}>
            <span className="">
              {balance?.formattedTransferable || balance?.formattedTotal || 0}
              {'  '}{currentChain?.nativeCurrency?.symbol || ''}
            </span>
          </div>
        )}

        <div className={cs(
          "flex items-center bg-deepBackground rounded-sm m-[2px]",
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
      </div>
    </div>
  );
};
