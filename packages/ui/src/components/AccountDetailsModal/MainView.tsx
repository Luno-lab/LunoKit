import React, { useMemo } from 'react';
import { cs } from '../../utils';
import { Arrow, Disconnect, List, Switch } from '../../assets/icons';
import { ChainIcon } from '../ChainIcon';
import { AccountModalView } from './index'
import {useAccount, useBalance, useChain, useChains, useDisconnect} from '@luno-kit/react'
import { getExplorerUrl } from '@luno-kit/react/utils'

interface MainViewProps {
  onViewChange: (view: AccountModalView) => void;
  onModalClose: () => void;
}

export const MainView: React.FC<MainViewProps> = ({
  onViewChange,
  onModalClose,
}) => {
  const { address } = useAccount();
  const { chain } = useChain();
  const chains = useChains();
  const { disconnectAsync } = useDisconnect();
  const { data: balance } = useBalance({ address: chains.length > 0 ? address : undefined });

  const items = useMemo(() => {
    const chainSelectOption =  {
      key: 'Chain Name',
      content: (
        <div className={'flex items-stretch w-full justify-between'}>
          <div className={'flex items-center gap-2'}>
            <div className="relative">
              <ChainIcon
                className="w-[24px] h-[24px]"
                chainIconUrl={chain?.chainIconUrl}
                chainName={chain?.name}
              />
              <div className={'dot w-[8px] h-[8px] bg-accentColor absolute bottom-0 right-0 rounded-full'}/>
            </div>
            <div className={'flex flex-col items-start'}>
              <span className="text-base leading-base text-modalText">{chain?.name || 'Polkadot'}</span>
              {balance ? (
                <span className={'text-modalTextSecondary text-xs leading-xs'}>
                 {balance.formattedTransferable || '0.00'} {chain?.nativeCurrency?.symbol || 'DOT'}
                </span>
              ) : (
                <span className="animate-pulse rounded w-[80px] h-[16px] bg-skeleton"/>
              )}
            </div>
          </div>
          <div
            className={'flex items-center justify-center'}>
            <Arrow className={'w-[16px] h-[16px] text-modalTextSecondary'} />
          </div>
        </div>
      ),
      onClick: () => onViewChange(AccountModalView.switchChain)
    }

    const normalOptions = [
      {
        key: 'View on Explorer',
        content: (
          <>
            <List className={'w-[24px] h-[24px]'} />
            <span className="text-base text-accountActionItemText">View on Explorer</span>
          </>
        ),
        onClick: () => window.open(getExplorerUrl(chain?.blockExplorers?.default?.url!, address, 'address'))
      },
      {
        key: 'Switch Account',
        content: (
          <>
            <Switch className={'w-[24px] h-[24px]'} />
            <span className="text-base text-accountActionItemText">Switch Account</span>
          </>
        ),
        onClick: () => onViewChange(AccountModalView.switchAccount)
      }
    ]

    return chains.length > 0 ? [chainSelectOption, ...normalOptions] : [...normalOptions]
  }, [onViewChange, chain, address, balance, chains])

  const handleDisconnect = async () => {
    await disconnectAsync();
    onModalClose();
  };

  return (
    <div className="flex flex-col items-center gap-3 w-full">
      <div className="flex flex-col gap-1.5 w-full px-4">
        {items.map(i => (
          <SelectItem key={i.key} onClick={i.onClick}>
            {i.content}
          </SelectItem>
        ))}
      </div>
      <div className={'w-full mx-[-100px] h-[1px] bg-separatorLine'}/>

      <div className={'w-full px-4 pb-4'}>
        <SelectItem onClick={handleDisconnect}>
          <Disconnect  />
          <span className="font-medium text-base text-accountActionItemText">Disconnect</span>
        </SelectItem>
      </div>
    </div>
  );
};

const SelectItem = ({ children, onClick }: { children: React.ReactNode; onClick?: () => void }) => {
  return (
    <button
      type="button"
      onClick={() => onClick?.()}
      className={cs(
        'w-full p-2.5 rounded-accountActionItem border-none text-left flex items-center gap-2 font-medium',
        'bg-accountActionItemBackground hover:bg-accountActionItemBackgroundHover',
        'transition-colors duration-200',
        onClick ? 'cursor-pointer' : 'cursor-auto'
      )}
      aria-label={typeof children === 'string' ? children : undefined}
    >
      {children}
    </button>
  );
};
