import React from 'react'
import { useConnectors, isMobileDevice } from '@luno-kit/react'
import type { Connector } from '@luno-kit/react'
import { cs } from '../../utils'

interface Props {
  onConnect: (connector: Connector) => Promise<void>
}

export const ConnectOptions = React.memo(({ onConnect }: Props) => {
  const connectors = useConnectors();

  if (isMobileDevice()) {
    const filteredConnectors = connectors.filter(i => i.links.deepLink)

    return (
      <div className={'flex flex-col items-start gap-1 w-full'}>
        {filteredConnectors.map(i => (
          <ConnectorItem key={`${i.id}-${i.name}`} connector={i} onConnect={() => onConnect(i)}/>
        ))}
      </div>
    )
  }

  const installedConnectors = connectors.filter(c => c.isInstalled())
  const moreConnectors = connectors.filter(c => !c.isInstalled())

  return (
    <div className={'flex flex-col items-start gap-4 w-full'}>
      <div className={'flex flex-col items-start gap-2 w-full'}>
        <div className={'text-sm text-accentColor font-semibold leading-base'}>Installed</div>
        <div className={'flex flex-col items-start gap-1.5 w-full'}>
          {installedConnectors.map(i => (
            <ConnectorItem key={i.id} connector={i} onConnect={() => onConnect(i)}/>
          ))}
        </div>
      </div>

      {moreConnectors.length > 0 && (
        <div className={'flex flex-col items-start gap-2 w-full'}>
          <div className={'text-sm text-modalTextSecondary font-semibold leading-base'}>More</div>
          <div className={'flex flex-col items-start gap-1 w-full'}>
            {moreConnectors.map(i => (
              <ConnectorItem key={i.id} connector={i} onConnect={() => onConnect(i)}/>
            ))}
          </div>
        </div>
      )}
    </div>
  )
})

interface ConnectorItemProps {
  connector: Connector;
  onConnect: () => void;
}

const ConnectorItem: React.FC<ConnectorItemProps> = React.memo(({connector, onConnect}) => {
  return (
    <button
      onClick={onConnect}
      className={cs(
        'cursor-pointer bg-walletSelectItemBackground p-2 w-full flex items-center gap-3 rounded-walletSelectItem border-none',
        'hover:bg-walletSelectItemBackgroundHover transition-transform active:scale-[0.95]',
        'text-left'
      )}
    >
      <div className={'w-[30px] h-[30px]'}>
        <img
          src={connector.icon}
          alt={connector.name}
          className="w-full h-full"
        />
      </div>

      <span className="font-semibold leading-base text-base text-modalText">{connector.name}</span>
    </button>
  );
});
