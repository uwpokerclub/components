import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { copyFileSync, mkdirSync } from 'node:fs';

const dirname =
  typeof __dirname !== 'undefined' ? __dirname : path.dirname(fileURLToPath(import.meta.url));

// Plugin to copy CSS files to dist
const copyCSSPlugin = () => ({
  name: 'copy-css',
  closeBundle() {
    const distStyles = path.resolve(dirname, 'dist/styles');
    mkdirSync(distStyles, { recursive: true });
    copyFileSync(
      path.resolve(dirname, 'src/styles/tokens.css'),
      path.resolve(distStyles, 'tokens.css')
    );
  },
});

export default defineConfig({
  plugins: [react(), copyCSSPlugin()],
  build: {
    emptyOutDir: false, // Don't delete .d.ts files from build:types
    lib: {
      entry: path.resolve(dirname, 'src/index.ts'),
      name: 'UWPokerClubComponents',
      formats: ['es', 'cjs'],
      fileName: (format) => `index.${format === 'es' ? 'js' : 'cjs'}`,
    },
    rollupOptions: {
      external: ['react', 'react-dom', 'react/jsx-runtime'],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
          'react/jsx-runtime': 'jsxRuntime',
        },
        preserveModules: true,
        preserveModulesRoot: 'src',
        exports: 'named',
      },
    },
    sourcemap: true,
    minify: false,
  },
});
