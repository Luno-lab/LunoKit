import { useAccount, useChain, useConfig } from '@luno-kit/react'
import { formatBalance } from '@luno-kit/react/utils';
import { useQuery } from '@tanstack/react-query'

export interface AssetItem {
  balance: string;
  decimals: number;
  balanceFormatted: string;
  logoURI: string;
  symbol: string;
}

const fetchAssets = async ({
  apiUrl, apiKey, address
}: { apiUrl: string; apiKey: string; address: string }): Promise<{ nfts: AssetItem[]; tokens: AssetItem[] }> => {
  try {
    const response = await fetch(`${apiUrl}/api/scan/account/tokens`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-API-Key': apiKey
      },
      //todo
      // body: JSON.stringify({ address })
      body: JSON.stringify({ address: '13zFVp9pdsJCJPeVBBRiSAkhBgZ4qENVEZBvfbs9Ft4rHVM8' })
    });

    if (!response.ok) {
      throw new Error(`Subscan API error: ${response.status}`);
    }

    const result = await response.json();

    if (result.code !== 0) {
      throw new Error(`Subscan API error: ${result.message}`);
    }

    const assets = result.data.assets

    const nfts = assets
      .filter(i => i.token_image || i.unique_id.includes('nft'))
      .map(i => ({
        balance: i.balance,
        decimals: i.decimals,
        balanceFormatted: formatBalance(i.balance),
        logoURI: i.token_image,
        symbol: i.symbol,
      }))

    const tokens = assets
      .filter(i => !i.token_image && !i.unique_id.includes('nft'))
      .map(i => ({
        balance: i.balance,
        decimals: i.decimals,
        balanceFormatted: formatBalance(i.balance, i.decimals),
        logoURI: i.token_image,
        symbol: i.symbol,
      }))

    return {
      nfts: nfts || [],
      tokens: tokens || [],
    }

  } catch (error) {
    console.error('Failed to fetch tokens from Subscan:', error);
    throw error;
  }
}

export function useSubscanTokens() {
  const { address } = useAccount();
  const config = useConfig();
  const { chain } = useChain()

  const apiUrl = chain?.subscan?.url
  const apiKey = config?.subscan?.apiKey;

  return useQuery({
    queryKey: ['subscan', 'asset-list', address, chain?.genesisHash, apiUrl, apiKey],
    queryFn: () => fetchAssets({ address: address!, apiKey: apiKey!, apiUrl: apiUrl!}),
    enabled: !!address && !!apiKey && !!apiUrl,
    staleTime: config?.subscan?.cacheTime || 60000
  });
}
