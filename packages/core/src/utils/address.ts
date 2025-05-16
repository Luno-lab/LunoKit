import { decodeAddress, encodeAddress, isAddress } from '@polkadot/util-crypto';
import type { Account } from '../types';
import {u8aEq, u8aToHex} from '@polkadot/util'
import type { InjectedAccount } from '@polkadot/extension-inject/types'
import type { HexString } from '@polkadot/util/types'

/**
 * 检查地址是否有效
 *
 * @param address 要检查的地址
 * @returns 是否有效
 */
export function isValidAddress(address: string): boolean {
  try {
    return isAddress(address);
  } catch (error: any) {
    return false;
  }
}

/**
 * 将地址转换为指定的SS58格式
 *
 * @param address 要转换的地址
 * @param ss58Format SS58格式
 * @returns 转换后的地址
 */
export function convertAddress(address: string, ss58Format: number): string {
  try {
    const publicKey = decodeAddress(address);
    return encodeAddress(publicKey, ss58Format);
  } catch (error: any) {
    throw new Error(`Failed to convert address: ${error.message}`);
  }
}

/**
 * 检查两个地址是否相同（忽略SS58格式）
 *
 * @param address1 第一个地址
 * @param address2 第二个地址
 * @returns 是否相同
 */
export function isSameAddress(address1: string, address2: string): boolean {
  try {
    const publicKey1 = decodeAddress(address1);
    const publicKey2 = decodeAddress(address2);

    // 使用更安全的比较方式，避免Buffer依赖
    return u8aEq(publicKey1, publicKey2)
  } catch (error: any) {
    return false;
  }
}

/**
 * 获取地址的公钥
 *
 * @param address 任何SS58格式的地址
 * @returns 公钥（Uint8Array）
 */
export function getPublicKey(address: string): Uint8Array {
  try {
    return decodeAddress(address);
  } catch (error: any) {
    throw new Error(`无法获取公钥: ${error.message}`);
  }
}

/**
 * 将从钱包扩展获取的原始账户列表映射为内部 Account 类型。
 * 主要提取地址、名称、来源，并尝试解码公钥。
 * @param injectedAccounts - 从 web3Accounts() 或 web3AccountsSubscribe() 获取的原始账户列表。
 * @returns 内部 Account 类型的列表。
 */
export function mapInjectedAccounts(injectedAccounts: InjectedAccount[], sourceId: string): Account[] {
  if (!injectedAccounts) return []

  return injectedAccounts.map((acc: InjectedAccount) => {
    let publicKeyHex: HexString | undefined;
    try {
      // 从原始地址解码出公钥
      const publicKeyBytes = decodeAddress(acc.address);
      // 将公钥 Uint8Array 转换为十六进制字符串 (不带 '0x' 前缀)
      publicKeyHex = u8aToHex(publicKeyBytes);
    } catch (error) {
      // 如果解码失败（地址格式可能无效），则 publicKey 为 undefined
      console.error(`Failed to decode address "${acc.address}" to extract public key:`, error);
    }

    // 构建我们定义的 Account 对象
    const mappedAccount: Account = {
      address: acc.address, // 保留从钱包获取的原始地址
      name: acc.name, // 使用钱包提供的名称
      publicKey: publicKeyHex, // 添加提取的公钥
      meta: {
        source: sourceId, // 保留来源信息
        genesisHash: acc.genesisHash, // 保留 genesisHash
      },
      type: acc.type
    };

    return mappedAccount;
  });
}
