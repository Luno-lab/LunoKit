import { useApi, useChain, useChains, useSwitchChain } from '@luno-kit/react';
import type { Chain } from '@luno-kit/react/types';
import React, { useMemo, useState } from 'react';
import { Search } from '../../assets/icons';
import { cs } from '../../utils';
import { Icon } from '../Icon';

interface ChainListProps {
  onChainSwitched?: (chain: Chain) => void;
  className?: string;
}

export const ChainList: React.FC<ChainListProps> = ({
  onChainSwitched,
  className = '',
}: ChainListProps) => {
  const { chain: currentChain } = useChain();
  const chains = useChains();
  const { switchChainAsync } = useSwitchChain();
  const { isApiReady, apiError } = useApi();

  const [switchingChain, setSwitchingChain] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredChains = useMemo(() => {
    return chains.filter((chain) =>
      searchQuery.trim() ? chain.name.toLowerCase().includes(searchQuery.toLowerCase()) : true
    );
  }, [chains, searchQuery]);

  const handleChainSelect = async (chain: Chain) => {
    if (chain.genesisHash === currentChain?.genesisHash) return;
    if (!isApiReady && !apiError) return;

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
    <div className={cs('luno:flex luno:flex-col luno:gap-3.5', className)}>
      <div className="luno:relative luno:pt-1">
        <div className="luno:relative">
          <Search className="luno:absolute luno:left-3 luno:top-1/2 luno:transform luno:-translate-y-1/2 luno:w-4 luno:h-4 luno:text-modalTextSecondary" />
          <input
            type="text"
            placeholder="Search by name"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="luno:w-full luno:pl-10 luno:pr-3 luno:py-2 luno:text-sm luno:border luno:border-networkSelectItemBackgroundHover luno:rounded-md luno:focus:ring-2 luno:focus:ring-accentColor luno:focus:outline-none luno:focus:border-transparent"
          />
        </div>
      </div>

      {filteredChains.length > 0 && (
        <div className="luno:flex luno:flex-col luno:gap-1.5 luno:overflow-y-auto luno:max-h-[380px]">
          {filteredChains.map((chain) => (
            <ChainItem
              key={chain.genesisHash}
              chain={chain}
              isSelected={chain.genesisHash === currentChain?.genesisHash}
              onSelect={handleChainSelect}
              isLoading={(switchingChain === chain.genesisHash || !isApiReady) && !apiError}
              isSwitching={switchingChain === chain.genesisHash}
            />
          ))}
        </div>
      )}

      {filteredChains.length === 0 && (
        <div className="luno:flex luno:items-center luno:justify-center luno:py-12">
          <span className="luno:text-modalTextSecondary luno:text-xs">No chains available</span>
        </div>
      )}
    </div>
  );
};

interface ChainItemProps {
  chain: Chain;
  isSelected: boolean;
  isLoading: boolean;
  onSelect: (chain: Chain) => void;
  isSwitching: boolean;
}

const ChainItem: React.FC<ChainItemProps> = React.memo(
  ({ chain, isSelected, isLoading, onSelect, isSwitching }) => {
    return (
      <button
        onClick={() => onSelect(chain)}
        disabled={isSelected || isLoading}
        className={cs(
          'luno:flex luno:items-center luno:justify-between luno:p-2.5 luno:rounded-networkSelectItem',
          'luno:bg-networkSelectItemBackground',
          'luno:transition-colors luno:duration-200',
          isSelected || isLoading
            ? 'luno:cursor-default'
            : 'luno:cursor-pointer luno:hover:bg-networkSelectItemBackgroundHover',
          isLoading && 'luno:opacity-80'
        )}
      >
        <div className="luno:flex luno:items-center luno:gap-2">
          <Icon
            className={'luno:w-[20px] luno:h-[20px] luno:flex luno:items-center luno:justify-center luno:leading-[20px]'}
            iconUrl={chain?.chainIconUrl}
            resourceName={`${chain?.name}-chain`}
          />

          <div className="luno:flex luno:flex-col luno:items-start">
            <span className="luno:font-medium luno:text-base luno:text-modalText">{chain.name}</span>
          </div>
        </div>

        <div className="luno:flex luno:items-center luno:justify-center luno:h-[20px]">
          {isSelected ? (
            isLoading ? (
              <>
                <span className="luno:text-accentColor luno:text-xs luno:leading-xs luno:mr-1.5">
                  {isSwitching ? 'Switching' : 'Connecting'}
                </span>
                <div className="loading luno:text-accentColor luno:w-[15px] luno:h-[15px]"></div>
              </>
            ) : (
              <span className="luno:relative luno:flex luno:w-[10px] luno:h-[10px]">
                <span className="luno:[animation:ping_1.2s_cubic-bezier(0,0,0.2,1)_infinite] luno:absolute luno:top-[0] luno:left-[0] luno:inline-flex luno:h-full luno:w-full luno:rounded-full luno:bg-accentColor luno:opacity-75" />
                <span className="luno:relative luno:inline-flex luno:rounded-full luno:h-full luno:w-full luno:bg-accentColor"></span>
              </span>
            )
          ) : null}
        </div>
      </button>
    );
  }
);
