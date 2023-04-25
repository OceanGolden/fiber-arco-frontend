import svgrPlugin from '@arco-plugins/vite-plugin-svgr';
import { vitePluginForArco } from '@arco-plugins/vite-react';
import react from '@vitejs/plugin-react-swc';
import { defineConfig } from 'vite';
import WindiCSS from 'vite-plugin-windicss';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    WindiCSS(),
    vitePluginForArco(),
    svgrPlugin({
      svgrOptions: {},
    }),
  ],
  server: {
    port: 3000,
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:8080/',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
  resolve: {
    alias: [{ find: '@', replacement: '/src' }],
  },
});
