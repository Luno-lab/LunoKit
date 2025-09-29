import { enkryptWallet } from '../config/logos/generated';
import { InjectConnector } from './inject';

export const enkryptConnector = () => {
  return new InjectConnector({
    id: 'enkrypt',
    name: 'Enkrypt',
    icon: enkryptWallet,
    links: {
      browserExtension: 'https://www.enkrypt.com',
    },
  });
};
