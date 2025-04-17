import { decodeAddress, encodeAddress, isAddress } from '@polkadot/util-crypto';
import type { PolkadotAccount } from '../types';

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
 * 将账户列表转换为指定的 SS58 格式
 * 
 * @param accounts 账户列表
 * @param ss58Format 目标 SS58 格式
 * @returns 转换后的账户列表
 */
export function formatAccounts(accounts: Array<PolkadotAccount>, ss58Format: number): Array<PolkadotAccount> {
  return accounts.map(account => {
    try {
      // 如果已经是目标格式，直接返回
      if (account.ss58Format === ss58Format) {
        return account;
      }
      
      // 如果有公钥，直接用公钥生成新地址
      if (account.publicKey) {
        // 如果publicKey是十六进制字符串，需要转换
        const publicKey = account.publicKey.startsWith('0x') 
          ? account.publicKey 
          : `0x${account.publicKey}`;
        
        // 编码新地址
        const formattedAddress = encodeAddress(publicKey, ss58Format);
        
        return {
          ...account,
          address: formattedAddress,
          ss58Format: ss58Format
        };
      }
      
      // 否则解码地址获取公钥，再重新编码
      const publicKey = decodeAddress(account.address);
      const formattedAddress = encodeAddress(publicKey, ss58Format);
      
      // 将公钥转为十六进制，方便后续使用
      const publicKeyHex = Array.from(publicKey)
        .map(b => b.toString(16).padStart(2, '0'))
        .join('');
      
      return {
        ...account,
        address: formattedAddress,
        publicKey: publicKeyHex,
        ss58Format: ss58Format
      };
    } catch (error) {
      console.error(`转换地址格式失败: ${error}`);
      // 如果转换失败，返回原样
      return account;
    }
  });
} 