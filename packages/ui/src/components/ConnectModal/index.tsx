// packages/ui/src/components/ConnectModal/index.tsx
import React, {useState} from 'react';
import { useConnect, useConnectors } from '@luno-kit/react';
import { Dialog, DialogClose, DialogTitle, ModalSize } from '../Dialog';
import { cs } from '../../utils';
import { useConnectModal } from '../../providers/ModalContext'
import type { Connector } from '@luno-kit/core'
import { Close } from '../../assets/icons'

export interface ConnectModalProps {
  size?: ModalSize;
}

export const ConnectModal: React.FC<ConnectModalProps> = ({
  size = 'wide',
}) => {
  const { isOpen, close } = useConnectModal();
  const connectors = useConnectors();
  const { connect } = useConnect()
  const [selectedConnector, setSelectedConnector] = useState<Connector | null>(null)

  const isWide = size === 'wide';

  const installedConnectors = connectors.filter(c => c.isInstalled())

  const moreConnectors = connectors.filter(c => !c.isInstalled())

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && close()}>
      <div className={cs('flex items-stretch justify-between max-h-[504px] max-w-[724px]')}>
        <div className={cs(
          'flex flex-col items-start py-[16px] px-[18px] min-w-[287px]',
          isWide && 'border-r-[1px] border-r-solid border-r-modalLine'
          )}>
          <div className={'flex items-center justify-between'}>
            <DialogTitle className="text-title leading-title text-modalFont font-[800] pb-[24px]">
              Connect Wallet
            </DialogTitle>
            {!isWide && (
              <DialogClose className={'z-[10] cursor-pointer'}>
                <Close className={'w-[24px] h-[24px]'}/>
              </DialogClose>
            )}
          </div>

          <div className={'flex flex-col items-start gap-[16px] w-full'}>
            <div className={'flex flex-col items-start gap-[8px] w-full'}>
              <div className={'text-primary text-modalFont font-[700] leading-primary'}>Installed</div>
              <div className={'flex flex-col items-start gap-[4px] w-full'}>
                {installedConnectors.map(i => (
                  <ConnectorItem key={i.id} connector={i} onConnect={() => {
                    setSelectedConnector(i)
                    connect(i.id)
                  }}/>
                ))}
              </div>
            </div>

            <div className={'flex flex-col items-start gap-[8px] w-full'}>
              <div className={'text-primary text-modalFont font-[700] leading-primary'}>Uninstalled</div>
              <div className={'flex flex-col items-start gap-[4px] w-full'}>
                {moreConnectors.map(i => (
                  <ConnectorItem key={i.id} connector={i} onConnect={() => connect(i.id)}/>
                ))}
              </div>
            </div>
          </div>

        </div>

        {isWide && (
          <div className={'flex flex-col items-center p-[16px] min-h-[472px] w-[400px]'}>
            <div className={'w-full'}>
              <div className={'flex items-center justify-between'}>
                <div/>
                <DialogClose className={'z-10 cursor-pointer'}>
                  <Close className={'w-[24px] h-[24px]'}/>
                </DialogClose>
              </div>
            </div>


            <div className={'flex items-center flex-col max-w-[312px] grow justify-center'}>
              {selectedConnector ? (
                <>
                  <div className={'w-[102px] h-[102px] pb-[8px]'}>
                    <img src={selectedConnector.icon} className={'w-full h-full'} alt=""/>
                  </div>
                  <p className={'pb-[10px] text-primary leading-primary text-modalFont font-[700]'}>
                    Opening {selectedConnector.name}...
                  </p>
                  <p className={'text-secondaryFont text-secondary leading-secondary font-[500]'}>
                    Confirm connection in the extension
                  </p>
                </>
              ) : (
                <>
                  <div className={'w-[200px] h-[140px] pb-[8px]'}>
                    <div></div>
                  </div>

                  <p className={'cursor-pointer pb-[10px] text-primary leading-primary text-accentFont font-[700] text-center'}>
                    New to wallets?
                  </p>
                  <p className={'text-secondaryFont text-secondary leading-secondary font-[500] text-center'}>
                    Your gateway to the decentralized world Connect a wallet to get started
                  </p>
                </>
              )}
            </div>

            <div/>
          </div>
        )}
      </div>
    </Dialog>
  );
};

// Connector 列表项组件
interface ConnectorItemProps {
  connector: Connector;
  onConnect: () => void;
}

const ConnectorItem: React.FC<ConnectorItemProps> = ({ connector, onConnect }) => {
  return (
    <button
      onClick={onConnect}
      className={cs(
        'cursor-pointer bg-connectorItemBackground p-[8px] w-full flex items-center gap-[12px] rounded-sm border-none',
        'hover:opacity-90 transition-transform active:scale-[0.95]',
        'text-left'
      )}
    >
      <img
        src={connector.icon}
        alt={connector.name}
        className="w-[24px] h-[24px]"
      />
      <span className="font-[700] leading-primary text-primary text-modalFont">{connector.name}</span>
    </button>
  );
};
