// components/AccountDetailsModal/MainView.tsx
import React, {useMemo} from 'react';
import { cs } from '../../utils';
import {Arrow, Disconnect, List, Switch} from '../../assets/icons';
import { ChainIcon } from '../ChainIcon';
import { AccountModalView } from './index'
import {useAccount, useBalance, useChain, useDisconnect} from '@luno-kit/react'

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
  const { data: balance } = useBalance({ address });
  const { disconnect } = useDisconnect();

  const items = useMemo(() => {
    return [
      {
        key: 'Chain Name',
        content: (
          <div className={'flex items-stretch w-full justify-between'}>
            <div className={'flex items-center gap-[8px]'}>
              <ChainIcon
                className="w-[20px] h-[20px]"
                chainIconUrl={chain?.chainIconUrl}
                chainName={chain?.name}
              />
              <span className="text-primary text-modalFont">{chain?.name || 'Polkadot'}</span>
            </div>
            <div
              onClick={ () => onViewChange(AccountModalView.switchChain)}
              className={'flex items-center justify-center cursor-pointer'}>
              <Arrow className={'w-[16px] h-[16px] '} />
            </div>
          </div>
        ),
      },
      {
        key: 'View on Explorer',
        content: (
          <>
            <List className="w-[16px] h-[16px]" />
            <span className="text-primary text-modalFont">View on Explorer</span>
          </>
        ),
        onClick: () => window.open(chain?.blockExplorers?.default?.url!)
      },
      {
        key: 'Switch Account',
        content: (
          <>
            <Switch className="w-[16px] h-[16px]" />
            <span className="text-primary text-modalFont">Switch Account</span>
          </>
        ),
        onClick: () => onViewChange(AccountModalView.switchAccount)
      }
    ];
  }, [onViewChange, chain])

  const handleDisconnect = () => {
    disconnect();
    onModalClose();
  };

  return (
    <div className="flex flex-col items-center gap-[26px] w-full">
      <div className="flex flex-col gap-[4px] w-full">
        {items.map(i => (
          <SelectItem key={i.key} onClick={i.onClick}>
            {i.content}
          </SelectItem>
        ))}
      </div>

      <SelectItem onClick={handleDisconnect}>
        <Disconnect className="w-[16px] h-[16px]" />
        <span className="font-[500] text-primary text-modalFont">Disconnect</span>
      </SelectItem>
    </div>
  );
};

const SelectItem = ({ children, onClick }: { children: React.ReactNode; onClick?: () => void }) => {
  return (
    <div
      onClick={() => onClick?.()}
      className={cs(
        'cursor-pointer bg-connectorItemBackground p-[14px] w-full rounded-sm border-none',
        'hover:opacity-90 transition-transform active:scale-[0.95]',
        'text-left flex items-center gap-[8px] font-[500]',
        onClick ? 'cursor-pointer' : 'cursor-auto'
      )}
    >
      {children}
    </div>
  );
};
