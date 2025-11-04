import {
  useAccount,
  useBalance,
  useChain,
  useChains,
  useConfig,
  useDisconnect,
} from '@luno-kit/react';
import { getExplorerUrl } from '@luno-kit/react/utils';
import type React from 'react';
import { useMemo } from 'react';
import { Arrow, Coin, Disconnect, List, Switch } from '../../assets/icons';
import { useSubscanTokens } from '../../hooks/useSubscanTokens';
import { cs } from '../../utils';
import { Icon } from '../Icon';
import { AccountModalView } from './index';

interface MainViewProps {
  onViewChange: (view: AccountModalView) => void;
  onModalClose: () => void;
}

export const MainView: React.FC<MainViewProps> = ({ onViewChange, onModalClose }) => {
  const { address } = useAccount();
  const { chain } = useChain();
  const chains = useChains();
  const { disconnectAsync } = useDisconnect();
  const { data: balance } = useBalance({ address: chains.length > 0 ? address : undefined });
  const config = useConfig();
  const { refetch } = useSubscanTokens();

  const items = useMemo(() => {
    const chainNameItem = {
      key: 'Chain Name',
      content: (
        <div className={'luno:flex luno:items-stretch luno:w-full luno:justify-between'}>
          <div className={'luno:flex luno:items-center luno:gap-2'}>
            <div className="luno:relative">
              <Icon
                className="luno:w-[24px] luno:h-[24px]"
                iconUrl={chain?.chainIconUrl}
                resourceName={`${chain?.name}-chain`}
              />
              {/* <div className={'dot w-[8px] h-[8px] bg-accentColor absolute bottom-0 right-0 rounded-full'}/> */}
            </div>
            <div className={'luno:flex luno:flex-col luno:items-start'}>
              <span className="luno:text-base luno:leading-base luno:text-modalText">
                {chain?.name || 'Polkadot'}
              </span>
              {balance ? (
                <span className={'luno:text-modalTextSecondary luno:text-xs luno:leading-xs'}>
                  {balance.formattedTransferable || '0.00'} {chain?.nativeCurrency?.symbol || 'DOT'}
                </span>
              ) : (
                <span className="luno:animate-pulse luno:rounded luno:w-[80px] luno:h-[16px] luno:bg-skeleton" />
              )}
            </div>
          </div>
          <div className={'luno:flex luno:items-center luno:justify-center'}>
            <Arrow className={'luno:w-[16px] luno:h-[16px] luno:text-modalTextSecondary'} />
          </div>
        </div>
      ),
      onClick: () => onViewChange(AccountModalView.switchChain),
    };

    const switchAccountItem = {
      key: 'Switch Account',
      content: (
        <>
          <Switch className={'luno:w-[24px] luno:h-[24px]'} />
          <span className="luno:text-base luno:text-accountActionItemText">Switch Account</span>
        </>
      ),
      onClick: () => onViewChange(AccountModalView.switchAccount),
    };

    const assetListItem = {
      key: 'View Assets',
      content: (
        <>
          <Coin className={'luno:w-[24px] luno:h-[24px]'} />
          <span className="luno:text-base luno:text-accountActionItemText">View Assets</span>
        </>
      ),
      onClick: () => {
        onViewChange(AccountModalView.assetList);
        refetch();
      },
    };

    const explorerItem = {
      key: 'View on Explorer',
      content: (
        <>
          <List className={'luno:w-[24px] luno:h-[24px]'} />
          <span className="luno:text-base luno:text-accountActionItemText luno:font-medium">View on Explorer</span>
        </>
      ),
      onClick: () =>
        window.open(getExplorerUrl(chain?.blockExplorers?.default?.url!, address, 'address')),
    };

    if (chains.length === 0) return [switchAccountItem];

    return config?.subscan?.apiKey
      ? [chainNameItem, explorerItem, assetListItem, switchAccountItem]
      : [chainNameItem, explorerItem, switchAccountItem];
  }, [onViewChange, chain, address, balance, chains, config]);

  const handleDisconnect = async () => {
    await disconnectAsync();
    onModalClose();
  };

  return (
    <div className="luno:flex luno:flex-col luno:items-center luno:gap-3 luno:w-full">
      <div className="luno:flex luno:flex-col luno:gap-1.5 luno:w-full luno:px-4">
        {items.map((i) => (
          <SelectItem key={i.key} onClick={i.onClick}>
            {i.content}
          </SelectItem>
        ))}
      </div>
      <div className={'luno:w-full luno:mx-[-100px] luno:h-[1px] luno:bg-separatorLine'} />

      <div className={'luno:w-full luno:px-4 luno:pb-4'}>
        <SelectItem onClick={handleDisconnect}>
          <Disconnect />
          <span className="luno:text-base luno:text-accountActionItemText ">Disconnect</span>
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
        'luno:w-full luno:p-2.5 luno:rounded-accountActionItem luno:border-none luno:text-left luno:flex luno:items-center luno:gap-2 luno:font-medium',
        'luno:bg-accountActionItemBackground luno:hover:bg-accountActionItemBackgroundHover',
        'luno:transition-colors luno:duration-200',
        onClick ? 'luno:cursor-pointer' : 'luno:cursor-auto'
      )}
      aria-label={typeof children === 'string' ? children : undefined}
    >
      {children}
    </button>
  );
};
