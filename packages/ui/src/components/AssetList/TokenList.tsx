import React, { useMemo } from 'react';
import { type AssetItem as AssetItemType, useSubscanTokens } from '../../hooks/useSubscanTokens';
import { cs } from '../../utils';
import { Icon } from '../Icon';
import { EmptyAsset } from './EmptyAsset';

const getAssetIconUrl = (symbol: string): string => {
  const normalizedSymbol = symbol?.toLowerCase().trim() || '';

  return `https://raw.githubusercontent.com/Luno-lab/luno-assets/refs/heads/main/assets/tokens/${normalizedSymbol}.webp`;
};

export const TokenList = React.memo(() => {
  const { data, error, isFetching } = useSubscanTokens();

  const listData: AssetItemType[] = useMemo(() => {
    if (!data) return [];

    return data.tokens;
  }, [data]);

  if (isFetching) {
    return (
      <div className="flex flex-col gap-1.5 min-h-[300px]">
        {[1, 2, 3, 4, 5].map((num) => (
          <div
            key={`skeleton-${num}`}
            className="animate-pulse bg-skeleton h-[54px] rounded-assetSelectItem"
          />
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[300px] text-center p-4">
        <div className="text-error mb-2">Failed to load assets</div>
        <div className="text-modalTextSecondary text-sm">
          {error instanceof Error ? error.message : 'Unknown error'}
        </div>
      </div>
    );
  }

  if (!listData.length) {
    return <EmptyAsset type={'Tokens'} />;
  }

  return (
    <div className="flex flex-col gap-1.5" role="list" aria-label="Token list">
      {listData.map((item) => (
        <TokenItem asset={item} key={`${item.symbol}-${item.balance}`} />
      ))}
    </div>
  );
});

interface TokenItemProps {
  asset: AssetItemType;
}

const TokenItem: React.FC<TokenItemProps> = React.memo(({ asset }) => {
  const iconUrl = asset.logoURI || getAssetIconUrl(asset.symbol);

  const displayValue = React.useMemo(() => {
    if (!asset.price) return null;
    const balance = parseFloat(asset.balance) / 10 ** asset.decimals;
    const price = parseFloat(asset.price);
    const total = balance * price;
    return `$${total.toFixed(2)}`;
  }, [asset.balance, asset.decimals, asset.price]);

  return (
    <div
      role="listitem"
      className={cs(
        'flex items-center justify-between p-2.5 rounded-assetSelectItem cursor-default',
        'bg-assetSelectItemBackground',
        'transition-colors duration-200'
      )}
    >
      <div className="flex items-center gap-2">
        <Icon
          className={'w-[30px] h-[30px] flex items-center justify-center'}
          iconUrl={iconUrl}
          resourceName={`${asset.symbol}-token`}
        />

        <div className="flex flex-col items-start">
          <span className="font-medium text-sm leading-sm text-modalText">
            {asset.symbol || 'Unknown'}
          </span>
          <span className={'text-xs text-modalTextSecondary font-medium whitespace-nowrap'}>
            {asset.balanceFormatted}
          </span>
        </div>
      </div>

      {asset.price && (
        <div className="flex flex-col items-end">
          <span className="font-medium text-sm leading-sm text-modalText">{displayValue}</span>
          <span className={'text-xs text-modalTextSecondary font-medium whitespace-nowrap'}>
            ${asset.price}
          </span>
        </div>
      )}
    </div>
  );
});
