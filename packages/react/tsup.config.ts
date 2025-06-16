import { defineConfig } from 'tsup';

export default defineConfig((options) => ({
  entry: [
    'src/index.ts'
  ],
  banner: {
    js: "'use client'",
  },
  format: ['esm', 'cjs'],
  dts: {
    resolve: true,
    compilerOptions: {
      composite: false,
    },
  },
  minify: !options.watch,
  splitting: true,
  sourcemap: true,
  clean: true,
  treeshake: true,
  external: [
    'react',
    'react-dom',
    '@tanstack/react-query',
    '@luno-kit/core',
    'zustand',
  ],
  tsconfig: './tsconfig.json',
  esbuildOptions() {
    if (!options.watch) {
      options.drop = ['console', 'debugger']
    }
  }
}));
