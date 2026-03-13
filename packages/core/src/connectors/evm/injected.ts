import { type InjectedParameters, injected } from '@wagmi/connectors';
import { type EvmInjectConnectorOptions, InjectConnector } from './inject';
import { createEip6963Target } from './eip6963';

export const injectedConnector = (
  options?: InjectedParameters & Omit<EvmInjectConnectorOptions, 'wagmiFactory'>,
) => {
  const { id: _id, name: _name, icon, links, rdns, ...wagmiOptions } = options ?? {};
  const id = _id || 'injected';
  const name = _name || 'Injected Wallet';

  return new InjectConnector({
    id,
    name,
    icon: icon || '',
    links: links || {},
    rdns,
    wagmiFactory: injected({
      shimDisconnect: true,
      target: createEip6963Target(rdns, id, name),
      ...wagmiOptions,
    }),
  });
};
