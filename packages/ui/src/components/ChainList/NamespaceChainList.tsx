import { useClient, useChain, useChains, useSwitchChain } from '@luno-kit/react';
import { type AnyChain, ChainType } from '@luno-kit/react/types';
import React, { useMemo, useState } from 'react';
import { Search } from '../../assets/icons';
import { ChainItem } from './ChainItem';

interface NamespaceChainListProps {
  namespace: ChainType;
  onChainSwitched?: (chain: AnyChain) => void;
}

export const NamespaceChainList: React.FC<NamespaceChainListProps> = ({
  namespace,
  onChainSwitched,
}) => {
  const { chain: currentChain } = useChain({ namespace });
  const chains = useChains({ namespace });
  const { switchChainAsync, isPending, variables } = useSwitchChain({ namespace });
  const { isReady: isClientReady, error: clientError } = useClient({ namespace });

  const [searchQuery, setSearchQuery] = useState('');

  const isSubstrateLoading = useMemo(() =>
    namespace === ChainType.SUBSTRATE && !isClientReady && !clientError,
    [namespace, isClientReady, clientError]
  );

  const filteredChains = useMemo(() => {
    return chains.filter((chain) =>
      searchQuery.trim() ? chain.name.toLowerCase().includes(searchQuery.toLowerCase()) : true
    );
  }, [chains, searchQuery]);

  const handleChainSelect = async (chain: AnyChain) => {
    if (chain.id === currentChain?.id) return;
    if (isPending || isSubstrateLoading) return;

    try {
      await switchChainAsync({ chainId: chain.id });
      onChainSwitched?.(chain);
    } catch (error) {
      console.error('Failed to switch chain:', error);
    }
  };

  return (
    <div className="luno:flex luno:flex-col luno:gap-3.5">
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
          {filteredChains.map((chain) => {
            const isSwitchTarget = isPending && variables?.chainId === chain.id;

            return (
              <ChainItem
                key={chain.id}
                chain={chain}
                isSelected={isSwitchTarget || (!isPending && chain.id === currentChain?.id)}
                onSelect={handleChainSelect}
                isLoading={(isSwitchTarget && !clientError) || isSubstrateLoading}
                isSwitching={isSwitchTarget}
              />
            );
          })}
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
