// packages/ui/src/components/ChainModal/index.tsx
import React, { useState, useMemo } from 'react';
import { useChain, useChains, useSwitchChain } from '@luno/react';
import { Dialog, DialogClose, DialogTitle } from '../Dialog';
import { cs } from '../../utils';
import { useChainModal } from '../../providers/ModalContext';
import type { Chain } from '@luno/core';
import { Close } from '../../assets/icons';
import {ChainIcon} from '../ChainIcon'

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

export const ChainModal: React.FC = () => {
  const { isOpen, close } = useChainModal();
  const { chain: currentChain } = useChain();
  const chains = useChains();
  const { switchChain } = useSwitchChain();

  const [activeFilter, setActiveFilter] = useState<ChainFilter>(ChainFilter.all);

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

    try {
      await switchChain(chain.genesisHash);
      close();
    } catch (error) {
      console.error('Failed to switch chain:', error);
    }
  };

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => !open && close()}
    >
      <div className="flex flex-col w-[360px] max-h-[500px] p-[16px] gap-[14px] text-modalFont">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div />
          <DialogTitle className="text-title leading-title text-modalFont font-[700]">
            Select Networks
          </DialogTitle>
          <DialogClose className="z-10 cursor-pointer">
            <Close className="w-[24px] h-[24px]" />
          </DialogClose>
        </div>

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
      </div>
    </Dialog>
  );
};

interface ChainItemProps {
  chain: Chain;
  isSelected: boolean;
  onSelect: (chain: Chain) => void;
}

const ChainItem: React.FC<ChainItemProps> = ({
  chain,
  isSelected,
  onSelect
}) => {
  return (
    <button
      onClick={() => onSelect(chain)}
      disabled={isSelected}
      className={cs(
        'flex items-center justify-between p-[8px] bg-connectorItemBackground rounded-sm',
        'transition-transform',
        isSelected
          ? 'cursor-auto'
          : 'cursor-pointer hover:opacity-90 active:scale-[0.95]'
      )}
    >
      <div className="flex items-center gap-[8px]">
        <ChainIcon
          className={'w-[24px] bg-modal-bg h-[24px] flex items-center justify-center'}
          chainIconUrl={chain?.chainIconUrl}
          chainName={chain?.name}
        />

        <div className="flex flex-col items-start">
          <span className="font-[600] text-primary text-modalFont leading-primary">
            {chain.name}
          </span>
        </div>
      </div>

      {isSelected && (
        <div
          className={'border-[1px] border-solid border-accentFont rounded-full overflow-hidden flex items-center justify-center w-[18px] h-[18px]'}>
          <div className={'rounded-full bg-accentFont w-[10px] h-[10px]'}/>
        </div>
      )}
    </button>
  );
};
