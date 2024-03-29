import path from 'path'
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import VitePluginHtmlEnv from 'vite-plugin-html-env';
import { visualizer } from 'rollup-plugin-visualizer';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const isDevEnv = mode === 'development';

  return {
    server: {
      port: process.env.PORT || 3001,
    },
    build: {
      outDir: path.resolve(__dirname, 'build'),
      rollupOptions: {
        plugins: [visualizer({
          filename: './dist/report.html',
          open: false,
          brotliSize: true
        })],
      },
    },
    envPrefix: 'REACT_APP_',
    define: {
      'process.env': process.env
    },
    plugins: [isDevEnv && react(), VitePluginHtmlEnv()],
  }
});
