import React, { useMemo, useState}  from 'react';
import { useSubscanTokens, AssetItem as AssetItemType } from '../../hooks/useSubscanTokens'
import { cs } from '../../utils'
import { Icon } from '../ChainIcon'

enum AssetFilter {
  tokens = 'Tokens',
  nfts = 'NFTs',
}

const FILTER_TABS = [
  { key: AssetFilter.tokens, label: AssetFilter.tokens },
  { key: AssetFilter.nfts, label: AssetFilter.nfts },
] as const;


const TOKEN_ICONS: Record<string, string> = {
  'DOT': 'https://raw.githubusercontent.com/subscan-explorer/assets-info/main/logos/acala_custom_DOT.png',
  'KSM': 'https://raw.githubusercontent.com/subscan-explorer/assets-info/main/logos/bifrost-kusama_custom_KSM.png',
  'WND': 'https://westend.subscan.io/_next/image?url=%2Fchains%2Fwestend%2Ftokens%2FWND.png&w=3840&q=75',
  'PAS': 'https://paseo.subscan.io/_next/image?url=%2Fchains%2Fpaseo%2Ftokens%2FPAS.png&w=3840&q=75',

  'GLMR': 'https://raw.githubusercontent.com/subscan-explorer/assets-info/main/logos/acala_custom_GLMR.png',
  'MOVR': 'https://raw.githubusercontent.com/subscan-explorer/assets-info/main/logos/bifrost-kusama_custom_MOVR.png',
  'ASTR': 'https://raw.githubusercontent.com/subscan-explorer/assets-info/main/logos/acala_custom_ASTR.png',

  'USDT': 'https://raw.githubusercontent.com/subscan-explorer/assets-info/main/logos/assethub-polkadot_asset_USDt.png',
  'USDC': 'https://raw.githubusercontent.com/subscan-explorer/assets-info/main/logos/assethub-polkadot_asset_USDC.svg',
};

const getAssetIconUrl = (symbol: string): string => {
  const normalizedSymbol = symbol?.toUpperCase().trim() || '';

  if (TOKEN_ICONS[normalizedSymbol]) {
    return TOKEN_ICONS[normalizedSymbol];
  }

  return '';
};

export const AssetList: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<AssetFilter>(AssetFilter.tokens);
  const { data, isLoading, error } = useSubscanTokens()

  const listData: AssetItemType[] = useMemo(() => {
    if (!data) return [];

    const key = activeFilter === AssetFilter.tokens ? 'tokens' : 'nfts';
    return data[key] || [];
  }, [activeFilter, data]);

  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="flex flex-col gap-1.5 min-h-[300px]">
          {Array(5).fill(0).map((_, index) => (
            <div
              key={`skeleton-${index}`}
              className="animate-pulse bg-networkSelectItemBackground h-[44px] rounded-networkSelectItem"
            />
          ))}
        </div>
      );
    }

    if (error) {
      return (
        <div className="flex flex-col items-center justify-center min-h-[300px] text-center p-4">
          <div className="text-red-500 mb-2">Failed to load assets</div>
          <div className="text-modalTextSecondary text-sm">
            {error instanceof Error ? error.message : 'Unknown error'}
          </div>
        </div>
      );
    }

    if (!listData.length) {
      return (
        <div className="flex flex-col items-center justify-center min-h-[300px] text-center">
          <div className="text-modalTextSecondary mb-2">No {activeFilter.toLowerCase()} found</div>
          <div className="text-sm text-modalTextSecondary">
            Connect to a different chain or address to view more assets
          </div>
        </div>
      );
    }

    return (
      <div className="flex flex-col gap-1.5">
        {listData.map((item) => (
          <AssetItem asset={item} key={`${item.symbol}-${item.balance}`} />
        ))}
      </div>
    );
  };

  return (
    <div className={'flex flex-col gap-3.5 p-4 pt-0'}>
      <div className="flex items-center gap-1.5 w-full">
        {FILTER_TABS.map(tab => (
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
        {renderContent()}
      </div>
    </div>
  );
};

interface AssetItemProps {
  asset: AssetItemType
}

const AssetItem: React.FC<AssetItemProps> = React.memo(
  ({ asset }) => {
    const iconUrl = asset.logoURI || getAssetIconUrl(asset.symbol);

    return (
      <div
        className={cs(
          'flex items-center justify-between p-2.5 rounded-networkSelectItem cursor-default',
          'bg-networkSelectItemBackground',
          'transition-colors duration-200',
        )}
      >
        <div className="flex items-center gap-2">
          <Icon
            className={'w-[30px] h-[30px] flex items-center justify-center leading-[25px]'}
            iconUrl={iconUrl}
            resourceName={`${asset.symbol}-asset`}
          />

          <div className="flex flex-col items-start">
            <span className="font-medium text-base leading-base text-modalText">{asset.symbol || 'Unknown'}</span>
            <span className={'text-xs text-modalTextSecondary font-medium whitespace-nowrap'}>
              {asset.balanceFormatted}
            </span>
          </div>
        </div>
      </div>
    );
  }
);
