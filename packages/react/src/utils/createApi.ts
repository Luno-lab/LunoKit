import { Config, wsProvider } from '@luno-kit/core'
import { ApiOptions, DedotClient } from 'dedot'

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

  const apiOptions: ApiOptions = {
    provider,
    cacheMetadata: config.cacheMetadata,
    metadata: config.metadata,
    scaledResponses: {
      ...config.scaledResponses,
      ...config.customTypes,
    },
    runtimeApis: config.runtimeApis,
    cacheStorage: config.cacheStorage,
  };

  const newApi = new DedotClient(apiOptions);

  try {
    await newApi.connect();

    const actualGenesisHash = await newApi.chainSpec.genesisHash();

    if (actualGenesisHash !== chainId) {
      await newApi.disconnect();
      throw new Error(
        `Chain genesis hash mismatch. Expected: ${chainId}, Got: ${actualGenesisHash}. ` +
        'This might indicate connecting to the wrong network or incorrect chain configuration.'
      );
    }

    return newApi;
  } catch (error: Error) {
    throw new Error(`Failed to connect to ${chainConfig.name}: ${error?.message || error}`);
  }
};
