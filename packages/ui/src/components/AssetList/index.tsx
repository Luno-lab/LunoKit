import type React from 'react';
import { useState } from 'react';
import { cs } from '../../utils';
import { NFTList } from './NFTList';
import { TokenList } from './TokenList';

enum AssetFilter {
  tokens = 'Tokens',
  nfts = 'NFTs',
}

const FILTER_TABS = [
  { key: AssetFilter.tokens, label: AssetFilter.tokens },
  { key: AssetFilter.nfts, label: AssetFilter.nfts },
] as const;

export const AssetList: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<AssetFilter>(AssetFilter.tokens);

  return (
    <div className={'flex flex-col gap-3.5 p-4 pt-0'}>
      <div className="flex items-center gap-1.5 w-full">
        {FILTER_TABS.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveFilter(tab.key)}
            className={cs(
              'px-3.5 flex items-center justify-center cursor-pointer min-w-[48px] min-h-[24px] rounded-networkSelectItem text-[12px] leading-[16px] font-medium transition-colors',
              activeFilter === tab.key
                ? 'bg-navigationButtonBackground text-modalText'
                : 'bg-transparent text-modalTextSecondary hover:text-modalText'
            )}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="overflow-y-auto custom-scrollbar flex-1 min-h-[350px] max-h-[350px]">
        {activeFilter === AssetFilter.tokens ? <TokenList /> : <NFTList />}
      </div>
    </div>
  );
};
