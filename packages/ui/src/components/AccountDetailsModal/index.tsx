import React, { useCallback, useMemo, useState, useRef } from 'react';
import { useAccount, useActiveConnector, useBalance, useChain } from '@luno-kit/react';
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
  const activeConnector = useActiveConnector()

  const [currentView, setCurrentView] = useState<AccountModalView>(AccountModalView.main);
  const [isAnimating, setIsAnimating] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const currentViewRef = useRef<HTMLDivElement>(null);

  const handleViewChange = useCallback((view: AccountModalView) => {
    if (view === currentView || isAnimating) return;

    setIsAnimating(true);

    if (!containerRef.current) {
      setCurrentView(view);
      setIsAnimating(false);
      return;
    }

    const container = containerRef.current;
    const currentHeight = container.offsetHeight;

    setCurrentView(view);

    // Wait for React to render new content, then animate height
    requestAnimationFrame(() => {
      if (!container || !currentViewRef.current) {
        setIsAnimating(false);
        return;
      }

      const newHeight = currentViewRef.current.offsetHeight;

      container.animate([
        { height: currentHeight + 'px' },
        { height: newHeight + 'px' }
      ], {
        duration: 200,
        easing: 'ease-out',
        fill: 'forwards'
      }).addEventListener('finish', () => {
        setIsAnimating(false);
      });
    });
  }, [currentView, isAnimating]);

  const handleModalClose = useCallback(() => {
    close();
    setCurrentView(AccountModalView.main);
    setIsAnimating(false);
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
      onOpenChange={(open) => {
        if (!open) {
          close();
          setCurrentView(AccountModalView.main);
        }
      }}
    >
      <div className={cs(
        'flex flex-col w-full md:w-[360px] max-h-[500px] text-modalText',
        'bg-modalBackground shadow-modal',
        currentView === AccountModalView.main ? 'gap-6' : 'gap-3.5'
      )}>
        <div className="flex items-stretch justify-between w-full px-4 pt-4">
          {currentView === AccountModalView.main ? (
            <div className={'flex items-center gap-3'}>
              {activeConnector?.icon && (
                <div className={'flex items-center justify-center w-[55px] h-[55px]'}>
                  <img src={activeConnector.icon} alt="" />
                </div>
              )}
              <div className="flex flex-col items-start gap-2 w-full">
                <DialogTitle className={'sr-only'}>Account Details</DialogTitle>
                <div className="flex items-center gap-1.5 w-full">
                <span className="text-base text-modalText font-semibold">
                  {formatAddress(address)}
                </span>
                  <Copy copyText={address}/>
                </div>
                <div className="text-sm text-modalTextSecondary font-medium min-h-[20px]">
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
                className="text-lg leading-lg text-modalText font-semibold transition-opacity duration-300">
                {viewTitle}
              </DialogTitle>
            </>
          )}

          <DialogClose className="z-10 flex items-center justify-center h-[30px] w-[30px] rounded-modalControlButton border-none hover:bg-modalControlButtonBackgroundHover  transition-colors duration-200 cursor-pointer">
            <Close />
          </DialogClose>
        </div>

        <div
          ref={containerRef}
          className="relative overflow-hidden"
        >
          <div ref={currentViewRef}>
            {viewComponents[currentView]}
          </div>
        </div>
      </div>
    </Dialog>
  );
};
