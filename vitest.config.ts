// vitest.config.ts
import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    // setupFiles: './vitest.setup.tsx', // Optional: for global setup
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './'), // Adjust if your alias points elsewhere
    },
  },
});
