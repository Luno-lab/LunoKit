import React, {useCallback} from 'react';
import { useAccount, useAccounts, useActiveConnector, useBalance, useChain } from '@luno-kit/react';
import { cs } from '../../utils';
import { formatAddress } from '@luno-kit/core';
import type { Account } from '@luno-kit/core';

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
    <div className="flex flex-col gap-[4px] pt-[12px] overflow-auto max-h-[400px] scrollbar-thin">
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

const AccountItem = ({
  isSelected,
  account,
  selectAccount
}: {
  isSelected: boolean;
  account: Account;
  selectAccount: (acc: Account) => void
}) => {
  const { chain } = useChain();
  const address = account.address;
  const { data: balance } = useBalance({ address });
  const connector = useActiveConnector()

  return (
    <div
      onClick={() => selectAccount(account)}
      className={cs(
        'bg-connectorItemBackground px-[14px] py-[10px] w-full rounded-sm border-none',
        'hover:opacity-90 transition-transform active:scale-[0.95]',
        'text-left flex items-center justify-between gap-[8px]',
        isSelected ? 'cursor-auto' : 'cursor-pointer'
      )}
    >
      <div className="flex items-center gap-[8px]">
        <div className="shrink-0 w-[24px] h-[24px] bg-pink-500 rounded-full flex items-center justify-center">
          {connector?.icon && <img src={connector?.icon} alt="luno account"/>}
        </div>
        <div className="flex flex-col items-start">
          <span className="font-[500] text-secondary leading-secondary text-modalFont">
            {account.name || formatAddress(address)}
          </span>
          <span className="text-sm text-secondaryFont text-accent leading-accent font-[500]">
            {balance?.formattedTransferable || '0.00'} {chain?.nativeCurrency?.symbol || 'DOT'}
          </span>
        </div>
      </div>

      {isSelected && (
        <div className="border-[1px] border-solid border-accentFont rounded-full overflow-hidden flex items-center justify-center w-[18px] h-[18px]">
          <div className="rounded-full bg-accentFont w-[10px] h-[10px]" />
        </div>
      )}
    </div>
  );
};
