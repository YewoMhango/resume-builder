import { resolve } from 'path'
import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'

export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'SmoothDNDReact',
      formats: ['es', 'umd'],
      fileName: 'smooth-dnd-react',
    },
    rollupOptions: {
      external: ['react', 'prop-types', '@smooth-dnd/core'],
    },
  },
  plugins: [dts()],
})
