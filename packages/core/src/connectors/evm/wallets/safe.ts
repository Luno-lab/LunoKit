import { type SafeParameters, safe } from '@wagmi/connectors';
import { safeEvmWallet } from '../../../config/logos/generated';
import { EvmConnector, type EvmConnectorOptions } from '../base/connector';

export class SafeConnector extends EvmConnector {
  constructor(options: EvmConnectorOptions) {
    super(options);
  }

  public isInstalled(): boolean {
    return !(typeof window === 'undefined') && window?.parent !== window;
  }

  public async isAvailable(): Promise<boolean> {
    return this.isInstalled();
  }
}

export const safeConnector = (options?: Optional<SafeParameters>) => {
  return new SafeConnector({
    id: 'safe',
    name: 'Safe',
    links: {},
    icon: safeEvmWallet,
    wagmiFactory: safe({
      shimDisconnect: true,
      ...options,
    }),
  });
};
