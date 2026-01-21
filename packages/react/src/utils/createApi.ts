import { wsProvider } from '@luno-kit/core';
import { type ApiOptions, LegacyClient } from 'dedot';
import type { Config } from '../types';
import type { LunoClient } from '../types/state';

interface CreateApiOptions {
  config: Config;
  chainId: string;
}

export const createApi = async ({ config, chainId }: CreateApiOptions): Promise<LunoClient> => {
  const chainConfig = config.chains.find((c) => c.genesisHash === chainId);
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

  const newApi = new LegacyClient(apiOptions);

  try {
    await newApi.connect();

    const actualGenesisHash = await newApi.rpc.chain_getBlockHash(0);

    if (actualGenesisHash !== chainId) {
      await newApi.disconnect();
      throw new Error(
        `Chain genesis hash mismatch. Expected: ${chainId}, Got: ${actualGenesisHash}. ` +
          'This might indicate connecting to the wrong network or incorrect chain configuration.'
      );
    }

    const properties = await newApi.rpc.system_properties();

    (newApi as any).isEthereum = !!properties.isEthereum;

    return newApi as LunoClient;
  } catch (error: any) {
    throw new Error(`Failed to connect to ${chainConfig.name}: ${error?.message || error}`);
  }
};
