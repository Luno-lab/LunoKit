import { InjectedSigner } from 'dedot/types'
import type { PolkadotSigner as PapiSigner } from '@polkadot-api/pjs-signer';

interface Signer extends InjectedSigner {}

export { type PapiSigner, type Signer };
