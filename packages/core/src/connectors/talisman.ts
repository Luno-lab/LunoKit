import { talismanSVG } from '../config/logos/generated'
import { CommonConnector } from './common'

export const talismanConnector = () => {
  return new CommonConnector({
    id: 'talisman',
    name: 'Talisman',
    icon: talismanSVG,
  });
}
