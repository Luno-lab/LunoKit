import { onekeyWallet } from '../config/logos/generated';
import { InjectConnector } from './inject';

export const onekeyConnector = () => {
  return new InjectConnector({
    id: 'OneKey',
    name: 'OneKey',
    icon: onekeyWallet,
    links: {
      browserExtension:
        'https://chromewebstore.google.com/detail/onekey-secure-crypto-wall/jnmbobjmhlngoefaiojfljckilhhlhcj',
    },
  });
};
