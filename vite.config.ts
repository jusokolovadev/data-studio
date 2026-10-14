import { defineConfig } from 'vite'
import { reactRouter } from '@react-router/dev/vite';

// https://vite.dev/config/
export default defineConfig({
  plugins: [reactRouter()],
  server: {
    host: "127.0.0.1",
    port: 5173,
    strictPort: true,
  },
})
