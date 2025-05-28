// packages/ui/src/components/AccountDetailsModal/index.tsx
import React, {useMemo, useState} from 'react';
import { useAccount, useAccounts, useBalance, useChain, useDisconnect } from '@luno/react';
import { Dialog, DialogClose, DialogTitle } from '../Dialog';
import {cs, shortAddress} from '../../utils';
import { useAccountModal } from '../../providers/ModalContext';
import type { Account } from '@luno/core';
import {Close, Copy, Disconnect, Switch, Back} from '../../assets/icons'
import {formatAddress} from '@luno/core'

// 你需要创建的图标组件
// import { Close, SwitchAccount, Disconnect, ChevronRight, Copy, Check } from '../../assets/icons';

enum AccountModalView {
  main = 'main',
  switchAccount = 'switchAccount'
}

export const AccountDetailsModal: React.FC = () => {
  const { isOpen, close } = useAccountModal();
  const { address } = useAccount();
  const { accounts, selectAccount } = useAccounts();
  const { chain } = useChain();
  const { disconnect } = useDisconnect();
  const { data: balance } = useBalance({ address });

  const [currentView, setCurrentView] = useState<AccountModalView>(AccountModalView.main);

  const handleDisconnect = () => {
    disconnect();
    close();
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const onBack = () => {
    setCurrentView(AccountModalView.main)
  }

  const items = useMemo(() => {
    return [
      { key: 'Chain Name', content: (
          <>
            <div className={'w-[24px] h-[24px] rounded-full overflow-hidden'}>
              {chain?.chainIconUrl
                ? <img className={'w-full h-full'} src={chain?.chainIconUrl} alt=""/>
                : <div className={'w-full h-full'}/>}
            </div>

            <span className="font-700 text-primary text-modalFont">{chain?.name || 'Polkadot'}</span>
          </>
        )
      },
      { key: 'Switch Account',
        content: (
          <>
            <Switch className="w-[16px] h-[16px]"/>
            <span className="font-700 text-primary text-modalFont">Switch Account</span>
          </>
        ),
        onClick: () => setCurrentView(AccountModalView.switchAccount)
      }
    ]
  }, [chain, setCurrentView])

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => {
        if (!open) {
          close();
          setCurrentView(AccountModalView.main); // 重置视图
        }
      }}
    >
      <div className="flex flex-col w-[360px] max-h-[500px] p-[16px] gap-[26px] text-modalFont">
        {/* Header */}
        <div className="flex items-stretch justify-between w-full">
          {currentView === AccountModalView.main ? (
            <div className="flex flex-col items-start gap-[8px] w-full">

            <div className="flex items-center gap-[6px] w-full">
                <span className="text-primary leading-primary text-modalFont font-600">
                  {shortAddress(address)}
                </span>
                <Copy
                  className="w-[13px] h-[13px] cursor-pointer"
                  onClick={() => address && copyToClipboard(address)}/>
              </div>

              <div className="text-secondaryFont leading-secondary text-secondary">
                {balance?.formattedTransferable || '0.00'} {chain?.nativeCurrency?.symbol || 'DOT'}
              </div>
            </div>
          ) : (
            <>
              <div className={'flex items-center justify-center max-w-[16px] cursor-pointer'} onClick={onBack}>
                <Back className={'w-full'}/>
              </div>
              <DialogTitle className="text-title leading-title text-modalFont font-800">
                {'Switch Accounts'}
              </DialogTitle>
            </>
          )}

          <DialogClose className="z-10 cursor-pointer flex items-start">
            <Close className="w-[24px] h-[24px]"/>
          </DialogClose>
        </div>

        {currentView === AccountModalView.main ? (
          <div className={'flex flex-col items-center gap-[26px] w-full'}>

            <div className="flex flex-col gap-[4px] w-full">
              {items.map(i => (
                <SelectItem key={i.key} onClick={i.onClick}>{i.content}</SelectItem>
              ))}

            </div>

            <SelectItem onClick={handleDisconnect}>
              <Disconnect className="w-[16px] h-[16px]" />
              <span className="font-700 text-primary text-modalFont">Disconnect</span>
            </SelectItem>
          </div>
        ) : (
          <div className="flex flex-col gap-[4px]">
            {accounts.map((acc) => (
              <AccountItem key={acc.address} account={acc} isSelected={acc.address === address} selectAccount={selectAccount} />
            ))}
          </div>
        )}
      </div>
    </Dialog>
  );
};

const SelectItem = ({ children, onClick }: { children: React.ReactNode; onClick?: () => void}) => {
  return (
    <div
      onClick={() => onClick?.()}
      className={cs(
      'cursor-pointer bg-connectorItemBackground p-[14px] w-full rounded-sm border-none',
      'hover:opacity-90 transition-transform active:scale-[0.95]',
      'text-left flex items-center gap-[8px]'
    )}>
      {children}
    </div>
  )
}

const AccountItem = ({ isSelected, account, selectAccount }: { isSelected: boolean; account: Account; selectAccount: (acc: Account) => void }) => {
  const { chain } = useChain()
  const address = account.address

  const { data: balance} = useBalance({ address })

  return (
    <div
      onClick={() => selectAccount(account)}
      className={cs(
        'bg-connectorItemBackground px-[14px] py-[10px] w-full rounded-sm border-none',
        'hover:opacity-90 transition-transform active:scale-[0.95]',
        'text-left flex items-center justify-between gap-[8px]',
        isSelected ? 'cursor-auto' : 'cursor-pointer'
      )}
    >
      <div className="flex items-center gap-[8px]">
        <div className="shrink-0 w-[24px] h-[24px] bg-pink-500 rounded-full flex items-center justify-center">
          {/*//todo*/}
        </div>
        <div className="flex flex-col items-start">
          <span className="font-700 text-secondary leading-secondary text-modalFont">
            {account.name || formatAddress(address)}
          </span>
          <span className="text-sm text-secondaryFont text-accent leading-accent">
            {balance?.formattedTransferable || '0.00'} {chain?.nativeCurrency?.symbol || 'DOT'}
          </span>
        </div>
      </div>

      {isSelected && (
        <div
          className={'border-[1px] border-solid border-accentFont rounded-full overflow-hidden flex items-center justify-center w-[18px] h-[18px]'}>
          <div className={'rounded-full bg-accentFont w-[10px] h-[10px]'}/>
        </div>
      )}
    </div>
  )
}
