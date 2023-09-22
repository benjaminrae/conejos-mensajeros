import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/index.ts'],
  sourcemap: true,
  clean: true,
  minify: 'terser',
  splitting: false,
  legacyOutput: true,
  outDir: 'dist',
  dts: true,
});
