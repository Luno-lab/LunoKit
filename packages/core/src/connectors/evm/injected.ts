import { type InjectedParameters, injected } from '@wagmi/connectors';
import { type EvmInjectConnectorOptions, InjectConnector } from './inject';

export const injectedConnector = (options?: InjectedParameters & Omit<EvmInjectConnectorOptions, 'wagmiFactory'>) => {
  return new InjectConnector({
    id: options?.id || 'injected',
    name: options?.name || 'Injected Wallet',
    icon: options?.icon || '',
    links: {},

    rdns: options?.rdns,
    wagmiFactory: injected({
      shimDisconnect: true,
      ...options,
    }),
  });
};
