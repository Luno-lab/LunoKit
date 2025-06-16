import { type ClassValue, clsx } from 'clsx';
import { extendTailwindMerge } from 'tailwind-merge';

const customTwMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      'font-size': [
        'text-sm',
        'text-primary',
        'text-lg',
        'text-title',
        'text-secondary',
        'text-accent'
      ]
    }
  }
});

export function cs(...inputs: ClassValue[]) {
  return customTwMerge(clsx(inputs));
}
