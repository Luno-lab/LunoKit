import { enkryptSubstrateWallet } from '../../config/logos/generated';
import { InjectConnector } from './inject';

export const enkryptConnector = () => {
  return new InjectConnector({
    id: 'enkrypt',
    name: 'Enkrypt',
    icon: enkryptSubstrateWallet,
    links: {
      browserExtension: 'https://www.enkrypt.com',
    },
  });
};
