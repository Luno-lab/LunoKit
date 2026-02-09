import type { KeypairType } from 'dedot/types';

export type HexString = `0x${string}`;

interface BaseAccount {
  address: string;

  name?: Optional<string>;

  source?: Optional<string>;
}

export interface SubstrateAccount extends BaseAccount {
  chainType: 'substrate';

  publicKey?: Optional<HexString>;

  type?: Optional<KeypairType>;

  meta?: Optional<{
    source?: Optional<string>;
    genesisHash?: Optional<string | null>;
    [key: string]: any;
  }>;
}

export interface EvmAccount extends BaseAccount {
  chainType: 'evm';
}

export interface SubstrateBalance {
  chainType: 'substrate';

  /** available balance (in smallest unit) */
  free: bigint;

  /** total balance (in smallest unit) */
  total: bigint;

  /** reserved balance (in smallest unit) */
  reserved: bigint;

  /**
   * transferable balance (in smallest unit)
   * free minus various locked amounts
   */
  transferable: bigint;

  /** formatted available balance (with unit, for display) */
  formattedTransferable: string;

  /** formatted total balance (with unit, for display) */
  formattedTotal: string;

  /** lock details (if any) */
  locks?: Optional<
    Array<{
      id: string;
      amount: bigint;
      reason: string;
      lockHuman: string;
    }>
  >;
}

export type AccountType = SubstrateAccount | EvmAccount;

export interface NativeBalance {
  /** balance in smallest unit (Substrate: transferable, EVM: value) */
  value: bigint;

  /** human-readable formatted balance */
  formatted: string;

  /** token symbol, e.g. "DOT", "ETH" */
  symbol: string;

  /** token decimals */
  decimals: number;
}

export interface EvmBalance {
  chainType: 'evm';

  value: bigint;

  formatted: string;

  symbol: string;

  decimals: number;
}
