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
import { cs } from '../../utils';
import { Icon } from '../Icon';
import { AccountModalView } from './index';
import {useSubscanTokens} from '../../hooks/useSubscanTokens'

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
  const { refetch } = useSubscanTokens()

  const items = useMemo(() => {
    const chainNameItem = {
      key: 'Chain Name',
      content: (
        <div className={'flex items-stretch w-full justify-between'}>
          <div className={'flex items-center gap-2'}>
            <div className="relative">
              <Icon
                className="w-[24px] h-[24px]"
                iconUrl={chain?.chainIconUrl}
                resourceName={`${chain?.name}-chain`}
              />
              {/* <div className={'dot w-[8px] h-[8px] bg-accentColor absolute bottom-0 right-0 rounded-full'}/> */}
            </div>
            <div className={'flex flex-col items-start'}>
              <span className="text-base leading-base text-modalText">
                {chain?.name || 'Polkadot'}
              </span>
              {balance ? (
                <span className={'text-modalTextSecondary text-xs leading-xs'}>
                  {balance.formattedTransferable || '0.00'} {chain?.nativeCurrency?.symbol || 'DOT'}
                </span>
              ) : (
                <span className="animate-pulse rounded w-[80px] h-[16px] bg-skeleton" />
              )}
            </div>
          </div>
          <div className={'flex items-center justify-center'}>
            <Arrow className={'w-[16px] h-[16px] text-modalTextSecondary'} />
          </div>
        </div>
      ),
      onClick: () => onViewChange(AccountModalView.switchChain),
    };

    const switchAccountItem = {
      key: 'Switch Account',
      content: (
        <>
          <Switch className={'w-[24px] h-[24px]'} />
          <span className="text-base text-accountActionItemText">Switch Account</span>
        </>
      ),
      onClick: () => onViewChange(AccountModalView.switchAccount),
    };

    const assetListItem = {
      key: 'View Assets',
      content: (
        <>
          <Coin className={'w-[24px] h-[24px]'} />
          <span className="text-base text-accountActionItemText">View Assets</span>
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
          <List className={'w-[24px] h-[24px]'} />
          <span className="text-base text-accountActionItemText">View on Explorer</span>
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
    <div className="flex flex-col items-center gap-3 w-full">
      <div className="flex flex-col gap-1.5 w-full px-4">
        {items.map((i) => (
          <SelectItem key={i.key} onClick={i.onClick}>
            {i.content}
          </SelectItem>
        ))}
      </div>
      <div className={'w-full mx-[-100px] h-[1px] bg-separatorLine'} />

      <div className={'w-full px-4 pb-4'}>
        <SelectItem onClick={handleDisconnect}>
          <Disconnect />
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
        'w-full p-2.5 rounded-accountActionItem border-none text-left flex items-center gap-2 font-medium',
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
