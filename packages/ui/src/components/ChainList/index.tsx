import React, { useMemo, useState } from 'react'
import { cs } from '../../utils'
import { useApi, useChain, useChains, useSwitchChain } from '@luno-kit/react'
import type { Chain } from '@luno-kit/react'
import { ChainIcon } from '../ChainIcon'
import { Loading } from '../../assets/icons'

enum ChainFilter {
  all = 'All',
  mainnets = 'Mainnets',
  testnets = 'Testnets'
}

const FILTER_TABS = [
  { key: ChainFilter.all, label: ChainFilter.all },
  { key: ChainFilter.mainnets, label: ChainFilter.mainnets },
  { key: ChainFilter.testnets, label: ChainFilter.testnets }
] as const;

interface ChainListProps {
  onChainSwitched?: (chain: Chain) => void;
}

export const ChainList: React.FC<ChainListProps> = ({ onChainSwitched }: ChainListProps) => {
  const { chain: currentChain } = useChain();
  const chains = useChains();
  const { switchChainAsync } = useSwitchChain();
  const { isApiReady, apiError } = useApi()

  const [activeFilter, setActiveFilter] = useState<ChainFilter>(ChainFilter.all);
  const [switchingChain, setSwitchingChain] = useState<string | null>(null);

  const filteredChains = useMemo(() => {
    switch (activeFilter) {
      case ChainFilter.mainnets:
        return chains.filter(chain => !chain.testnet);
      case ChainFilter.testnets:
        return chains.filter(chain => chain.testnet);
      case ChainFilter.all:
      default:
        return chains;
    }
  }, [chains, activeFilter]);

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
      <div className="flex items-center gap-[6px] w-full">
        {FILTER_TABS.map(tab => (
          <button
            key={tab.key}
            onClick={() => setActiveFilter(tab.key)}
            className={cs(
              'px-[14px] flex items-center justify-center cursor-pointer min-w-[48px] min-h-[24px] rounded-sm text-[12px] leading-[16px] font-[500] transition-colors',
              activeFilter === tab.key
                ? 'bg-chainSelected text-modalFont'
                : 'bg-transparent text-secondaryFont hover:text-modalFont'
            )}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="flex flex-col gap-[6px] overflow-y-auto custom-scrollbar max-h-[450px]">
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

      {filteredChains.length === 0 && (
        <div className="flex items-center justify-center py-12">
          <span className="text-secondaryFont text-sm">
            No {activeFilter === ChainFilter.all ? 'chains' : activeFilter.toLowerCase()} available
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
  'flex items-center justify-between p-[8px] rounded-sm',
  'bg-[var(--color-connectorItemBackground)]',
  'transition-colors duration-200',
  (isSelected || isLoading)
    ? 'cursor-default'
    : 'cursor-pointer hover:bg-[var(--color-connectorItemHover)] active:bg-[var(--color-connectorItemActive)]',
  isLoading && 'opacity-80'
)}

    >
      <div className="flex items-center gap-[8px]">
        <ChainIcon
          className={'w-[24px] bg-modal-bg h-[24px] flex items-center justify-center'}
          chainIconUrl={chain?.chainIconUrl}
          chainName={chain?.name}
        />

        <div className="flex flex-col items-start">
          <span className="font-[500] text-primary text-modalFont leading-primary">
            {chain.name}
          </span>
        </div>
      </div>

      <div className="flex items-center justify-center h-[20px]">
        {isSelected
          ? isLoading
            ? (
              <>
                <span className="text-[var(--color-accentFont)] text-[12px] mr-[6px]">Switching</span>
                <Loading
                  className="text-[var(--color-accentFont)] animate-[spin_2s_linear_infinite]"
                  width="15px"
                  height="15px"
                />
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
{/* 
      {isSelected
        ? isLoading
          ? <Loading className={'text-secondaryFont animate-[spin_2s_linear_infinite]'}/>
          : (
            <span className="status-dot-container">
              <span className="ping-animation"></span>
              <span className="status-dot"></span>
            </span>
          )
        : null
      } */}

    </button>
  );
});
