import { defineConfig } from 'tsup';

export default defineConfig(options => ({
  entry: [
    'src/index.ts',
    'src/chains/index.ts',
    'src/connectors/index.ts',
    'src/utils/index.ts',
    'src/types/index.ts'
  ],
  format: ['esm', 'cjs'],
  splitting: true,
  sourcemap: true,
  clean: true,
  treeshake: true,
  external: [
    'dedot',
    '@dedot/chaintypes',
  ],
  dts: {
    resolve: true,
    compilerOptions: {
      composite: false,
    },
  },
  tsconfig: './tsconfig.json',
  minify: !options.watch,
  esbuildOptions() {
    if (!options.watch) {
      options.drop = ['console', 'debugger']
    }
  }
}));
