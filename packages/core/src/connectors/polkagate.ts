import { polkagateSVG } from '../config/logos/generated'
import { CommonConnector } from './common'

export const polkagateConnector = () => {
  return new CommonConnector({
    id: 'polkagate',
    name: 'Polkagate',
    icon: polkagateSVG,
    links: {
      browserExtension: 'https://chromewebstore.google.com/detail/polkagate-the-gateway-to/ginchbkmljhldofnbjabmeophlhdldgp'
    }
  });
}
