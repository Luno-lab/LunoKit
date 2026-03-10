import {
  useAccount,
  useActiveConnector,
  useBalance,
  useChain,
  useChains,
  useConfig
} from '@luno-kit/react';
import { type AccountType, ChainType } from '@luno-kit/react/types';
import { Substrate } from '@luno-kit/react/utils';
import React, { useCallback, useState } from 'react';
import { cs } from '../../utils';
import { useConnectModal } from '../../providers';
import { SegmentedControl } from '../SegmentedControl'
import { AddWallet } from '../../assets/icons'

interface ViewComponent extends React.FC<ManageWalletsViewProps> {
  title?: string;
}

interface ManageWalletsViewProps {
  onBack: () => void;
  onModalClose: () => void;
}

export const ManageWalletsView: ViewComponent = ({ onBack, onModalClose }) => {
  const { chainType } = useChain();
  const config = useConfig();
  const [selectedNamespace, setSelectedNamespace] = useState<ChainType>(chainType)

  const { address: currentAddress, allAccounts, selectAccount } = useAccount({ namespace: selectedNamespace });

  const { open: openConnectModal } = useConnectModal();

  const _selectAccount = useCallback(
    (acc: AccountType) => {
      selectAccount?.(acc);
      onBack();
    },
    [onBack, selectAccount]
  );

  const handleAddWallet = useCallback(() => {
    onModalClose();
    openConnectModal?.(selectedNamespace);
  }, [onModalClose, openConnectModal, selectedNamespace]);

  return (
    <div className="luno:flex luno:flex-col luno:gap-1.5 luno:overflow-auto luno:max-h-[400px] luno:no-scrollbar luno:p-4 luno:pt-0">
      {config?.evm && (
        <SegmentedControl
          items={[
            { value: ChainType.SUBSTRATE, label: 'Polkadot' },
            { value: ChainType.EVM, label: 'EVM' },
          ]}
          value={selectedNamespace}
          onChange={(v) => setSelectedNamespace(v as ChainType)}
          className={'luno:mb-3'}
        />
      )}
      {allAccounts.length > 0 ? (
        allAccounts.map((acc) => (
          <AccountItem
            key={acc.address}
            account={acc}
            isSelected={acc.address === currentAddress}
            selectAccount={_selectAccount}
            namespace={selectedNamespace}
          />
        ))
      ) : (
        <button
          type="button"
          onClick={handleAddWallet}
          className={cs(
            'luno:px-3 luno:py-4 luno:w-full luno:rounded-accountSelectItem luno:border-none',
            'luno:bg-accountSelectItemBackground',
            'luno:text-left luno:cursor-pointer luno:flex luno:items-center luno:gap-2',
            'luno:font-medium luno:text-sm luno:leading-sm luno:text-accountSelectItemText',
            'luno:hover:bg-accountSelectItemBackgroundHover luno:transition-colors luno:duration-200'
          )}
        >
          <AddWallet width={'16px'} height={'16px'} />
          {selectedNamespace === ChainType.SUBSTRATE ? 'Add Polkadot Wallet' : 'Add EVM Wallet'}
        </button>
      )}
    </div>
  );
};

ManageWalletsView.title = 'Manage Wallets';

interface AccountItemProps {
  isSelected: boolean;
  account: AccountType;
  selectAccount: (acc: AccountType) => void;
  namespace: ChainType;
}

const AccountItem: React.FC<AccountItemProps> = React.memo(
  ({ isSelected, account, selectAccount, namespace }) => {
    const { chain } = useChain({ namespace });
    const chains = useChains({ namespace });
    const address = account.address;
    const { data: balance } = useBalance({ namespace, address: chains.length > 0 ? address : undefined });
    const connector = useActiveConnector({ namespace });

    return (
      <button
        type="button"
        onClick={() => selectAccount(account)}
        className={cs(
          'luno:px-3.5 luno:py-2.5 luno:w-full luno:rounded-accountSelectItem luno:border-none',
          'luno:bg-accountSelectItemBackground',
          'luno:text-left luno:flex luno:items-center luno:justify-between luno:gap-2',
          'luno:transition-colors luno:duration-200',
          'luno:cursor-pointer luno:hover:bg-accountSelectItemBackgroundHover'
        )}
        aria-label={account.name || address}
      >
        <div className="luno:flex luno:items-center luno:gap-2 luno:grow luno:overflow-hidden">
          <div className="luno:shrink-0 luno:w-[24px] luno:h-[24px] luno:rounded-full luno:flex luno:items-center luno:justify-center">
            {connector?.icon && <img src={connector?.icon} alt="luno account" />}
          </div>
          <div className="luno:flex luno:flex-col luno:items-start luno:overflow-hidden">
            <span className="luno:whitespace-nowrap luno:max-w-full luno:text-ellipsis luno:overflow-hidden luno:font-medium luno:text-sm luno:leading-sm luno:text-accountSelectItemText">
              {account.name || Substrate.formatAddress(address)}
            </span>
            {chains.length > 0 &&
              (balance ? (
                <span className="luno:text-xs luno:text-modalTextSecondary luno:font-medium">
                  {balance?.formatted || '0.00'}{' '}
                  {chain?.nativeCurrency?.symbol || 'DOT'}
                </span>
              ) : (
                <span className="luno:animate-pulse luno:rounded luno:w-[60px] luno:h-[16px] luno:bg-skeleton" />
              ))}
          </div>
        </div>

        {isSelected && (
          <div className="luno:shrink-0 luno:border-[1px] luno:border-solid luno:border-accentColor luno:rounded-full luno:overflow-hidden luno:flex luno:items-center luno:justify-center luno:w-[18px] luno:h-[18px]">
            <div className="luno:rounded-full luno:bg-accentColor luno:w-[10px] luno:h-[10px]" />
          </div>
        )}
      </button>
    );
  }
);
