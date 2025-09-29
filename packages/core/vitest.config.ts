import { mergeConfig } from 'vitest/config';
import baseConfig from '../../vitest.base.config';

export default mergeConfig(baseConfig, {
  test: {
    coverage: {
      exclude: ['node_modules/', 'dist/', '**/*.d.ts', '**/*.test.ts', 'scripts/', '*.config.ts'],
    },
  },
});
