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
    resolve: true, // 可选，但有助于解析类型依赖
    compilerOptions: {
      composite: false, // <--- 关键：仅在 DTS 构建时禁用 composite
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
    '@luno/core',
    'zustand',
  ],
  tsconfig: './tsconfig.json'
}));
