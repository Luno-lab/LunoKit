import {bnToBn, u8aToHex} from '@polkadot/util';
import {Account} from '../types'
import {decodeAddress, encodeAddress} from '@polkadot/util-crypto'

/**
 * 格式化余额
 *
 * @param value 余额数值
 * @param decimals 小数位数
 * @param options 格式化选项
 * @returns 格式化后的字符串
 */
export function formatBalance(
  value: string | number | bigint,
  decimals: number,
  options?: {
    fixedDecimals?: number;
    thousandSeparator?: string;
  }
): string {
  const bn = bnToBn(value);
  const { fixedDecimals = 4, thousandSeparator = ',' } = options || {};

  // 计算带小数点的格式
  const base = 10n ** BigInt(decimals);
  const whole = bn / base;
  const fraction = bn % base;

  // 添加前导零
  let fractionStr = fraction.toString();
  while (fractionStr.length < decimals) {
    fractionStr = '0' + fractionStr;
  }

  // 裁剪到指定小数位
  fractionStr = fractionStr.substring(0, fixedDecimals);

  // 格式化整数部分（添加千位分隔符）
  let wholeStr = whole.toString();
  if (thousandSeparator) {
    wholeStr = wholeStr.replace(/\B(?=(\d{3})+(?!\d))/g, thousandSeparator);
  }

  // 如果小数部分为0或空，则不显示小数点
  if (parseInt(fractionStr) === 0 || fractionStr === '') {
    return wholeStr;
  }

  return `${wholeStr}.${fractionStr}`;
}

/**
 * 格式化地址显示
 *
 * @param address 地址
 * @param prefixLength 前缀长度
 * @param suffixLength 后缀长度
 * @returns 格式化后的地址
 */
export function formatAddress(
  address: string,
  prefixLength = 4,
  suffixLength = 4
): string {
  if (!address) return '';
  if (address.length <= prefixLength + suffixLength) return address;

  const prefix = address.slice(0, prefixLength);
  const suffix = address.slice(-suffixLength);

  return `${prefix}...${suffix}`;
}

/**
 * 格式化时间戳
 *
 * @param timestamp 时间戳（毫秒）
 * @returns 格式化后的日期时间字符串
 */
export function formatTimestamp(timestamp: number): string {
  return new Date(timestamp).toLocaleString();
}

/**
 * 将账户列表转换为指定的 SS58 格式
 * 这是一个纯工具方法，不修改连接器内部状态
 * @param accounts 账户列表
 * @param ss58Format 目标 SS58 格式
 * @returns 转换后的账户列表
 */
export function formatAccounts(accounts: Array<Account>, ss58Format: number): Array<Account> {
  try {
    return accounts.map(account => {
      try {
        if (account.ss58Format === ss58Format) {
          return account;
        }
        // 先解码获取公钥
        const publicKey = decodeAddress(account.address);
        // 将 Uint8Array 转换为十六进制字符串
        const publicKeyHex = u8aToHex(publicKey)

        // 使用目标 SS58 格式编码地址
        const formattedAddress = encodeAddress(publicKey, ss58Format);

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
  } catch (error) {
    console.error(`地址工具加载失败: ${error}`);
    return accounts;
  }
}
