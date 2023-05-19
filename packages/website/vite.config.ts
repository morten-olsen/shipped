import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import mdx from "@mdx-js/rollup"
import path from 'path';

const ASSET_URL = process.env.ASSET_URL || '';

// https://vitejs.dev/config/
export default defineConfig({
  base: `${ASSET_URL}/`,
  plugins: [react(), mdx()],
  resolve:{
    alias:{
      '@' : path.resolve(__dirname, './src'),
      'node-fetch': 'isomorphic-fetch',
    },
  },
})
