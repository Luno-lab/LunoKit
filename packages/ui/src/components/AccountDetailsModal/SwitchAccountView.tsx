import React, { useCallback } from 'react';
import { useAccount, useAccounts, useActiveConnector, useBalance, useChain } from '@luno-kit/react';
import { cs } from '../../utils';
import { formatAddress } from '@luno-kit/react';
import type { Account } from '@luno-kit/react';

interface ViewComponent extends React.FC<SwitchAccountViewProps> {
  title?: string;
}

interface SwitchAccountViewProps {
  onBack: () => void
}

export const SwitchAccountView: ViewComponent = ({ onBack }) => {
  const { accounts, selectAccount } = useAccounts();
  const { address: currentAddress } = useAccount();

  const _selectAccount = useCallback((acc: Account) => {
    selectAccount(acc)
    onBack()
  }, [onBack])

  return (
    <div className="flex flex-col gap-1.5 pt-3 overflow-auto max-h-[400px] no-scrollbar p-4 pt-0">
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

SwitchAccountView.title = 'Switch Accounts';

interface AccountItemProps {
  isSelected: boolean;
  account: Account;
  selectAccount: (acc: Account) => void
}

const AccountItem: React.FC<AccountItemProps> = React.memo(({
  isSelected,
  account,
  selectAccount
}) => {
  const { chain } = useChain();
  const address = account.address;
  const { data: balance } = useBalance({ address });
  const connector = useActiveConnector()

  return (
    <button
      type="button"
      onClick={() => selectAccount(account)}
      className={cs(
        'px-3.5 py-2.5 w-full rounded-accountSelectItem border-none',
        'bg-accountSelectItemBackground',
        'text-left flex items-center justify-between gap-2',
        'transition-colors duration-200',
        isSelected ? 'cursor-auto' : 'cursor-pointer hover:bg-accountSelectItemBackgroundHover'
      )}
      aria-label={account.name || address}
      disabled={isSelected}
    >
      <div className="flex items-center gap-2">
        <div className="shrink-0 w-[24px] h-[24px] bg-pink-500 rounded-full flex items-center justify-center">
          {connector?.icon && <img src={connector?.icon} alt="luno account"/>}
        </div>
        <div className="flex flex-col items-start">
          <span className="font-medium text-sm leading-sm text-accountSelectItemText">
            {account.name || formatAddress(address)}
          </span>
          <span className="text-xs text-modalTextSecondary font-medium">
            {balance === undefined ? (
              <div className="animate-pulse rounded w-[60px] h-[18px] bg-skeleton" />
            ) : (
              <>
                {balance?.formattedTransferable || '0.00'} {chain?.nativeCurrency?.symbol || 'DOT'}
              </>
            )}
          </span>
        </div>
      </div>

      {isSelected && (
        <div className="border-[1px] border-solid border-accentColor rounded-full overflow-hidden flex items-center justify-center w-[18px] h-[18px]">
          <div className="rounded-full bg-accentColor w-[10px] h-[10px]" />
        </div>
      )}
    </button>
  );
});
