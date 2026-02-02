import type { PolkadotSigner as PapiSigner } from '@polkadot-api/pjs-signer';
import type { InjectedSigner } from 'dedot/types';
import type { WalletClient } from 'viem';

interface SubstrateSigner extends InjectedSigner {}

interface EvmSigner extends WalletClient {}

type WalletSigner = SubstrateSigner | EvmSigner;

export type { PapiSigner, SubstrateSigner, EvmSigner, WalletSigner };
