import React, { useMemo } from 'react';
import { cs } from '../../utils';
import { Arrow, Disconnect, List, Switch } from '../../assets/icons';
import { ChainIcon } from '../ChainIcon';
import { AccountModalView } from './index'
import { useAccount, useChain, useDisconnect, getExplorerUrl } from '@luno-kit/react'

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
  const { disconnectAsync } = useDisconnect();

  const items = useMemo(() => {
    return [
      {
        key: 'Chain Name',
        content: (
          <div className={'flex items-stretch w-full justify-between'}>
            <div className={'flex items-center gap-2'}>
              <ChainIcon
                className="w-[20px] h-[20px]"
                chainIconUrl={chain?.chainIconUrl}
                chainName={chain?.name}
              />
              <span className="text-base text-modalText">{chain?.name || 'Polkadot'}</span>
            </div>
            <div
              className={'flex items-center justify-center'}>
              <Arrow className={'w-[16px] h-[16px] '} />
            </div>
          </div>
        ),
        onClick: () => onViewChange(AccountModalView.switchChain)
      },
      {
        key: 'View on Explorer',
        content: (
          <>
            <List />
            <span className="text-base text-accountActionItemText">View on Explorer</span>
          </>
        ),
        onClick: () => window.open(getExplorerUrl(chain?.blockExplorers?.default?.url!, address, 'address'))
      },
      {
        key: 'Switch Account',
        content: (
          <>
            <Switch />
            <span className="text-base text-accountActionItemText">Switch Account</span>
          </>
        ),
        onClick: () => onViewChange(AccountModalView.switchAccount)
      }
    ];
  }, [onViewChange, chain, address])

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
      <div className={'w-full mx-[-100px] h-[1px] bg-cutLine'}/>

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
        'w-full p-3.5 rounded-accountActionItem border-none text-left flex items-center gap-2 font-medium',
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
