/**
 * format balance
 */
export function formatBalance(
  value: Optional<string | number | bigint>,
  decimals: number = 0,
  fixedDecimals: number = 4
): string {
  if (value === undefined || value === null || value === '') {
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

  const paddedFraction = fraction.toString().padStart(decimals, '0');
  const truncatedFraction = paddedFraction.substring(0, fixedDecimals).replace(/0+$/, '');

  return truncatedFraction ? `${whole.toString()}.${truncatedFraction}` : whole.toString();
}

/**
 * format address display
 */
export function formatAddress(
  address?: Optional<string>,
  prefixLength = 4,
  suffixLength = 4
): string {
  if (!address) return '';
  if (address.length <= prefixLength + suffixLength) return address;

  const prefix = address.slice(0, prefixLength);
  const suffix = suffixLength > 0 ? address.slice(-suffixLength) : '';

  return `${prefix}...${suffix}`;
}

export { formatBalance as formatBalanceWithUnit } from 'dedot/utils';
