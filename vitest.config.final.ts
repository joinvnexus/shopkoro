// vitest.config.final.ts
import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  test: {
    globals: false,
    environment: 'jsdom',
    setupFiles: './vitest.setup.fixed.tsx',
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './'),
    },
  },
});