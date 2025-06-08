// components/AccountDetailsModal/index.tsx
import React, { useState } from 'react';
import { useAccount, useAccounts, useBalance, useChain, useDisconnect } from '@luno-kit/react';
import { Dialog, DialogClose, DialogTitle } from '../Dialog';
import { cs, shortAddress } from '../../utils';
import { useAccountModal } from '../../providers/ModalContext';
import { Close, Copy, Back } from '../../assets/icons';
import { MainView } from './MainView';
import { SwitchAccountView } from './SwitchAccountView';
import { SwitchChainView } from './SwitchChainView';

enum AccountModalView {
  main = 'main',
  switchAccount = 'switchAccount',
  switchChain = 'switchChain',
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
    setCurrentView(AccountModalView.main);
  };

  const getViewTitle = () => {
    switch (currentView) {
      case AccountModalView.switchAccount:
        return 'Switch Accounts';
      case AccountModalView.switchChain:
        return 'Select Networks';
      default:
        return null;
    }
  };

  const viewComponents = {
    [AccountModalView.main]: (
      <MainView
        chain={chain}
        onSwitchAccount={() => setCurrentView(AccountModalView.switchAccount)}
        onSwitchChain={() => setCurrentView(AccountModalView.switchChain)}
        onDisconnect={handleDisconnect}
        onCopyAddress={copyToClipboard}
      />
    ),
    [AccountModalView.switchAccount]: (
      <SwitchAccountView
        accounts={accounts}
        currentAddress={address}
        onSelectAccount={(account) => {
          selectAccount(account);
          setTimeout(() => setCurrentView(AccountModalView.main), 150);
        }}
      />
    ),
    [AccountModalView.switchChain]: (
      <SwitchChainView />
    )
  };

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => {
        if (!open) {
          close();
          setCurrentView(AccountModalView.main);
        }
      }}
    >
      <div className={cs(
        'flex flex-col w-[360px] max-h-[500px] p-[16px]  text-modalFont',
        currentView === AccountModalView.main ? 'gap-[26px]' : 'gap-[14px]'
      )}>
        {/* Header */}
        <div className="flex items-stretch justify-between w-full">
          {currentView === AccountModalView.main ? (
            <div className="flex flex-col items-start gap-[8px] w-full">
              <div className="flex items-center gap-[6px] w-full">
                <span className="text-primary leading-primary text-modalFont font-[600]">
                  {shortAddress(address)}
                </span>
                <Copy
                  className="w-[13px] h-[13px] cursor-pointer"
                  onClick={() => address && copyToClipboard(address)}
                />
              </div>
              <div className="text-secondaryFont leading-secondary text-secondary font-[500]">
                {balance?.formattedTransferable || '0.00'} {chain?.nativeCurrency?.symbol || 'DOT'}
              </div>
            </div>
          ) : (
            <>
              <div className="flex items-center justify-center max-w-[16px] cursor-pointer" onClick={onBack}>
                <Back className="w-full" />
              </div>
              <DialogTitle className="text-title leading-title text-modalFont font-[800] transition-opacity duration-300">
                {getViewTitle()}
              </DialogTitle>
            </>
          )}

          <DialogClose className="z-10 cursor-pointer flex items-start">
            <Close className="w-[24px] h-[24px]" />
          </DialogClose>
        </div>

        {/* 视图容器 */}
        <div className="relative overflow-hidden">
          {Object.entries(viewComponents).map(([view, component]) => (
            <div
              key={view}
              className={cs(
                currentView === view
                  ? "opacity-100 transition-opacity duration-200 ease-in-out"
                  : "opacity-0 absolute inset-0 pointer-events-none"
              )}
            >
              {component}
            </div>
          ))}
        </div>
      </div>
    </Dialog>
  );
};
