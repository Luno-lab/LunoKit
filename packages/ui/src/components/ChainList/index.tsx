import { useConfig, useChain, useStatus, ConnectionStatus } from '@luno-kit/react';
import { type AnyChain, ChainType } from '@luno-kit/react/types';
import React, { useMemo, useState } from 'react';
import { cs } from '../../utils';
import { FadeSwitch } from '../FadeSwitch';
import { SegmentedControl } from '../SegmentedControl';
import { NamespaceChainList } from './NamespaceChainList';

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

  const hasSubstrate = !!config?.substrate && substrateStatus === ConnectionStatus.Connected;
  const hasEvm = !!config?.evm && evmStatus === ConnectionStatus.Connected;

  const items = useMemo(() => {
    const result = [];
    if (hasSubstrate) {
      result.push({
        value: ChainType.SUBSTRATE,
        content: <NamespaceChainList namespace={ChainType.SUBSTRATE} onChainSwitched={onChainSwitched} />,
      });
    }
    if (hasEvm) {
      result.push({
        value: ChainType.EVM,
        content: <NamespaceChainList namespace={ChainType.EVM} onChainSwitched={onChainSwitched} />,
      });
    }
    return result;
  }, [hasSubstrate, hasEvm, onChainSwitched]);

  return (
    <div className={cs('luno:flex luno:flex-col luno:gap-3.5', className)}>
      {showNamespaceToggle && (
        <SegmentedControl
          items={[
            { value: ChainType.SUBSTRATE, label: 'Polkadot' },
            { value: ChainType.EVM, label: 'EVM' },
          ]}
          value={selectedNamespace}
          onChange={(v) => setSelectedNamespace(v as ChainType)}
        />
      )}

      <FadeSwitch
        activeValue={selectedNamespace}
        items={items}
        animate={showNamespaceToggle}
        height="360px"
      />
    </div>
  );
};
