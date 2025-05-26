// packages/ui/src/utils/cn.ts
import { type ClassValue, clsx } from 'clsx';
import { extendTailwindMerge } from 'tailwind-merge';

// 创建自定义的 twMerge 配置
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
