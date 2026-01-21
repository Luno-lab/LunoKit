import type { InjectedAccount } from 'dedot/types';
import { decodeAddress, encodeAddress, isEvmAddress, u8aEq, u8aToHex } from 'dedot/utils';
import type { Account, HexString } from '../types';

/**
 * check if address is valid
 */
export function isValidAddress(address: string): boolean {
  try {
    const decoded = decodeAddress(address);
    encodeAddress(decoded);
    return true;
  } catch (error) {
    return false;
  }
}

/**
 * convert address to specified SS58 format
 */
export function convertAddress(address: string, ss58Format: number): string {
  try {
    if (isEvmAddress(address)) return address;

    const publicKey = decodeAddress(address);
    if (ss58Format > 16383) {
      return encodeAddress(publicKey, 42);
    }
    return encodeAddress(publicKey, ss58Format);
  } catch (error: any) {
    throw new Error(`Failed to convert address: ${error.message}`);
  }
}

/**
 * check if two addresses are the same (ignore SS58 format)
 */
export function isSameAddress(address1: string, address2: string): boolean {
  try {
    const publicKey1 = decodeAddress(address1);
    const publicKey2 = decodeAddress(address2);

    return u8aEq(publicKey1, publicKey2);
  } catch (error: any) {
    return false;
  }
}

/**
 * get address public key (Currently, Ethereum addresses are not supported.)
 */
export function getPublicKey(address: string): Uint8Array {
  try {
    const publicKey = decodeAddress(address);
    if (publicKey.length !== 32) {
      throw new Error(`Invalid public key length: expected 32 bytes, got ${publicKey.length}`);
    }
    return publicKey;
  } catch (error: any) {
    throw new Error(`Failed to get public key: ${error.message}`);
  }
}

/**
 * map injected accounts to internal Account type
 * mainly extract address, name, source, and try to decode public key
 */
export function mapInjectedAccounts(
  injectedAccounts: InjectedAccount[],
  sourceId: string
): Account[] {
  if (!injectedAccounts) return [];

  try {
    return injectedAccounts.map((acc: InjectedAccount) => {
      let publicKeyHex: HexString | undefined;
      try {
        const publicKeyBytes = decodeAddress(acc.address);
        publicKeyHex = u8aToHex(publicKeyBytes);
      } catch (error) {
        console.error(`Failed to decode address "${acc.address}" to extract public key:`, error);
      }

      const mappedAccount: Account = {
        address: acc.address,
        name: acc.name,
        publicKey: publicKeyHex,
        meta: {
          source: sourceId,
          genesisHash: acc.genesisHash,
        },
        type: acc.type,
      };

      return mappedAccount;
    });
  } catch (e: any) {
    throw new Error(`Failed to map injected accounts: ${e.message}`);
  }
}
