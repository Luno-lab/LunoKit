import { fearlessSubstrateWallet } from '../../config/logos/generated';
import { InjectConnector } from './inject';

export const fearlessConnector = () => {
  return new InjectConnector({
    id: 'fearless-wallet',
    name: 'Fearless',
    icon: fearlessSubstrateWallet,
    links: {
      browserExtension: 'https://fearlesswallet.io',
    },
  });
};
