export const isMobileDevice = () => {
  if (typeof window !== 'undefined' && window.navigator && window.navigator.userAgent) {
    return /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(
      window.navigator.userAgent.toLowerCase()
    );
  }
  return false
};
