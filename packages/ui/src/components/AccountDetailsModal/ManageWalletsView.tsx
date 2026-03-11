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
import React, { useCallback, useMemo, useState } from 'react';
import { cs } from '../../utils';
import { useConnectModal } from '../../providers';
import { FadeSwitch } from '../FadeSwitch';
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

  const showNamespaceToggle = !!config?.substrate && !!config?.evm;

  const { open: openConnectModal } = useConnectModal();

  const handleSelectAccount = useCallback(
    (acc: AccountType) => {
      onBack();
    },
    [onBack]
  );

  const handleAddWallet = useCallback((namespace: ChainType) => {
    onModalClose();
    openConnectModal?.(namespace);
  }, [onModalClose, openConnectModal]);

  const items = useMemo(() => {
    const result = [];
    if (config?.substrate) {
      result.push({
        value: ChainType.SUBSTRATE,
        content: (
          <NamespaceAccountList
            namespace={ChainType.SUBSTRATE}
            onSelectAccount={handleSelectAccount}
            onAddWallet={() => handleAddWallet(ChainType.SUBSTRATE)}
          />
        ),
      });
    }
    if (config?.evm) {
      result.push({
        value: ChainType.EVM,
        content: (
          <NamespaceAccountList
            namespace={ChainType.EVM}
            onSelectAccount={handleSelectAccount}
            onAddWallet={() => handleAddWallet(ChainType.EVM)}
          />
        ),
      });
    }
    return result;
  }, [config?.substrate, config?.evm, handleSelectAccount, handleAddWallet]);

  return (
    <div className="luno:flex luno:flex-col luno:gap-3.5 luno:p-4 luno:pt-0">
      {showNamespaceToggle && (
        <SegmentedControl
          items={[
            { value: ChainType.SUBSTRATE, label: 'Polkadot' },
            { value: ChainType.EVM, label: 'EVM' },
          ]}
          value={selectedNamespace}
          onChange={(v) => setSelectedNamespace(v as ChainType)}
        />
      )}

      <FadeSwitch
        activeValue={selectedNamespace}
        items={items}
        animate={showNamespaceToggle}
        height="360px"
      />
    </div>
  );
};

ManageWalletsView.title = 'Manage Wallets';

interface NamespaceAccountListProps {
  namespace: ChainType;
  onSelectAccount: (acc: AccountType) => void;
  onAddWallet: () => void;
}

const NamespaceAccountList: React.FC<NamespaceAccountListProps> = ({
  namespace,
  onSelectAccount,
  onAddWallet,
}) => {
  const { address: currentAddress, allAccounts, selectAccount } = useAccount({ namespace });

  const handleSelect = useCallback(
    (acc: AccountType) => {
      selectAccount?.(acc);
      onSelectAccount(acc);
    },
    [selectAccount, onSelectAccount]
  );

  if (allAccounts.length > 0) {
    return (
      <div className="luno:flex luno:flex-col luno:gap-1.5 luno:overflow-y-auto luno:max-h-[360px]">
        {allAccounts.map((acc) => {
          const isSelected = namespace === ChainType.SUBSTRATE
            ? Substrate.isSameAddress(acc.address, currentAddress!)
            : acc.address.toLowerCase() === currentAddress?.toLowerCase();

          return (
            <AccountItem
              key={acc.address}
              account={acc}
              isSelected={isSelected}
              selectAccount={handleSelect}
              namespace={namespace}
            />
          );
        })}
      </div>
    );
  }

  return (
    <button
      type="button"
      onClick={onAddWallet}
      className={cs(
        'luno:px-3 luno:py-4 luno:w-full luno:rounded-accountSelectItem luno:border-none',
        'luno:bg-accountSelectItemBackground',
        'luno:text-left luno:cursor-pointer luno:flex luno:items-center luno:gap-2',
        'luno:font-medium luno:text-sm luno:leading-sm luno:text-accountSelectItemText',
        'luno:hover:bg-accountSelectItemBackgroundHover luno:transition-colors luno:duration-200'
      )}
    >
      <AddWallet width={'16px'} height={'16px'} />
      {namespace === ChainType.SUBSTRATE ? 'Add Polkadot Wallet' : 'Add EVM Wallet'}
    </button>
  );
};

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
