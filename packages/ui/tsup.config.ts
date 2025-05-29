import { defineConfig } from 'tsup';

export default defineConfig((options) => ( {
  entry: ['src/index.ts'],
  banner: {
    js: "'use client'",
  },
  format: ['esm', 'cjs'],
  dts: true,
  splitting: false,
  sourcemap: true,
  clean: !options.watch, // 只在非 watch 模式下清理
  minify: !options.watch,
  external: [
    'react',
    'react-dom',
  ],
  tsconfig: './tsconfig.json',
  loader: {
    '.ttf': 'file',
  },
  publicDir: './src/assets/fonts',
  ...options,
}));
