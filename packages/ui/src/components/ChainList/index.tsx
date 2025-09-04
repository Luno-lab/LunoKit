import React, { useMemo, useState } from 'react'
import { cs } from '../../utils'
import { useApi, useChain, useChains, useSwitchChain } from '@luno-kit/react'
import type { Chain } from '@luno-kit/react/types'
import { ChainIcon } from '../ChainIcon'

interface ChainListProps {
  onChainSwitched?: (chain: Chain) => void;
}

export const ChainList: React.FC<ChainListProps> = ({ onChainSwitched }: ChainListProps) => {
  const { chain: currentChain } = useChain();
  const chains = useChains();
  const { switchChainAsync } = useSwitchChain();
  const { isApiReady, apiError } = useApi()

  const [switchingChain, setSwitchingChain] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredChains = useMemo(() => {
    return chains
      .filter(chain =>
        searchQuery.trim()
          ? chain.name.toLowerCase().includes(searchQuery.toLowerCase())
          : true
      )
  }, [chains, searchQuery]);

  const handleChainSelect = async (chain: Chain) => {
    if (chain.genesisHash === currentChain?.genesisHash) return;
    if (!isApiReady && !apiError) return

    setSwitchingChain(chain.genesisHash);
    try {
      await switchChainAsync({ chainId: chain.genesisHash });
      onChainSwitched?.(chain);
    } catch (error) {
      console.error('Failed to switch chain:', error);
    } finally {
      setSwitchingChain(null);
    }
  };

  return (
    <>
      <div className="relative pt-1">
        <input
          type="text"
          placeholder="Search by name"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-accentColor focus:outline-none focus:border-transparent"
        />
      </div>

      {filteredChains.length > 0 && (
        <div className="flex flex-col gap-1.5 overflow-y-auto custom-scrollbar max-h-[450px]">
          {filteredChains.map(chain => (
            <ChainItem
              key={chain.genesisHash}
              chain={chain}
              isSelected={chain.genesisHash === currentChain?.genesisHash}
              onSelect={handleChainSelect}
              isLoading={(switchingChain === chain.genesisHash || !isApiReady) && !apiError}
            />
          ))}
        </div>
      )}

      {filteredChains.length === 0 && (
        <div className="flex items-center justify-center py-12">
          <span className="text-modalTextSecondary text-xs">
            No chains available
          </span>
        </div>
      )}
    </>
  )
}

interface ChainItemProps {
  chain: Chain;
  isSelected: boolean;
  isLoading: boolean;
  onSelect: (chain: Chain) => void;
}

const ChainItem: React.FC<ChainItemProps> = React.memo(({
  chain,
  isSelected,
  isLoading,
  onSelect
}) => {
  return (
    <button
      onClick={() => onSelect(chain)}
      disabled={isSelected || isLoading}
      className={cs(
        'flex items-center justify-between p-2.5 rounded-networkSelectItem',
        'bg-networkSelectItemBackground',
        'transition-colors duration-200',
        (isSelected || isLoading)
          ? 'cursor-default'
          : 'cursor-pointer hover:bg-networkSelectItemBackgroundHover',
        isLoading && 'opacity-80'
      )}>
      <div className="flex items-center gap-2">
        <ChainIcon
          className={'w-[20px] h-[20px] flex items-center justify-center leading-[20px]'}
          chainIconUrl={chain?.chainIconUrl}
          chainName={chain?.name}
        />

        <div className="flex flex-col items-start">
          <span className="font-medium text-base text-modalText">
            {chain.name}
          </span>
        </div>
      </div>

      <div className="flex items-center justify-center h-[20px]">
        {isSelected
          ? isLoading
            ? (
              <>
                <span className="text-accentColor text-xs leading-xs mr-1.5">Switching</span>
                <div className="loading text-accentColor w-[15px] h-[15px]"></div>
              </>
            )
            : (
              <span className="status-dot-container">
                <span className="ping-animation"></span>
                <span className="status-dot"></span>
              </span>
            )
          : null
        }
      </div>
    </button>
  );
});
