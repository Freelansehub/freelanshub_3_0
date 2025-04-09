import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      input: './index.html',
      external: [
        '**/*.test.ts',
        '**/*.test.tsx',
        '**/*.test.js',
        '**/*.test.jsx',
      ], // Исключаем тестовые файлы из сборки
    },
    outDir: 'dist', // Папка для вывода собранных файлов
    assetsDir: 'assets', // Папка для хранения ресурсов (картинки, шрифты и т.д.)
    emptyOutDir: true, // Очищаем папку перед сборкой
  },
});
