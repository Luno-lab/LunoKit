import { useConfig, useConnectors } from '@luno-kit/react';
import { type AnyConnector, ChainType, type ConnectorGroup } from '@luno-kit/react/types';
import { isMobileDevice } from '@luno-kit/react/utils';
import React, { useMemo } from 'react';
import { cs } from '../../utils';

interface Props {
  onConnect: (connector: AnyConnector) => Promise<void>;
  showInstalledGroup: boolean;
  namespace: ChainType;
}

const popularConnectorIds = [
  'polkadot-js',
  'subwallet-js',
  'talisman',
  'walletconnect',
  'nova',
  'nova-mobile',
];

export const ConnectOptions = React.memo(({ onConnect, showInstalledGroup, namespace }: Props) => {
  const connectors = useConnectors({ namespace });
  const config = useConfig();

  const installedConnectors = connectors.filter((c) => c.isInstalled());
  const popularConnectors = connectors.filter(
    (c: AnyConnector) => popularConnectorIds.includes(c.id) && !c.isInstalled()
  );
  const moreConnectors = connectors.filter(
    (c: AnyConnector) => !popularConnectorIds.includes(c.id) && !c.isInstalled()
  );

  const connectorGroup: { title: string; group: AnyConnector[] }[] = useMemo(() => {
    const namespaceConnectorGroups: ConnectorGroup<AnyConnector>[] =
      namespace === ChainType.EVM
        ? config?.evm?.connectorGroups
        : config?.substrate?.connectorGroups;

    if (!namespaceConnectorGroups) {
      return [
        { title: 'Installed', group: installedConnectors },
        { title: 'Popular', group: popularConnectors },
        { title: 'More', group: moreConnectors },
      ];
    }

    const hasUserDefinedInstalled = namespaceConnectorGroups.some((g) => g.groupName === 'Installed');

    if (hasUserDefinedInstalled || !showInstalledGroup) {
      return namespaceConnectorGroups
        .filter((g) => g.wallets.length > 0)
        .map((g) => ({ title: g.groupName, group: g.wallets as AnyConnector[] }))
        .sort((a, b) => (a.title === 'Installed' ? -1 : b.title === 'Installed' ? 1 : 0));
    }

    const allWallets = namespaceConnectorGroups.flatMap((g) => g.wallets);
    const installed = allWallets.filter((c) => c.isInstalled());

    const customGroups = namespaceConnectorGroups
      .map((g) => ({
        title: g.groupName,
        group: g.wallets.filter((c) => !c.isInstalled()) as AnyConnector[],
      }))
      .filter((g) => g.group.length > 0);

    return [
      ...(installed.length > 0 ? [{ title: 'Installed', group: installed as AnyConnector[] }] : []),
      ...customGroups,
    ];
  }, [
    installedConnectors,
    popularConnectors,
    moreConnectors,
    config?.substrate?.connectorGroups,
    config?.evm?.connectorGroups,
    showInstalledGroup,
    namespace,
  ]);

  if (isMobileDevice()) {
    const filteredConnectors = connectors
      .filter((i) => i.id !== 'polkadot-js')
      .filter((i) => i.links.deepLink || i.isInstalled());

    return (
      <div className={'luno:flex luno:flex-col luno:items-start luno:gap-1 luno:w-full'}>
        {filteredConnectors.map((i) => (
          <ConnectorItem key={`${i.id}-${i.name}`} connector={i} onConnect={() => onConnect(i)} />
        ))}
      </div>
    );
  }

  return (
    <div
      className={
        'luno:flex luno:flex-col luno:items-start luno:gap-4 luno:w-full luno:min-h-[400px] luno:max-h-[400px]'
      }
    >
      {connectorGroup.map((g) => {
        if (g.group.length === 0) return null;
        return (
          <div
            key={g.title}
            className={'luno:flex luno:flex-col luno:items-start luno:gap-2 luno:w-full'}
          >
            <div
              className={cs(
                'luno:text-sm luno:font-semibold luno:leading-base',
                g.title === 'Installed' ? 'luno:text-accentColor' : 'luno:text-modalTextSecondary'
              )}
            >
              {g.title}
            </div>
            <div className={'luno:flex luno:flex-col luno:items-start luno:gap-1.5 luno:w-full'}>
              {g.group.map((i) => (
                <ConnectorItem key={i.id} connector={i} onConnect={() => onConnect(i)} />
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
});

interface ConnectorItemProps {
  connector: AnyConnector;
  onConnect: () => void;
}

const ConnectorItem: React.FC<ConnectorItemProps> = React.memo(({ connector, onConnect }) => {
  return (
    <button
      onClick={onConnect}
      className={cs(
        'luno:cursor-pointer luno:bg-walletSelectItemBackground luno:p-2 luno:w-full luno:flex luno:items-center luno:gap-3 luno:rounded-walletSelectItem luno:border-none',
        'luno:hover:bg-walletSelectItemBackgroundHover luno:transition-transform luno:active:scale-[0.95]',
        'luno:text-left'
      )}
    >
      <div className={'luno:w-[28px] luno:h-[28px] luno:rounded-[6px] luno:overflow-hidden'}>
        <img src={connector.icon} alt={connector.name} className="luno:w-full luno:h-full" />
      </div>

      <span className="luno:font-semibold luno:leading-base luno:text-base luno:text-modalText">
        {connector.name}
      </span>
    </button>
  );
});
