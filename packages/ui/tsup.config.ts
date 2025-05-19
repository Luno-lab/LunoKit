// packages/ui/tsup.config.ts
import {defineConfig} from 'tsup';

export default defineConfig((options) => ( {
  entry: ['src/index.ts'],
  banner: {
    js: "'use client'",
  },
  format: ['esm', 'cjs'],
  dts: true,
  splitting: false,
  sourcemap: true,
  clean: true,
  minify: !options.watch,

  external: [
    'react',
    'react-dom',
  ],
  tsconfig: './tsconfig.json',
  ...options,
}));
