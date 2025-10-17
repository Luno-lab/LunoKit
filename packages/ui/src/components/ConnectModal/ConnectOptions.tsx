import { useConnectors } from '@luno-kit/react';
import type { Connector } from '@luno-kit/react/types';
import { isMobileDevice } from '@luno-kit/react/utils';
import React, { useMemo } from 'react';
import { cs } from '../../utils';

interface Props {
  onConnect: (connector: Connector) => Promise<void>;
}

const popularConnectorIds = [
  'polkadot-js',
  'subwallet-js',
  'talisman',
  'walletconnect',
  'nova',
  'nova-mobile',
];

const moreConnectorIds = ['polkagate', 'fearless-wallet', 'mimir', 'enkrypt'];

export const ConnectOptions = React.memo(({ onConnect }: Props) => {
  const connectors = useConnectors();

  const installedConnectors = connectors.filter((c) => c.isInstalled());
  const popularConnectors = connectors.filter(
    (c) => popularConnectorIds.includes(c.id) && !c.isInstalled()
  );
  const moreConnectors = connectors.filter(
    (c) => moreConnectorIds.includes(c.id) && !c.isInstalled()
  );

  const connectorGroup: { title: string; group: Connector[] }[] = useMemo(() => {
    return [
      {
        title: 'Installed',
        group: installedConnectors,
      },
      {
        title: 'Popular',
        group: popularConnectors,
      },
      {
        title: 'More',
        group: moreConnectors,
      },
    ];
  }, [installedConnectors, popularConnectors, moreConnectors]);

  if (isMobileDevice()) {
    const filteredConnectors = connectors.filter((i) => i.links.deepLink);

    return (
      <div className={'flex flex-col items-start gap-1 w-full'}>
        {filteredConnectors.map((i) => (
          <ConnectorItem key={`${i.id}-${i.name}`} connector={i} onConnect={() => onConnect(i)} />
        ))}
      </div>
    );
  }

  return (
    <div
      className={
        'flex flex-col items-start gap-4 w-full overflow-y-auto custom-scrollbar max-h-[400px]'
      }
    >
      {connectorGroup.map((g) => {
        if (g.group.length === 0) return null;
        return (
          <div key={g.title} className={'flex flex-col items-start gap-2 w-full'}>
            <div
              className={cs(
                'text-sm font-semibold leading-base',
                g.title === 'Installed' ? 'text-accentColor' : 'text-modalTextSecondary'
              )}
            >
              {g.title}
            </div>
            <div className={'flex flex-col items-start gap-1.5 w-full'}>
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
  connector: Connector;
  onConnect: () => void;
}

const ConnectorItem: React.FC<ConnectorItemProps> = React.memo(({ connector, onConnect }) => {
  return (
    <button
      onClick={onConnect}
      className={cs(
        'cursor-pointer bg-walletSelectItemBackground p-2 w-full flex items-center gap-3 rounded-walletSelectItem border-none',
        'hover:bg-walletSelectItemBackgroundHover transition-transform active:scale-[0.95]',
        'text-left'
      )}
    >
      <div className={'w-[28px] h-[28px] rounded-[6px] overflow-hidden'}>
        <img src={connector.icon} alt={connector.name} className="w-full h-full" />
      </div>

      <span className="font-semibold leading-base text-base text-modalText">{connector.name}</span>
    </button>
  );
});
