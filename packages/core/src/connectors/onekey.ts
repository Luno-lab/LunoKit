import { onekeyWallet } from '../config/logos/generated';
import { isMobileDevice } from '../utils';
import { InjectConnector } from './inject';
import { oneKeyMobileConnector, OneKeyMobileOptions } from './oneKeyMobile';

export const onekeyConnector = (config: OneKeyMobileOptions) => {
  if (isMobileDevice()) {
    return oneKeyMobileConnector(config);
  }

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
