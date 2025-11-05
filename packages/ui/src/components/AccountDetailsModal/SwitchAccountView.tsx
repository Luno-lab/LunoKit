import {
  useAccount,
  useAccounts,
  useActiveConnector,
  useBalance,
  useChain,
  useChains,
} from '@luno-kit/react';
import type { Account } from '@luno-kit/react/types';
import { formatAddress } from '@luno-kit/react/utils';
import React, { useCallback } from 'react';
import { cs } from '../../utils';

interface ViewComponent extends React.FC<SwitchAccountViewProps> {
  title?: string;
}

interface SwitchAccountViewProps {
  onBack: () => void;
}

export const SwitchAccountView: ViewComponent = ({ onBack }) => {
  const { accounts, selectAccount } = useAccounts();
  const { address: currentAddress } = useAccount();

  const _selectAccount = useCallback(
    (acc: Account) => {
      selectAccount(acc);
      onBack();
    },
    [onBack]
  );

  return (
    <div className="luno:flex luno:flex-col luno:gap-1.5 luno:overflow-auto luno:max-h-[400px] luno:no-scrollbar luno:p-4 luno:pt-0">
      {accounts.map((acc) => (
        <AccountItem
          key={acc.address}
          account={acc}
          isSelected={acc.address === currentAddress}
          selectAccount={_selectAccount}
        />
      ))}
    </div>
  );
};

SwitchAccountView.title = 'Switch Account';

interface AccountItemProps {
  isSelected: boolean;
  account: Account;
  selectAccount: (acc: Account) => void;
}

const AccountItem: React.FC<AccountItemProps> = React.memo(
  ({ isSelected, account, selectAccount }) => {
    const { chain } = useChain();
    const chains = useChains();
    const address = account.address;
    const { data: balance } = useBalance({ address: chains.length > 0 ? address : undefined });
    const connector = useActiveConnector();

    return (
      <button
        type="button"
        onClick={() => selectAccount(account)}
        className={cs(
          'luno:px-3.5 luno:py-2.5 luno:w-full luno:rounded-accountSelectItem luno:border-none',
          'luno:bg-accountSelectItemBackground',
          'luno:text-left luno:flex luno:items-center luno:justify-between luno:gap-2',
          'luno:transition-colors luno:duration-200',
          isSelected
            ? 'luno:cursor-auto'
            : 'luno:cursor-pointer luno:hover:bg-accountSelectItemBackgroundHover'
        )}
        aria-label={account.name || address}
        disabled={isSelected}
      >
        <div className="luno:flex luno:items-center luno:gap-2 luno:grow luno:overflow-hidden">
          <div className="luno:shrink-0 luno:w-[24px] luno:h-[24px] luno:rounded-full luno:flex luno:items-center luno:justify-center">
            {connector?.icon && <img src={connector?.icon} alt="luno account" />}
          </div>
          <div className="luno:flex luno:flex-col luno:items-start luno:overflow-hidden">
            <span className="luno:whitespace-nowrap luno:max-w-full luno:text-ellipsis luno:overflow-hidden luno:font-medium luno:text-sm luno:leading-sm luno:text-accountSelectItemText">
              {account.name || formatAddress(address)}
            </span>
            {chains.length > 0 &&
              (balance ? (
                <span className="luno:text-xs luno:text-modalTextSecondary luno:font-medium">
                  {balance?.formattedTransferable || '0.00'}{' '}
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
