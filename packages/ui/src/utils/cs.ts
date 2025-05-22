// packages/ui/src/utils/cn.ts
import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cs(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
