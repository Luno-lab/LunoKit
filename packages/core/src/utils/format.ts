/**
 * format balance
 */
export function formatBalance(
  value: string | number | bigint | undefined,
  decimals: number = 0,
  fixedDecimals: number = 4
): string {
  if (value === undefined || value === null) {
    return '0';
  }

  const bn = typeof value === 'bigint' ? value : BigInt(value);

  if (decimals === 0) {
    return bn.toString();
  }

  const base = BigInt(10) ** BigInt(decimals);
  const whole = bn / base;
  const fraction = bn % base;

  if (fraction === 0n) {
    return whole.toString();
  }

  // 函数式处理，避免 let
  const paddedFraction = fraction.toString().padStart(decimals, '0');
  const truncatedFraction = paddedFraction
    .substring(0, fixedDecimals)
    .replace(/0+$/, '');

  return truncatedFraction ? `${whole.toString()}.${truncatedFraction}` : whole.toString();
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

export { formatBalance as formatBalanceWithUnit } from 'dedot/utils';
