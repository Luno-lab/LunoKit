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
    <div className={cs('luno:flex luno:flex-col luno:gap-3.5 luno:p-4 luno:pt-0')}>
      <div className={cs('luno:flex luno:items-center luno:gap-1.5 luno:w-full')}>
        {FILTER_TABS.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveFilter(tab.key)}
            className={cs(
              'luno:px-3.5 luno:flex luno:items-center luno:justify-center luno:cursor-pointer luno:min-w-[48px] luno:min-h-[24px] luno:rounded-networkSelectItem luno:text-[12px] luno:leading-[16px] luno:font-medium luno:transition-colors',
              activeFilter === tab.key
                ? 'luno:bg-navigationButtonBackground luno:text-modalText'
                : 'luno:bg-transparent text-modalTextSecondary luno:hover:text-modalText'
            )}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className={cs('luno:overflow-y-auto luno:flex-1 luno:min-h-[350px] luno:max-h-[350px]')}>
        {activeFilter === AssetFilter.tokens ? <TokenList /> : <NFTList />}
      </div>
    </div>
  );
};
