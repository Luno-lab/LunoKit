import { decodeAddress, encodeAddress, isAddress } from '@polkadot/util-crypto';
import type { Account } from '../types';
import {u8aToHex} from '@polkadot/util'
import {InjectedAccountWithMeta} from '@polkadot/extension-inject/types'

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
    throw new Error(`无法转换地址: ${error.message}`);
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
    return Array.from(publicKey1).toString() === Array.from(publicKey2).toString();
  } catch (error: any) {
    return false;
  }
}

/**
 * 获取Polkadot主网格式的地址（SS58格式为0）
 *
 * @param address 任何SS58格式的地址
 * @param ss58Format 可选的SS58格式，默认为0（Polkadot）
 * @returns 转换后的地址
 */
export function toPolkadotAddress(address: string, ss58Format: number = 0): string {
  return convertAddress(address, ss58Format);
}

/**
 * 获取Kusama格式的地址（SS58格式为2）
 *
 * @param address 任何SS58格式的地址
 * @param ss58Format 可选的SS58格式，默认为2（Kusama）
 * @returns 转换后的地址
 */
export function toKusamaAddress(address: string, ss58Format: number = 2): string {
  return convertAddress(address, ss58Format);
}

/**
 * 获取自定义格式的地址
 *
 * @param address 任何SS58格式的地址
 * @param ss58Format 自定义的SS58格式
 * @returns 转换后的地址
 */
export function toCustomAddress(address: string, ss58Format: number): string {
  return convertAddress(address, ss58Format);
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
export function mapInjectedAccounts(injectedAccounts: InjectedAccountWithMeta[]): Account[] {
  if (!injectedAccounts) {
    return []; // 处理 null 或 undefined 输入
  }

  return injectedAccounts.map((acc: InjectedAccountWithMeta) => {
    let publicKeyHex: string | undefined;
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
      name: acc.meta?.name, // 使用钱包提供的名称
      publicKey: publicKeyHex, // 添加提取的公钥
      meta: {
        source: acc.meta?.source, // 保留来源信息
        genesisHash: acc.meta?.genesisHash, // 保留 genesisHash
        // 可以选择性添加其他需要的 meta 字段，如 acc.meta.type
      }
    };

    return mappedAccount;
  });
}
