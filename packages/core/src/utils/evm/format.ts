const DISPLAY_DECIMALS = 4;

/**
 * Truncate a formatted balance string to a fixed number of decimal places.
 * Removes trailing zeros from the fractional part.
 */
export function truncateDecimals(value: string, fixedDecimals: number = DISPLAY_DECIMALS): string {
  const [integer, fraction] = value.split('.');
  if (!fraction) return integer;
  const trimmed = fraction.slice(0, fixedDecimals).replace(/0+$/, '');
  return trimmed ? `${integer}.${trimmed}` : integer;
}
