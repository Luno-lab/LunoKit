import { polkagateSubstrateWallet } from '../../../config/logos/generated';
import { InjectConnector } from '../base/inject';

export const polkagateConnector = () => {
  return new InjectConnector({
    id: 'polkagate',
    name: 'Polkagate',
    icon: polkagateSubstrateWallet,
    links: {
      browserExtension:
        'https://chromewebstore.google.com/detail/polkagate-the-gateway-to/ginchbkmljhldofnbjabmeophlhdldgp',
    },
  });
};
