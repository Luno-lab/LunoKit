import { useAccount, useChain } from '@luno-kit/react';
import React, { useMemo, useState } from 'react';
import { DefaultNFT, Link } from '../../assets/icons';
import { type AssetItem as AssetItemType, useSubscanTokens } from '../../hooks/useSubscanTokens';
import { cs } from '../../utils';
import { EmptyAsset } from './EmptyAsset';

export const NFTList = React.memo(() => {
  const { data, isLoading, error } = useSubscanTokens();

  const listData: AssetItemType[] = useMemo(() => {
    if (!data) return [];

    return data.nfts;
  }, [data]);

  if (isLoading) {
    return (
      <div className="flex justify-center w-full">
        <div className="flex flex-wrap justify-between max-w-[350px] w-full min-h-[300px] gap-y-4">
          {[1, 2, 3, 4].map((num) => (
            <div
              key={`skeleton-${num}`}
              className="animate-pulse bg-skeleton w-[155px] h-[198px] rounded-assetSelectItem"
            />
          ))}
        </div>
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
    return <EmptyAsset type={'NFTs'} />;
  }

  return (
    <div className="flex justify-center w-full">
      <div className="flex flex-wrap justify-between max-w-[350px] w-full gap-y-4" role="list" aria-label="NFT list">
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

    if (asset.contract) return `${subscanUrl}/nft_item?contract=${asset.contract}&address=${address}`
    return `${subscanUrl}/nft_item?collection_id=${asset.assetId}&address=${address}`;
  }, [chain, asset, address]);

  return (
    <div
      role="listitem"
      className={cs(
        'w-[155px] h-[198px] flex items-center p-2.5 rounded-assetSelectItem cursor-default',
        'bg-assetSelectItemBackground',
        'transition-colors duration-200'
      )}
    >
      <div className="flex flex-col items-center justify-center">
        <div
          className={
            'relative w-[135px] h-[135px] flex items-center justify-center rounded-[6px] overflow-hidden'
          }
        >
          {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center animate-pulse bg-gray-500">
              <div className="w-4 h-4 border-2 border-t-transparent border-white rounded-full animate-spin" />
            </div>
          )}
          {asset.logoURI ? (
            <img
              src={asset.logoURI}
              alt={`${asset.symbol}-NFT`}
              className={cs(
                'w-full h-full object-cover',
                isLoading ? 'opacity-0' : 'opacity-100 transition-opacity duration-200'
              )}
              onLoad={() => setIsLoading(false)}
              onError={() => setIsLoading(false)}
            />
          ) : (
            <DefaultNFT className={'w-full h-full object-cover'}/>
          )}
        </div>

        <div className={'flex items-center justify-between w-full mt-0.5'}>
          <span className="font-medium text-sm leading-sm text-modalText">
            {asset.balance || '-'} NFTs
          </span>
          <button
            className="cursor-pointer bg-transparent border-none p-1 m-0 inline-flex items-center justify-center gap-1 rounded-modalControlButton hover:bg-modalControlButtonBackgroundHover transition-colors duration-200"
            onClick={() => linkExplorer && window.open(linkExplorer)}
            aria-label="Back"
          >
            <Link />
          </button>
        </div>
        <div className="w-full text-left text-xs text-modalTextSecondary font-medium whitespace-nowrap max-w-[135px] overflow-hidden text-ellipsis">
          {asset.symbol || asset.assetId}
        </div>
      </div>
    </div>
  );
});
