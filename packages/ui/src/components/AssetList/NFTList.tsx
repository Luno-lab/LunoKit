import { useAccount, useChain } from '@luno-kit/react';
import React, { useMemo, useState } from 'react';
import { DefaultNFT, Link } from '../../assets/icons';
import { type AssetItem as AssetItemType, useSubscanTokens } from '../../hooks/useSubscanTokens';
import { cs } from '../../utils';
import { EmptyAsset } from './EmptyAsset';

export const NFTList = React.memo(() => {
  const { data, isFetching, error } = useSubscanTokens();

  const listData: AssetItemType[] = useMemo(() => {
    if (!data) return [];

    return data.nfts;
  }, [data]);

  if (isFetching) {
    return (
      <div className="luno:flex luno:justify-center luno:w-full">
        <div className="luno:flex luno:flex-wrap luno:justify-between luno:max-w-[350px] luno:w-full luno:min-h-[300px] luno:gap-y-4">
          {[1, 2, 3, 4].map((num) => (
            <div
              key={`skeleton-${num}`}
              className="luno:animate-pulse luno:bg-skeleton luno:w-[155px] luno:h-[198px] luno:rounded-assetSelectItem"
            />
          ))}
        </div>
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
    return <EmptyAsset type={'NFTs'} />;
  }

  return (
    <div className="luno:flex luno:justify-center luno:w-full">
      <div
        className="luno:flex luno:flex-wrap luno:justify-between luno:max-w-[350px] luno:w-full luno:gap-y-4"
        role="list"
        aria-label="NFT list"
      >
        {listData.map((item) => (
          <NFTItem asset={item} key={`${item.symbol}-${item.balance}`} />
        ))}
      </div>
    </div>
  );
});

interface NFTItemProps {
  asset: AssetItemType;
}

const NFTItem: React.FC<NFTItemProps> = React.memo(({ asset }) => {
  const { chain } = useChain();
  const { address } = useAccount();
  const [isLoading, setIsLoading] = useState(!!asset.logoURI);

  const linkExplorer = useMemo(() => {
    if (!chain?.subscan?.url) return '';

    const subscanUrl = chain.subscan.url.endsWith('/')
      ? chain.subscan.url.slice(0, -1)
      : chain.subscan.url;

    return `${subscanUrl}/nft_item?collection_id=${asset.assetId}&address=${address}`;
  }, [chain, asset, address]);

  return (
    <div
      role="listitem"
      aria-label="b list"
      className={cs(
        'luno:w-[155px] luno:h-[198px] luno:flex luno:items-center luno:p-2.5 luno:rounded-assetSelectItem luno:cursor-default',
        'luno:bg-assetSelectItemBackground',
        'luno:transition-colors luno:duration-200'
      )}
    >
      <div className="luno:flex luno:flex-col luno:items-center luno:justify-center">
        <div
          className={
            'luno:relative luno:w-[135px] luno:h-[135px] luno:flex luno:items-center luno:justify-center luno:rounded-[6px] luno:overflow-hidden'
          }
        >
          {isLoading && (
            <div className="luno:absolute luno:inset-0 luno:flex luno:items-center luno:justify-center luno:animate-pulse luno:bg-gray-500">
              <div className="luno:w-4 luno:h-4 luno:border-2 luno:border-t-transparent luno:border-white luno:rounded-full luno:animate-spin" />
            </div>
          )}
          {asset.logoURI ? (
            <img
              src={asset.logoURI}
              alt={`${asset.symbol}-NFT`}
              className={cs(
                'luno:w-full luno:h-full luno:object-cover',
                isLoading ? 'luno:opacity-0' : 'luno:opacity-100 luno:transition-opacity luno:duration-200'
              )}
              onLoad={() => setIsLoading(false)}
              onError={() => setIsLoading(false)}
            />
          ) : (
            <DefaultNFT className={'luno:w-full luno:h-full luno:object-cover'} />
          )}
        </div>

        <div className={'luno:flex luno:items-center luno:justify-between luno:w-full luno:mt-0.5'}>
          <span className="luno:font-medium luno:text-sm luno:leading-sm tluno:ext-modalText">
            {asset.balance || '-'} NFTs
          </span>
          <button
            className="luno:cursor-pointer luno:bg-transparent luno:border-none luno:p-1 luno:m-0 luno:inline-flex luno:items-center luno:justify-center luno:gap-1 luno:rounded-modalControlButton luno:hover:bg-modalControlButtonBackgroundHover luno:transition-colors luno:duration-200"
            onClick={() => linkExplorer && window.open(linkExplorer)}
            aria-label="Back"
          >
            <Link />
          </button>
        </div>
        <div className="luno:w-full luno:text-left luno:text-xs luno:text-modalTextSecondary luno:font-medium luno:whitespace-nowrap luno:max-w-[135px] luno:overflow-hidden luno:text-ellipsis">
          {asset.symbol || asset.assetId}
        </div>
      </div>
    </div>
  );
});
