import { useAccount, useChain, useConfig } from '@luno-kit/react';
import { formatBalance } from '@luno-kit/react/utils';
import { useQuery } from '@tanstack/react-query';

export interface AssetItem {
  balance: string;
  decimals: number;
  balanceFormatted: string;
  logoURI?: string;
  symbol: string;
  assetId: string;
  price?: string;
  contract?: string;
}

interface AssetData {
  balance: string;
  decimals: number;
  token_image?: string;
  unique_id?: string;
  symbol: string;
  asset_id?: string;
  price?: string;
  contract?: string;
}

const fetchAssets = async ({
  apiUrl,
  apiKey,
  address,
}: {
  apiUrl: string;
  apiKey: string;
  address: string;
}): Promise<{ nfts: AssetItem[]; tokens: AssetItem[] }> => {
  try {
    const response = await fetch(`${apiUrl}/api/scan/account/tokens`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-API-Key': apiKey,
      },
      body: JSON.stringify({ address }),
    });

    if (!response.ok) {
      throw new Error(`Subscan API error: ${response.status}`);
    }

    const result = await response.json();

    if (result.code !== 0) {
      throw new Error(`Subscan API error: ${result.message}`);
    }

    const assets = result.data.assets || [];
    const native = result.data.native || [];

    const erc721 = result.data.ERC721 || [];
    const erc20 = result.data.ERC20 || [];
    const builtin = result.data.builtin || [];

    const nfts = assets
      .filter((i: AssetData) => i.token_image || i.unique_id?.includes('nft'))
      .map((i: AssetData) => ({
        balance: i.balance,
        decimals: i.decimals,
        balanceFormatted: formatBalance(i.balance, i.decimals),
        logoURI: i.token_image,
        symbol: i.symbol,
        assetId: i.asset_id,
        price: i.price,
      }));

    const erc721Nfts = erc721.map((i: AssetData) => ({
      balance: i.balance,
      decimals: i.decimals,
      balanceFormatted: formatBalance(i.balance, i.decimals),
      logoURI: i.token_image,
      symbol: i.symbol,
      assetId: i.unique_id,
      contract: i.contract,
      price: i.price,
    }));

    const tokens = assets
      .filter((i: AssetData) => !i.token_image && !i.unique_id?.includes('nft'))
      .map((i: AssetData) => ({
        balance: i.balance,
        decimals: i.decimals,
        balanceFormatted: formatBalance(i.balance, i.decimals, 4),
        logoURI: i.token_image,
        symbol: i.symbol,
        assetId: i.asset_id,
        price: i.price,
      }));

    const nativeTokens = native.map((i: AssetData) => ({
      balance: i.balance,
      decimals: i.decimals,
      balanceFormatted: formatBalance(i.balance, i.decimals, 4),
      logoURI: '',
      symbol: i.symbol,
      assetId: 0,
      price: i.price,
    }));

    const builtinTokens = builtin.map((i: AssetData) => ({
      balance: i.balance,
      decimals: i.decimals,
      balanceFormatted: formatBalance(i.balance, i.decimals, 4),
      logoURI: '',
      symbol: i.symbol,
      assetId: i.unique_id,
      price: i.price,
    }));

    const erc20Tokens = erc20.map((i: AssetData) => ({
      balance: i.balance,
      decimals: i.decimals,
      balanceFormatted: formatBalance(i.balance, i.decimals, 4),
      logoURI: '',
      symbol: i.symbol,
      assetId: i.unique_id,
      price: i.price,
    }));

    return {
      nfts: [...nfts, ...erc721Nfts],
      tokens: [...nativeTokens, ...tokens, ...builtinTokens, ...erc20Tokens],
    };
  } catch (error) {
    console.error('Failed to fetch tokens from Subscan:', error);
    throw error;
  }
};

export function useSubscanTokens() {
  const { address } = useAccount();
  const config = useConfig();
  const { chain } = useChain();

  const apiUrl = chain?.subscan?.api;
  const apiKey = config?.subscan?.apiKey;

  return useQuery({
    queryKey: ['subscan', 'asset-list', address, chain?.genesisHash, apiUrl, apiKey],
    queryFn: () => fetchAssets({ address: address!, apiKey: apiKey!, apiUrl: apiUrl! }),
    enabled: !!address && !!apiKey && !!apiUrl,
    staleTime: config?.subscan?.cacheTime || 60000,
  });
}
