import { useConnect, useConfig } from '@luno-kit/react';
import { type AnyConnector, ChainType, type Optional } from '@luno-kit/react/types';
import { isMobileDevice } from '@luno-kit/react/utils';
import type React from 'react';
import { useEffect, useMemo, useState } from 'react';
import { useWindowSize } from '../../hooks';
import { useAnimatedViews } from '../../hooks/useAnimatedViews';
import { type AppInfo, useConnectModal } from '../../providers';
import { cs } from '../../utils';
import { renderAppInfoText } from '../../utils/renderAppInfo';
import { Dialog, type ModalContainer, type ModalSize } from '../Dialog';
import { SegmentedControl } from '../SegmentedControl';
import { ConnectOptions } from './ConnectOptions';
import { ModalHeader } from './ModalHeader';
import { PolicyLinks } from './PolicyLinks';
import { WalletView } from './WalletView';

export enum ConnectModalView {
  connectOptions = 'Connect Wallet',
  walletView = 'walletView',
}

export interface ConnectModalProps {
  size?: Optional<ModalSize>;
  appInfo?: Optional<Partial<AppInfo>>;
  container?: Optional<ModalContainer>;
  showInstalledGroup?: Optional<boolean>;
}

export const ConnectModal: React.FC<ConnectModalProps> = ({
  appInfo,
  container,
  showInstalledGroup = true,
  size = 'wide',
}) => {
  const { isOpen, close, targetNamespace } = useConnectModal();
  const config = useConfig();

  const showNamespaceToggle = !targetNamespace && !!config?.substrate && !!config?.evm;

  const [selectedNamespace, setSelectedNamespace] = useState<ChainType>(ChainType.SUBSTRATE);
  const [selectedConnector, setSelectedConnector] = useState<AnyConnector | null>(null);
  const [qrCode, setQrCode] = useState<string | undefined>();

  const activeNamespace = targetNamespace ?? selectedNamespace;

  const {
    connectAsync,
    reset: resetConnect,
    isPending: isConnecting,
    isError: connectError,
    error: connectErrorMsg,
  } = useConnect({ namespace: activeNamespace });

  const { width: windowWidth } = useWindowSize();

  const isLargeWindow = windowWidth && windowWidth > 768;
  const isWide = !!(size === 'wide' && isLargeWindow);

  const { containerRef, currentViewRef, resetView, handleViewChange, currentView } =
    useAnimatedViews({ initialView: ConnectModalView.connectOptions });

  const onQrCode = async (connector: AnyConnector) => {
    const uri = await connector.getConnectionUri();

    setQrCode(uri);
  };

  const handleConnect = async (connector: AnyConnector) => {
    if (isMobileDevice() && connector.links.deepLink) {
      try {
        await connectAsync({ connectorId: connector.id });
        _onOpenChange(false);
        return;
      } catch (error) {
        window.location.href = `${connector.links.deepLink}?url=${window.location.href}`;
        return;
      }
    }

    !isWide && handleViewChange(ConnectModalView.walletView);
    setSelectedConnector(connector);
    setQrCode(undefined);
    if (connector.hasConnectionUri()) {
      onQrCode(connector);
    }
    await connectAsync({ connectorId: connector.id });
    _onOpenChange(false);
  };

  const _onOpenChange = (open: boolean) => {
    if (!open) {
      close();
      resetConnect();
      resetView();
      setSelectedConnector(null);
      setQrCode(undefined);
      setSelectedNamespace(ChainType.SUBSTRATE);
    }
  };

  const viewComponents = useMemo(() => {
    return {
      [ConnectModalView.connectOptions]: (
        <ConnectOptions onConnect={handleConnect} showInstalledGroup={showInstalledGroup} namespace={activeNamespace} />
      ),
      [ConnectModalView.walletView]: (
        <WalletView
          connectState={{ isConnecting, isError: connectError, error: connectErrorMsg }}
          isWide={isWide}
          selectedConnector={selectedConnector}
          qrCode={qrCode}
          onConnect={handleConnect}
          appInfo={appInfo}
        />
      ),
    };
  }, [
    isWide,
    selectedConnector,
    qrCode,
    handleConnect,
    isConnecting,
    connectError,
    connectErrorMsg,
    appInfo,
    showInstalledGroup,
    activeNamespace,
  ]);

  useEffect(() => {
    if (isWide && currentView === ConnectModalView.walletView) {
      handleViewChange(ConnectModalView.connectOptions);
    }
  }, [isWide, currentView]);

  return (
    <Dialog open={isOpen} onOpenChange={_onOpenChange} container={container}>
      <div
        className={cs(
          'luno:flex luno:items-stretch luno:justify-between luno:w-full luno:md:max-h-[504px] luno:md:max-w-[724px]'
        )}
      >
        <div
          className={cs(
            'luno:flex luno:flex-col luno:items-start luno:py-4 luno:px-5 luno:w-full luno:md:w-auto',
            isWide
              ? 'luno:md:min-w-[300px] luno:border-r-[1px] luno:border-r-solid luno:border-r-separatorLine'
              : 'luno:md:min-w-[360px]'
          )}
        >
          <ModalHeader
            isConnectOptions={currentView === ConnectModalView.connectOptions}
            isWide={isWide}
            selectedConnectorName={selectedConnector?.name}
            onBack={() => handleViewChange(ConnectModalView.connectOptions)}
          />

          {showNamespaceToggle && (
            <SegmentedControl
              items={[
                { value: ChainType.SUBSTRATE, label: 'Substrate' },
                { value: ChainType.EVM, label: 'EVM' },
              ]}
              value={selectedNamespace}
              onChange={(v) => setSelectedNamespace(v as ChainType)}
              className={'luno:mb-3'}
            />
          )}
          <div
            ref={containerRef}
            className={cs(
              'luno:relative luno:overflow-scroll luno:w-full',
              !isWide && 'luno:flex-1 luno:overflow-auto'
            )}
          >
            <div ref={currentViewRef}>{viewComponents[currentView]}</div>
          </div>

          {!isWide &&
            currentView === ConnectModalView.connectOptions &&
            renderAppInfoText(
              appInfo?.guideText,
              <p
                className={
                  'luno:cursor-pointer luno:w-full luno:pt-4 luno:text-sm luno:leading-sm luno:text-accentColor luno:font-medium luno:text-center luno:hover:text-modalText'
                }
                onClick={() =>
                  window.open(appInfo?.guideLink || 'https://polkadot.com/get-started/wallets/')
                }
              >
                New to wallets?
              </p>
            )}
        </div>

        {isWide && (
          <WalletView
            connectState={{ isConnecting, isError: connectError, error: connectErrorMsg }}
            isWide={isWide}
            selectedConnector={selectedConnector}
            qrCode={qrCode}
            onConnect={handleConnect}
            appInfo={appInfo}
          />
        )}
      </div>

      {!isWide &&
        currentView === ConnectModalView.connectOptions &&
        appInfo?.policyLinks?.terms &&
        appInfo?.policyLinks?.privacy && (
          <PolicyLinks policyLinks={appInfo.policyLinks} />
        )}
    </Dialog>
  );
};
