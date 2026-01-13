import { type MetaMaskParameters, metaMask } from '@wagmi/connectors';
import { metamaskEvmWallet } from '../../config/logos/generated';
import { InjectConnector } from './inject';

export const metamaskConnector = (options?: MetaMaskParameters) => {
  return new InjectConnector({
    id: 'metaMask',
    name: 'MetaMask',
    icon: metamaskEvmWallet,
    links: {
      browserExtension: 'https://metamask.io/download/',
      deepLink: 'https://link.metamask.io/dapp',
    },
    rdns: 'io.metamask',
    wagmiFactory: metaMask({
      dappMetadata: {
        name: 'LunoKit DApp',
      },
      ...options,
    }),
  });
};
