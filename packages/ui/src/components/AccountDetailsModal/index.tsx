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
import { AssetListView } from './AssetListView';
import { MainView } from './MainView';
import { SwitchAccountView } from './SwitchAccountView';
import { SwitchChainView } from './SwitchChainView';

export enum AccountModalView {
  main = 'main',
  switchAccount = 'switchAccount',
  switchChain = 'switchChain',
  assetList = 'assetList',
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
    if (currentView === AccountModalView.switchAccount) return SwitchAccountView.title;
    if (currentView === AccountModalView.switchChain) return SwitchChainView.title;
    if (currentView === AccountModalView.assetList) return AssetListView.title;
    return null;
  }, [currentView]);

  const viewComponents = useMemo(
    () => ({
      [AccountModalView.main]: (
        <MainView onViewChange={handleViewChange} onModalClose={handleModalClose} />
      ),
      [AccountModalView.switchAccount]: (
        <SwitchAccountView onBack={() => handleViewChange(AccountModalView.main)} />
      ),
      [AccountModalView.switchChain]: (
        <SwitchChainView onBack={() => handleViewChange(AccountModalView.main)} />
      ),
      [AccountModalView.assetList]: <AssetListView />,
    }),
    [handleViewChange, handleModalClose]
  );

  return (
    <Dialog open={isOpen} onOpenChange={handleModalClose}>
      <div
        className={cs(
          'luno:flex luno:flex-col luno:w-full luno:md:w-[360px] luno:max-h-[512px] luno:text-modalText',
          'luno:bg-modalBackground luno:shadow-modal',
          currentView === AccountModalView.main ? 'luno:gap-5' : 'luno:gap-3.5'
        )}
      >
        <div className={cs("luno:flex luno:items-stretch luno:justify-between luno:w-full luno:px-4 luno:pt-4")}>
          {currentView === AccountModalView.main ? (
            <div className={cs('luno:flex luno:items-center luno:gap-3 luno:max-w-[80%]')}>
              {activeConnector?.icon && (
                <div className={cs('luno:flex luno:items-center luno:justify-center luno:w-[40px] luno:h-[40px] luno:shrink-0')}>
                  <img src={activeConnector.icon} alt="luno" className={cs("luno:w-full luno:h-full luno:object-contain")} />
                </div>
              )}
              <div className={cs("luno:flex luno:flex-col luno:items-start luno:gap-1.5 luno:max-w-full")}>
                <DialogTitle className={'luno:sr-only'}>Account Details</DialogTitle>
                <div className={cs("luno:flex luno:items-center luno:gap-0.5 luno:w-full")}>
                  <span className={cs("luno:text-base luno:text-modalText luno:font-semibold")}>
                    {formatAddress(address)}
                  </span>
                  <Copy copyText={address} />
                </div>
                <div
                  className={cs(
                    'luno:text-sm luno:leading-sm luno:text-modalTextSecondary luno:font-medium luno:text-ellipsis luno:overflow-hidden luno:whitespace-nowrap',
                    account?.name && account?.name.length > 30 ? 'luno:w-[90%]' : ''
                  )}
                >
                  {account?.name || activeConnector?.name}
                </div>
              </div>
            </div>
          ) : (
            <>
              <button
                className={cs("luno:flex luno:items-center luno:justify-center luno:w-[30px] luno:h-[30px] luno:cursor-pointer luno:rounded-modalControlButton luno:border-none luno:hover:bg-modalControlButtonBackgroundHover luno:transition-colors luno:duration-200")}
                onClick={() => handleViewChange(AccountModalView.main)}
                aria-label="Back"
              >
                <Back />
              </button>
              <DialogTitle className={cs("luno:text-lg luno:leading-lg luno:text-modalText luno:font-semibold luno:transition-opacity luno:duration-300")}>
                {viewTitle}
              </DialogTitle>
            </>
          )}

          <DialogClose className={cs("luno:shrink-0 luno:z-10 luno:flex luno:items-center luno:justify-center luno:h-[30px] luno:w-[30px] luno:rounded-modalControlButton luno:border-none luno:hover:bg-modalControlButtonBackgroundHover luno:transition-colors luno:duration-200 luno:cursor-pointer")}>
            <Close />
          </DialogClose>
        </div>

        <div ref={containerRef} className={cs("luno:relative")}>
          <div ref={currentViewRef}>{viewComponents[currentView]}</div>
        </div>
      </div>
    </Dialog>
  );
};
