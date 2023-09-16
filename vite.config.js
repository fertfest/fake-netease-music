import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

const toBackend = ['/banner', '/top', '/playlist', '/login', '/user', '/song/url', '/song/detail', '/logout'];
const proxyObject = {};
toBackend.every((url) => {
  proxyObject[url] = 'http://localhost:3000';
  return true;
});


// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: proxyObject,
  },
});
