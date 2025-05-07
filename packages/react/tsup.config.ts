import { defineConfig } from 'tsup';

export default defineConfig({
  entry: [
    'src/index.ts'
  ],
  format: ['esm', 'cjs'],
  dts: true,
  splitting: true,
  sourcemap: true,
  clean: true,
  treeshake: true,
  external: [
    'react',
    'react-dom',
    '@tanstack/react-query',
    '@luno/core',
    'zustand',
  ],
});
