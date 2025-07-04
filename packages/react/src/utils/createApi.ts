import { Config, wsProvider } from '@luno-kit/core'
import { DedotClient } from 'dedot'

interface CreateApiOptions {
  config: Config;
  chainId: string;
}

export const createApi = async ({
  config,
  chainId,
}: CreateApiOptions): Promise<DedotClient> => {
  const chainConfig = config.chains.find(c => c.genesisHash === chainId);
  const transportConfig = config.transports[chainId];

  if (!chainConfig || !transportConfig) {
    throw new Error(`Configuration missing for chainId: ${chainId}`);
  }

  const provider = wsProvider(transportConfig);
  const newApi = new DedotClient(provider);

  try {
    await newApi.connect();
    return newApi;
  } catch (error: Error) {
    throw new Error(`Failed to connect to ${chainConfig.name}: ${error?.message || error}`);
  }
};
