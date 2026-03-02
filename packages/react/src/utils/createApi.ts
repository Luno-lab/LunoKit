import { wsProvider } from '@luno-kit/core';
import { type ApiOptions, LegacyClient } from 'dedot';
import type { Config, SubstrateChain, HexString } from '../types';
import type { LunoClient } from '../types/state';

interface CreateApiOptions {
  config: Config;
  chainId: string;
}

export const createApi = async ({ config, chainId }: CreateApiOptions): Promise<LunoClient> => {
  const substrate = config.substrate;

  if (!substrate) {
    throw new Error('Substrate configuration is not provided.');
  }

  const chainConfig = substrate.chains.find((c: SubstrateChain) => c.genesisHash === chainId);
  const transportConfig = substrate.transports[chainId];

  if (!chainConfig || !transportConfig) {
    throw new Error(`Configuration missing for chainId: ${chainId}`);
  }

  const provider = wsProvider(transportConfig);

  const apiOptions: ApiOptions = {
    provider,
    scaledResponses: {
      ...substrate.customTypes,
      ...substrate.customRpc,
    },
  };

  const newApi = new LegacyClient(apiOptions);

  try {
    await newApi.connect();

    const actualGenesisHash: HexString | undefined = await newApi.rpc.chain_getBlockHash(0);

    if (actualGenesisHash !== chainId) {
      await newApi.disconnect();
      throw new Error(
        `Chain genesis hash mismatch. Expected: ${chainId}, Got: ${actualGenesisHash}. ` +
          'This might indicate connecting to the wrong network or incorrect chain configuration.'
      );
    }

    const properties = await newApi.rpc.system_properties();

    (newApi as LunoClient).isEthereum = !!properties.isEthereum;

    return newApi as LunoClient;
  } catch (error: any) {
    throw new Error(`Failed to connect to ${chainConfig.name}: ${error?.message || error}`);
  }
};
