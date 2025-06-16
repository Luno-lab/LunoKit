import {SignerPayloadJSON, SignerResult} from '@polkadot/types/types'

export interface Signer {
  /**
   * sign raw data (usually bytes or extrinsic payload)
   * @param raw includes address, data and type information
   * @returns includes signed result
   */
  signRaw?: (raw: {
    address: string;
    data: string;
    type: 'bytes' | 'payload';
  }) => Promise<{ id: number; signature: string }>;

  /**
   * sign extrinsic payload (updated @polkadot/api may need)
   * @param payload needs to be signed JSON format payload
   * @returns includes signed result object (id for updating status)
   */
  signPayload?: (payload: SignerPayloadJSON) => Promise<SignerResult>;

}
