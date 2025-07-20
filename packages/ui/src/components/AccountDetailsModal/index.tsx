import React, { useCallback, useMemo, useState } from 'react';
import { useAccount, useActiveConnector, useBalance, useChain, useDisconnect } from '@luno-kit/react';
import { Dialog, DialogClose, DialogTitle } from '../Dialog';
import { cs } from '../../utils';
import { useAccountModal } from '../../providers/ModalContext';
import { Close, Back } from '../../assets/icons';
import { MainView } from './MainView';
import { SwitchAccountView } from './SwitchAccountView';
import { SwitchChainView } from './SwitchChainView';
import { Copy } from '../Copy'
import { formatAddress } from '@luno-kit/react'

export enum AccountModalView {
  main = 'main',
  switchAccount = 'switchAccount',
  switchChain = 'switchChain',
}

export const AccountDetailsModal: React.FC = () => {
  const { isOpen, close } = useAccountModal();
  const { address } = useAccount();
  const { chain } = useChain();
  const { data: balance } = useBalance({ address });
  const { disconnect } = useDisconnect();
  const activeConnector = useActiveConnector()

  const [currentView, setCurrentView] = useState<AccountModalView>(AccountModalView.main);

  const handleViewChange = useCallback((view: AccountModalView) => {
    setCurrentView(view);
  }, []);

  const handleModalClose = useCallback(() => {
    close();
    setCurrentView(AccountModalView.main);
  }, [close]);

  const handleDisconnect = async () => {
    try {
      await disconnect();
      close();
    } catch (error) {
      console.error('Failed to disconnect:', error);
    }
  };

  const viewTitle = useMemo(() => {
    const titleMap = {
      [AccountModalView.switchAccount]: 'Switch Account',
      [AccountModalView.switchChain]: SwitchChainView.title,
      [AccountModalView.main]: null
    };
    return titleMap[currentView];
  }, [currentView]);

  const viewComponents = useMemo(() => ({
    [AccountModalView.main]: (
      <MainView
        onViewChange={handleViewChange}
        onModalClose={handleModalClose}
      />
    ),
    [AccountModalView.switchAccount]: (
      <SwitchAccountView onBack={() => handleViewChange(AccountModalView.main)} />
    ),
    [AccountModalView.switchChain]: (
      <SwitchChainView onBack={() => handleViewChange(AccountModalView.main)} />
    )
  }), [handleViewChange, handleModalClose]);

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
        'flex flex-col w-[360px] max-h-[500px] p-[16px] text-modalText',
        'bg-modalBackground rounded-modal shadow-modal',
        currentView === AccountModalView.main ? 'gap-[26px]' : 'gap-[14px]'
      )}>
        <div className="flex items-stretch justify-between w-full">
          {currentView === AccountModalView.main ? (
            <div className={'flex items-center gap-[12px]'}>
              {activeConnector?.icon && (
                <div className={'flex items-center justify-center w-[55px] h-[55px]'}>
                  <img src={activeConnector.icon} alt="" />
                </div>
              )}
              <div className="flex flex-col items-start gap-[8px] w-full">
                <DialogTitle className={'sr-only'}>Account Details</DialogTitle>
                <div className="flex items-center gap-[6px] w-full">
                <span className="text-primary text-modalText font-[600]">
                  {formatAddress(address)}
                </span>
                  <Copy copyText={address}/>
                </div>
                <div className="text-secondary text-modalTextSecondary font-[500] min-h-[20px]">
                  {balance === undefined ? (
                    <div className="animate-pulse rounded w-[80px] h-[20px] bg-skeleton" />
                  ) : (
                    <>
                      {balance?.formattedTransferable || '0.00'} {chain?.nativeCurrency?.symbol || 'DOT'}
                    </>
                  )}
                </div>
              </div>
            </div>
          ) : (
            <>
              <button
                className="flex items-center justify-center w-[30px] h-[30px] cursor-pointer rounded-modalControlButton border-none hover:bg-modalControlButtonBackgroundHover  transition-colors duration-200"
                onClick={() => handleViewChange(AccountModalView.main)}
                aria-label="Back"
              >
                <Back  />
              </button>
              <DialogTitle
                className="text-title leading-title text-modalText font-[600] transition-opacity duration-300">
                {viewTitle}
              </DialogTitle>
            </>
          )}

          <DialogClose className="z-10 flex items-center justify-center h-[30px] w-[30px] rounded-modalControlButton border-none hover:bg-modalControlButtonBackgroundHover  transition-colors duration-200 cursor-pointer">
            <Close />
          </DialogClose>
        </div>

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
