import type { WalletConnectConnectorOptions } from '../../../types';
import { WalletConnectConnector } from '../base/walletconnect';

export { WalletConnectConnector };

export const walletConnectConnector = (options: WalletConnectConnectorOptions) =>
  new WalletConnectConnector(options);
