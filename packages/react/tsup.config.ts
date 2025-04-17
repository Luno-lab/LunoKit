import { defineConfig } from 'tsup';

export default defineConfig({
  entry: [
    'src/index.ts', 
    'src/hooks/index.ts', 
    'src/components/index.ts'
  ],
  format: ['esm'],
  dts: true,
  splitting: true,
  sourcemap: true,
  clean: true,
  treeshake: true,
  external: [
    'react', 
    '@tanstack/react-query', 
    '@poma/core'
  ],
}); 