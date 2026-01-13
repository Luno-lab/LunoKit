import { type InjectedParameters, injected } from '@wagmi/connectors';
import { type EvmInjectConnectorOptions, InjectConnector } from './inject';

export const injectedConnector = (options?: InjectedParameters & EvmInjectConnectorOptions) => {
  return new InjectConnector({
    id: options?.id || 'injected',
    name: options?.name || 'Injected Wallet',
    icon: options?.icon || '',
    links: {},

    rdns: undefined,
    wagmiFactory: injected({
      shimDisconnect: true,
      ...options,
    }),
  });
};
