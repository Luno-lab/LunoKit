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
      <div className="luno:flex luno:flex-col luno:gap-1.5 luno:min-h-[300px]">
        {[1, 2, 3, 4, 5].map((num) => (
          <div
            key={`skeleton-${num}`}
            className="luno:animate-pulse luno:bg-skeleton luno:h-[54px] luno:rounded-assetSelectItem"
          />
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="luno:flex luno:flex-col luno:items-center luno:justify-center luno:min-h-[300px] luno:text-center luno:p-4">
        <div className="luno:text-error luno:mb-2">Failed to load assets</div>
        <div className="luno:text-modalTextSecondary luno:text-sm">
          {error instanceof Error ? error.message : 'Unknown error'}
        </div>
      </div>
    );
  }

  if (!listData.length) {
    return <EmptyAsset type={'Tokens'} />;
  }

  return (
    <div className="luno:flex luno:flex-col luno:gap-1.5">
      {listData.map((item) => (
        <TokenItem asset={item} key={`${item.symbol}-${item.assetId}`} />
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
        'luno:flex luno:items-center luno:justify-between luno:p-2.5 luno:rounded-assetSelectItem luno:cursor-default',
        'luno:bg-assetSelectItemBackground',
        'luno:transition-colors luno:duration-200'
      )}
    >
      <div className="luno:flex luno:items-center luno:gap-2">
        <Icon
          className={'luno:w-[30px] luno:h-[30px] luno:flex luno:items-center luno:justify-center'}
          iconUrl={iconUrl}
          resourceName={`${asset.symbol}-token`}
        />

        <div className="luno:flex luno:flex-col luno:items-start">
          <span className="luno:font-medium luno:text-sm luno:leading-sm luno:text-modalText">
            {asset.symbol || 'Unknown'}
          </span>
          <span className={'luno:text-xs luno:text-modalTextSecondary luno:font-medium luno:whitespace-nowrap'}>
            {asset.balanceFormatted}
          </span>
        </div>
      </div>

      {asset.price && (
        <div className="luno:flex luno:flex-col luno:items-end">
          <span className="luno:font-medium luno:text-sm luno:leading-sm luno:text-modalText">{displayValue}</span>
          <span className={'luno:text-xs luno:text-modalTextSecondary luno:font-medium luno:whitespace-nowrap'}>
            ${asset.price}
          </span>
        </div>
      )}
    </div>
  );
});
