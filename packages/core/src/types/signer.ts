import type { PolkadotSigner as PapiSigner } from '@polkadot-api/pjs-signer';
import type { InjectedSigner } from 'dedot/types';
import type { WalletClient } from 'viem';

type SubstrateSigner = InjectedSigner;

type EvmSigner = WalletClient;

type WalletSigner = SubstrateSigner | EvmSigner;

export type { PapiSigner, SubstrateSigner, EvmSigner, WalletSigner };
