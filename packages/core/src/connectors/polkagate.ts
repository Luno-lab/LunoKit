import { polkagateWallet } from '../config/logos/generated';
import { InjectConnector } from './inject';

export const polkagateConnector = () => {
  return new InjectConnector({
    id: 'polkagate',
    name: 'Polkagate',
    icon: polkagateWallet,
    links: {
      browserExtension:
        'https://chromewebstore.google.com/detail/polkagate-the-gateway-to/ginchbkmljhldofnbjabmeophlhdldgp',
    },
  });
};
