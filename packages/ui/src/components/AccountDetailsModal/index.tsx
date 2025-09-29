import { useAccount, useActiveConnector } from '@luno-kit/react';
import { formatAddress } from '@luno-kit/react/utils';
import type React from 'react';
import { useCallback, useMemo } from 'react';
import { Back, Close } from '../../assets/icons';
import { useAnimatedViews } from '../../hooks/useAnimatedViews';
import { useAccountModal } from '../../providers';
import { cs } from '../../utils';
import { Copy } from '../Copy';
import { Dialog, DialogClose, DialogTitle } from '../Dialog';
import { MainView } from './MainView';
import { SwitchAccountView } from './SwitchAccountView';
import { SwitchChainView } from './SwitchChainView';

export enum AccountModalView {
  main = 'main',
  switchAccount = 'switchAccount',
  switchChain = 'switchChain',
}

export const AccountDetailsModal: React.FC = () => {
  const { isOpen, close } = useAccountModal();
  const { address, account } = useAccount();
  const activeConnector = useActiveConnector();

  const { currentView, containerRef, currentViewRef, handleViewChange, resetView } =
    useAnimatedViews({ initialView: AccountModalView.main });

  const handleModalClose = useCallback(() => {
    close();
    resetView();
  }, [close]);

  const viewTitle = useMemo(() => {
    if (currentView === AccountModalView.switchAccount) return 'Switch Account';
    if (currentView === AccountModalView.switchChain) return SwitchChainView.title;
    return null;
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
      onOpenChange={handleModalClose}
    >
      <div className={cs(
        'flex flex-col w-full md:w-[360px] max-h-[512px] text-modalText',
        'bg-modalBackground shadow-modal',
        currentView === AccountModalView.main ? 'gap-5' : 'gap-3.5'
      )}>
        <div className="flex items-stretch justify-between w-full px-4 pt-4">
          {currentView === AccountModalView.main ? (
            <div className={'flex items-center gap-3 max-w-[80%]'}>
              {activeConnector?.icon && (
                <div className={'flex items-center justify-center w-[40px] h-[40px] shrink-0'}>
                  <img src={activeConnector.icon} alt="" className="w-full h-full object-contain"/>
                </div>
              )}
              <div className="flex flex-col items-start gap-1.5 max-w-full">
                <DialogTitle className={'sr-only'}>Account Details</DialogTitle>
                <div className="flex items-center gap-0.5 w-full ">
                <span className="text-base text-modalText font-semibold">
                  {formatAddress(address)}
                </span>
                  <Copy copyText={address}/>
                </div>
                <div className={cs(
                  "text-sm leading-sm text-modalTextSecondary font-medium text-ellipsis overflow-hidden whitespace-nowrap",
                  account?.name && account?.name.length > 30 ? 'w-[90%]' : ''
                )}>
                  {account?.name || activeConnector?.name}
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
                <Back />
              </button>
              <DialogTitle className="text-lg leading-lg text-modalText font-semibold transition-opacity duration-300">
                {viewTitle}
              </DialogTitle>
            </>
          )}

          <DialogClose className="shrink-0 z-10 flex items-center justify-center h-[30px] w-[30px] rounded-modalControlButton border-none hover:bg-modalControlButtonBackgroundHover  transition-colors duration-200 cursor-pointer">
            <Close />
          </DialogClose>
        </div>

        <div
          ref={containerRef}
          className="relative"
        >
          <div ref={currentViewRef}>
            {viewComponents[currentView]}
          </div>
        </div>
      </div>
    </Dialog>
  );
};
