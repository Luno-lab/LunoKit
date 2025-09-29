import { type ClassValue, clsx } from 'clsx';
import { extendTailwindMerge } from 'tailwind-merge';

const customTwMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      'font-size': ['text-xs', 'text-sm', 'text-base', 'text-lg'],
    },
  },
});

export function cs(...inputs: ClassValue[]) {
  return customTwMerge(clsx(inputs));
}
