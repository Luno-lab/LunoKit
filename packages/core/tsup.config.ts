import { defineConfig } from 'tsup';

export default defineConfig(options => ({
  entry: [
    'src/index.ts',
    'src/chains/index.ts',
    'src/connectors/index.ts',
    'src/utils/index.ts'
  ],
  format: ['esm', 'cjs'],
  splitting: true,
  sourcemap: true,
  clean: true,
  treeshake: true,
  external: [
    '@polkadot/api',
    '@polkadot/extension-dapp',
    '@polkadot/util',
    '@polkadot/util-crypto',
    '@walletconnect/sign-client',
    '@walletconnect/types',
    '@walletconnect/utils'
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
