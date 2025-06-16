import { bnToBn } from '@polkadot/util';

/**
 * format balance
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

  const basePower = BigInt(decimals);
  const base = bnToBn(10n ** basePower);
  const whole = bn.div(base);
  const fraction = bn.mod(base);

  let fractionStr = fraction.toString();
  while (fractionStr.length < decimals) {
    fractionStr = '0' + fractionStr;
  }

  fractionStr = fractionStr.substring(0, fixedDecimals);

  let wholeStr = whole.toString();
  if (thousandSeparator) {
    wholeStr = wholeStr.replace(/\B(?=(\d{3})+(?!\d))/g, thousandSeparator);
  }

  if (parseInt(fractionStr) === 0 || fractionStr === '') {
    return wholeStr;
  }

  return `${wholeStr}.${fractionStr}`;
}

/**
 * format address display
 */
export function formatAddress(
  address?: string,
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
 * format timestamp
 */
export function formatTimestamp(timestamp: number): string {
  return new Date(timestamp).toLocaleString();
}
