import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

import 'dotenv/config'

const toBackend = ['/banner', '/top', '/playlist', '/login', '/user', '/song/url', '/song/detail', '/logout', '/artist', '/dj/toplist', '/lyric'];
const proxyObject = {};
toBackend.every((url) => {
  proxyObject[url] = process.env.PROXY_URL;
  return true;
});


// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: proxyObject,
  },
});
