export function debounce(fn: () => void, ms: number) {
  let timer: NodeJS.Timeout | null;

  return () => {
    if (timer) {
      clearTimeout(timer as number);
    }

    timer = setTimeout(() => {
      timer = null;
      fn();
    }, ms);
  };
}
