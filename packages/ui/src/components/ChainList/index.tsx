import { useConfig, useChain, useStatus, ConnectionStatus } from '@luno-kit/react';
import { type AnyChain, ChainType } from '@luno-kit/react/types';
import React, { useMemo, useState } from 'react';
import { cs } from '../../utils';
import { SegmentedControl } from '../SegmentedControl';
import { NamespaceChainList } from './NamespaceChainList';

const ANIMATION_DURATION = 200;

interface ChainListProps {
  onChainSwitched?: (chain: AnyChain) => void;
  className?: string;
}

export const ChainList: React.FC<ChainListProps> = ({
  onChainSwitched,
  className = '',
}: ChainListProps) => {
  const config = useConfig();
  const substrateStatus = useStatus({ namespace: ChainType.SUBSTRATE });
  const evmStatus = useStatus({ namespace: ChainType.EVM });
  const { chainType: activeChainType } = useChain();
  const [selectedNamespace, setSelectedNamespace] = useState<ChainType>(activeChainType);

  const showNamespaceToggle = useMemo(() =>
    !!config?.substrate && !!config?.evm
      && substrateStatus === ConnectionStatus.Connected
      && evmStatus === ConnectionStatus.Connected,
    [config?.substrate, config?.evm, substrateStatus, evmStatus]
  );

  const handleNamespaceChange = (value: string) => {
    setSelectedNamespace(value as ChainType);
  };

  const hasSubstrate = !!config?.substrate && substrateStatus === ConnectionStatus.Connected;
  const hasEvm = !!config?.evm && evmStatus === ConnectionStatus.Connected;

  return (
    <div className={cs('luno:flex luno:flex-col luno:gap-3.5', className)}>
      {showNamespaceToggle && (
        <SegmentedControl
          items={[
            { value: ChainType.SUBSTRATE, label: 'Polkadot' },
            { value: ChainType.EVM, label: 'EVM' },
          ]}
          value={selectedNamespace}
          onChange={handleNamespaceChange}
        />
      )}

      <div className={cs('luno:relative', showNamespaceToggle && 'luno:h-[430px]')}>
        {hasSubstrate && (
          <div className={cs(
            showNamespaceToggle && cs(
              'luno:absolute luno:inset-0 luno:transition-opacity',
              `luno:duration-[200ms]`,
              selectedNamespace !== ChainType.SUBSTRATE && 'luno:opacity-0 luno:pointer-events-none',
            ),
          )}>
            <NamespaceChainList
              namespace={ChainType.SUBSTRATE}
              onChainSwitched={onChainSwitched}
            />
          </div>
        )}
        {hasEvm && (
          <div className={cs(
            showNamespaceToggle && cs(
              'luno:absolute luno:inset-0 luno:transition-opacity',
              `luno:duration-[200ms]`,
              selectedNamespace !== ChainType.EVM && 'luno:opacity-0 luno:pointer-events-none',
            ),
          )}>
            <NamespaceChainList
              namespace={ChainType.EVM}
              onChainSwitched={onChainSwitched}
            />
          </div>
        )}
      </div>
    </div>
  );
};
