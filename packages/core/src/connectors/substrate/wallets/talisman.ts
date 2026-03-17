import { talismanSubstrateWallet } from '../../../config/logos/generated';
import { InjectConnector } from '../base/inject';

export const talismanConnector = () => {
  return new InjectConnector({
    id: 'talisman',
    name: 'Talisman',
    icon: talismanSubstrateWallet,
    links: {
      browserExtension:
        'https://chromewebstore.google.com/detail/talisman-wallet/fijngjgcjhjmmpcmkeiomlglpeiijkld',
    },
  });
};
