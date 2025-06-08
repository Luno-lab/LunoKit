// components/AccountDetailsModal/MainView.tsx
import React from 'react';
import { cs, shortAddress } from '../../utils';
import { Copy, Disconnect, Switch } from '../../assets/icons';
import { ChainIcon } from '../ChainIcon';
import type { AccountBalance, Chain } from '@luno-kit/core'

interface MainViewProps {
  chain?: Chain;
  onSwitchAccount: () => void;
  onSwitchChain: () => void;
  onDisconnect: () => void;
  onCopyAddress: (address: string) => void;
}

export const MainView: React.FC<MainViewProps> = ({
  chain,
  onSwitchAccount,
  onSwitchChain,
  onDisconnect,
}) => {
  const items = [
    {
      key: 'Chain Name',
      content: (
        <>
          <ChainIcon
            className="w-[24px] h-[24px]"
            chainIconUrl={chain?.chainIconUrl}
            chainName={chain?.name}
          />
          <span className="text-primary text-modalFont">{chain?.name || 'Polkadot'}</span>
        </>
      ),
      onClick: onSwitchChain
    },
    {
      key: 'Switch Account',
      content: (
        <>
          <Switch className="w-[16px] h-[16px]" />
          <span className="text-primary text-modalFont">Switch Account</span>
        </>
      ),
      onClick: onSwitchAccount
    }
  ];

  return (
    <div className="flex flex-col items-center gap-[26px] w-full">
      <div className="flex flex-col gap-[4px] w-full">
        {items.map(i => (
          <SelectItem key={i.key} onClick={i.onClick}>
            {i.content}
          </SelectItem>
        ))}
      </div>

      <SelectItem onClick={onDisconnect}>
        <Disconnect className="w-[16px] h-[16px]" />
        <span className="font-[600] text-primary text-modalFont">Disconnect</span>
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
        'text-left flex items-center gap-[8px] font-[600]'
      )}
    >
      {children}
    </div>
  );
};
