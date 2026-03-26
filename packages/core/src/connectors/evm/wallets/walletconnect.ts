import { type WalletConnectParameters, walletConnect } from '@wagmi/connectors';
import { walletconnectEvmWallet } from '../../../config/logos/generated';
import { WalletConnectConnector } from '../base/walletconnect';

export { WalletConnectConnector };

export const walletConnectConnector = (options: WalletConnectParameters) => {
  return new WalletConnectConnector({
    id: 'walletConnect',
    name: 'WalletConnect',
    icon: walletconnectEvmWallet,
    wagmiFactory: walletConnect({ ...options, showQrModal: false }),
  });
};
