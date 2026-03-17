import { onekeySubstrateWallet } from '../../../config/logos/generated';
import { InjectConnector } from '../base/inject';

export const onekeyConnector = () => {
  return new InjectConnector({
    id: 'OneKey',
    name: 'OneKey',
    icon: onekeySubstrateWallet,
    links: {
      browserExtension:
        'https://chromewebstore.google.com/detail/onekey-secure-crypto-wall/jnmbobjmhlngoefaiojfljckilhhlhcj',
    },
  });
};
