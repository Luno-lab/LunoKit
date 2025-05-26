export function shortAddress(str: any): string {
  if (Array.isArray(str)) {
    str = '[' + str.toString() + ']';
  }
  if (str) {
    if (typeof str.toString === 'function') {
      str = str.toString();
    }
    if (str.length <= 10) {
      return str;
    }
    return `${str.slice(0, 5)}...${str.slice(str.length - 5, str.length)}`;
  }
  return '';
}
