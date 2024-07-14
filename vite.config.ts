import { defineConfig } from 'vite';
import path from 'path';

export default defineConfig({
  resolve: {
    extensions: ['.js', '.ts'],
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  }
});
