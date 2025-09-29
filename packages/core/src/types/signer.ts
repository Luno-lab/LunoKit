import type { PolkadotSigner as PapiSigner } from '@polkadot-api/pjs-signer';
import type { InjectedSigner } from 'dedot/types';

interface Signer extends InjectedSigner {}

export type { PapiSigner, Signer };
