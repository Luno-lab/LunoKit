import type { HexString } from 'dedot/utils'
import type { KeypairType } from 'dedot/types'

/**
 * Polkadot account interface
 * Represents a chain account
 */
export interface Account {
  /**
   * account address (original format from wallet)
   * specific SS58 formatting should be done in the React layer based on the chain.
   */
  address: string;

  /** account name (if any) */
  name?: string;

  /**
   * account public key (hex format, without 0x prefix)
   * used for cross-chain address conversion and verification
   */
  publicKey?: HexString;

  /**
   * other metadata
   * including account source, control method, etc.
   */
  meta?: {
    /** account source (e.g. 'polkadot-js', 'subwallet-js', 'talisman' etc.) */
    source?: string;

    /** genesis hash (if the wallet provides a specific chain account) */
    genesisHash?: string | null;

    /** other custom metadata */
    [key: string]: any;
  };
  type?: KeypairType
}

/**
 * account balance information
 */
export interface AccountBalance {
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
  locks?: Array<{
    id: string;
    amount: bigint;
    reason: string;
    lockHuman: string;
  }>;
}

/**
 * SS58 address format constants
 * see: https://github.com/paritytech/substrate/wiki/External-Address-Format-(SS58)
 */
export enum SS58_FORMAT {
  /** Polkadot account */
  POLKADOT = 0,

  /** Kusama account */
  KUSAMA = 2,

  /** general Substrate format (for most testnets) */
  SUBSTRATE = 42,
}

/**
 * account type enum
 */
export enum ACCOUNT_TYPE {
  /** normal account */
  NORMAL = 'normal',

  /** multisig account */
  MULTISIG = 'multisig',

  /** proxy account */
  PROXY = 'proxy',

  /** smart contract account */
  CONTRACT = 'contract',
}
