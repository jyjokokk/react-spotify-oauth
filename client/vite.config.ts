import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react-swc'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      src: path.resolve(__dirname, './src')
    }
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./vitest.setup.ts'],
    coverage: {
      exclude: [
        '**/*.spec.tsx',
        '**/*.spec.ts',
        '**/*.test.ts',
        '**/*.test.tsx',
        '**/*.d.ts',
        '**/*.config.ts',
        '**/*.setup.ts',
        '**/*.type.ts'
      ]
    }
  }
})
