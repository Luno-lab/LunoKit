import { defineConfig } from 'tsup';

export default defineConfig((options) => ({
  entry: [
    'src/index.ts',
    'src/chains/index.ts',
    'src/connectors/index.ts',
    'src/utils/index.ts',
    'src/types/index.ts',
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
  external: ['react', 'react-dom', '@tanstack/react-query'],
  tsconfig: './tsconfig.json',
  esbuildOptions() {
    if (!options.watch) {
      options.drop = ['console', 'debugger'];
    }
  },
}));
