import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/index.ts'],
  sourcemap: true,
  clean: true,
  minify: 'terser',
  splitting: false,
  outDir: 'dist',
  dts: true,
  legacyOutput: true,
  format: ['cjs', 'esm'],
});
