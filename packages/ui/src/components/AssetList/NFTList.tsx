import React, { useMemo, useState } from 'react'
import { type AssetItem as AssetItemType, useSubscanTokens } from '../../hooks/useSubscanTokens'
import { cs } from '../../utils'
import { Link } from '../../assets/icons'
import {useAccount, useChain} from '@luno-kit/react'

export const NFTList = React.memo(() => {
  const { data, isLoading, error } = useSubscanTokens();

  const listData: AssetItemType[] = useMemo(() => {
    if (!data) return [];

    return data.nfts;
  }, [data]);

  if (isLoading) {
    return (
      <div className="flex flex-wrap justify-center gap-4 min-h-[300px]">
        {[1, 2, 3, 4, 5, 6].map((num) => (
          <div
            key={`skeleton-${num}`}
            className="animate-pulse bg-networkSelectItemBackground w-[145px] h-[180px] rounded-networkSelectItem"
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
        <div className="text-modalTextSecondary mb-2">No NFTs found</div>
        <div className="text-sm text-modalTextSecondary">
          Connect to a different chain or address to view more assets
        </div>
      </div>
    );
  }

  return (
    <div className="flex justify-center w-full px-[10px]">
      <div className="flex flex-wrap justify-start gap-4 max-w-[320px] w-full">
        {listData.map((item) => (
          <NFTItem asset={item} key={`${item.symbol}-${item.balance}`} />
        ))}
      </div>
    </div>
  )
})

interface NFTItemProps {
  asset: AssetItemType;
}

const NFTItem: React.FC<NFTItemProps> = React.memo(({ asset }) => {
  const { chain } = useChain();
  const { address } = useAccount();
  const [isLoading, setIsLoading] = useState(!!asset.logoURI);

  const linkExplorer = useMemo(() => {
    if (!chain?.subscan?.url) return ''

    const subscanUrl = chain.subscan.url.endsWith('/')
      ? chain.subscan.url.slice(0, -1)
      : chain.subscan.url;
    return `${subscanUrl}/nft_item?collection_id=${asset.assetId}&address=${address}`
  }, [chain, asset, address])

  return (
    <div
      className={cs(
        'w-[145px] h-[180px] flex items-center px-2 rounded-networkSelectItem cursor-default',
        'bg-networkSelectItemBackground',
        'transition-colors duration-200'
      )}
    >
      <div className="flex flex-col items-center justify-center gap-1">
        <div className={'relative w-[125px] h-[125px] flex items-center justify-center rounded-[6px] overflow-hidden'}>
          {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center animate-pulse bg-gray-500">
              <div className="w-4 h-4 border-2 border-t-transparent border-white rounded-full animate-spin" />
            </div>
          )}
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
        </div>

        <div className={'flex items-center justify-between w-full'}>
          <span className="font-medium text-base leading-base text-modalText">
            {asset.balance || '-'} NFTs
          </span>
          <button
            className="flex items-center justify-center w-[16px] h-[16px] cursor-pointer rounded-modalControlButton border-none hover:bg-modalControlButtonBackgroundHover transition-colors duration-200"
            onClick={() => linkExplorer && window.open(linkExplorer)}
            aria-label="Back"
          >
            <Link />
          </button>
        </div>
        <div className="w-full text-left text-xs text-modalTextSecondary font-medium whitespace-nowrap max-w-[120px] overflow-hidden text-ellipsis">
          {asset.symbol} {asset.symbol} {asset.symbol}
        </div>
      </div>
    </div>
  );
});
