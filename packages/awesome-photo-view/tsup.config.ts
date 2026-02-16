import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['cjs', 'esm'],
  dts: true,
  clean: true,
  outDir: 'dist',
  external: ['react', 'react-dom'],
  sourcemap: true,
  treeshake: true,
  splitting: false,
  esbuildOptions(options) {
    // Ignore .less imports - CSS is built separately
    options.loader = {
      ...options.loader,
      '.less': 'empty',
    };
  },
});
