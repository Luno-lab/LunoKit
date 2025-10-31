import React, { useMemo } from 'react'
import { type AssetItem as AssetItemType, useSubscanTokens} from '../../hooks/useSubscanTokens'
import { cs } from '../../utils'
import { Icon } from '../Icon'
import {EmptyAsset} from './EmptyAsset'


const TOKEN_ICONS: Record<string, string> = {
  DOT: 'https://raw.githubusercontent.com/subscan-explorer/assets-info/main/logos/acala_custom_DOT.png',
  KSM: 'https://raw.githubusercontent.com/subscan-explorer/assets-info/main/logos/bifrost-kusama_custom_KSM.png',
  WND: 'https://westend.subscan.io/_next/image?url=%2Fchains%2Fwestend%2Ftokens%2FWND.png&w=3840&q=75',
  PAS: 'https://paseo.subscan.io/_next/image?url=%2Fchains%2Fpaseo%2Ftokens%2FPAS.png&w=3840&q=75',

  GLMR: 'https://raw.githubusercontent.com/subscan-explorer/assets-info/main/logos/acala_custom_GLMR.png',
  MOVR: 'https://raw.githubusercontent.com/subscan-explorer/assets-info/main/logos/bifrost-kusama_custom_MOVR.png',
  ASTR: 'https://raw.githubusercontent.com/subscan-explorer/assets-info/main/logos/acala_custom_ASTR.png',

  USDT: 'https://raw.githubusercontent.com/subscan-explorer/assets-info/main/logos/assethub-polkadot_asset_USDt.png',
  USDC: 'https://raw.githubusercontent.com/subscan-explorer/assets-info/main/logos/assethub-polkadot_asset_USDC.svg',
};

const getAssetIconUrl = (symbol: string): string => {
  const normalizedSymbol = symbol?.toUpperCase().trim() || '';

  if (TOKEN_ICONS[normalizedSymbol]) {
    return TOKEN_ICONS[normalizedSymbol];
  }

  return '';
};


export const TokenList = React.memo(() => {
  const { data, isLoading, error } = useSubscanTokens();

  const listData: AssetItemType[] = useMemo(() => {
    if (!data) return [];

    return data.tokens;
  }, [data]);

  if (isLoading) {
    return (
      <div className="flex flex-col gap-1.5 min-h-[300px]">
        {[1, 2, 3, 4, 5, 6, 7].map((num) => (
          <div
            key={`skeleton-${num}`}
            className="animate-pulse bg-skeleton h-[44px] rounded-networkSelectItem"
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
    return <EmptyAsset type={'Tokens'} />;
  }

  return (
    <div className="flex flex-col gap-1.5">
      {listData.map((item) => (
        <TokenItem asset={item} key={`${item.symbol}-${item.balance}`} />
      ))}
    </div>
  )
})

interface TokenItemProps {
  asset: AssetItemType;
}

const TokenItem: React.FC<TokenItemProps> = React.memo(({ asset }) => {
  const iconUrl = asset.logoURI || getAssetIconUrl(asset.symbol);

  return (
    <div
      className={cs(
        'flex items-center justify-between p-2.5 rounded-networkSelectItem cursor-default',
        'bg-networkSelectItemBackground',
        'transition-colors duration-200'
      )}
    >
      <div className="flex items-center gap-2">
        <Icon
          className={'w-[30px] h-[30px] flex items-center justify-center leading-[25px]'}
          iconUrl={iconUrl}
          resourceName={`${asset.symbol}-token`}
        />

        <div className="flex flex-col items-start">
          <span className="font-medium text-base leading-base text-modalText">
            {asset.symbol || 'Unknown'}
          </span>
          <span className={'text-xs text-modalTextSecondary font-medium whitespace-nowrap'}>
            {asset.balanceFormatted}
          </span>
        </div>
      </div>
    </div>
  );
});
