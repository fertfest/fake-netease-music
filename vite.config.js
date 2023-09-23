import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

import 'dotenv/config'
console.log(process.env.PROXY_URL);

const toBackend = ['/banner', '/top', '/playlist', '/login', '/user', '/song/url', '/song/detail', '/logout', '/artist', '/dj/toplist', '/lyric'];
const proxyObject = {};
toBackend.every((url) => {
  proxyObject[url] = "http://localhost:9000";
  return true;
});


// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: proxyObject,
  },
});
