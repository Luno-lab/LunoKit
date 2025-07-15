import { polkagateSVG } from '../config/logos/generated'
import { CommonConnector } from './common'

export const polkagateConnector = () => {
  return new CommonConnector({
    id: 'polkagate',
    name: 'Polkagate',
    icon: polkagateSVG,
  });
}
