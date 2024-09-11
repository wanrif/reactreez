/// <reference types="vitest" />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import { fileURLToPath, URL } from 'url';
import { obfuscator } from 'rollup-obfuscator';
import { nodePolyfills } from 'vite-plugin-node-polyfills';

/**
 * @var prefix - unique prefix for the project
 * @example /reactreez/login -> reactreez
 */
const prefix = 'reactreez';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    obfuscator({
      compact: true,
      controlFlowFlattening: false,
      deadCodeInjection: false,
      debugProtection: false,
      debugProtectionInterval: 0,
      disableConsoleOutput: false,
      identifierNamesGenerator: 'hexadecimal',
      log: false,
      numbersToExpressions: false,
      renameGlobals: false,
      selfDefending: false,
      simplify: true,
      splitStrings: false,
      stringArray: false,
      stringArrayCallsTransform: false,
      stringArrayCallsTransformThreshold: 0.5,
      stringArrayEncoding: [],
      stringArrayIndexShift: true,
      stringArrayRotate: true,
      stringArrayShuffle: true,
      stringArrayWrappersCount: 1,
      stringArrayWrappersChainedCalls: true,
      stringArrayWrappersParametersMaxCount: 2,
      stringArrayWrappersType: 'variable',
      stringArrayThreshold: 0.75,
      unicodeEscapeSequence: false,
      sourceMap: false,
    }),
    nodePolyfills(),
  ],
  build: {
    rollupOptions: {
      output: {
        assetFileNames: `${prefix ? `${prefix}/` : ''}assets/[name]-[hash][extname]`,
        chunkFileNames: `${prefix ? `${prefix}/` : ''}chunks/[name]-[hash].js`,
        entryFileNames: `${prefix ? `${prefix}/` : ''}[name]-[hash].js`,
        manualChunks(id) {
          if (id.includes('node_modules')) {
            return id.toString().split('node_modules/')[1].split('/')[0].toString().replace('@', '');
          }
        },
      },
    },
  },
  resolve: {
    alias: {
      '@app': fileURLToPath(new URL('./src/app', import.meta.url)),
      '@components': fileURLToPath(new URL('./src/components', import.meta.url)),
      '@layouts': fileURLToPath(new URL('./src/layouts', import.meta.url)),
      '@pages': fileURLToPath(new URL('./src/pages', import.meta.url)),
      '@routes': fileURLToPath(new URL('./src/routes', import.meta.url)),
      '@assets': fileURLToPath(new URL('./src/assets', import.meta.url)),
      '@styles': fileURLToPath(new URL('./src/styles', import.meta.url)),
      '@utils': fileURLToPath(new URL('./src/utils', import.meta.url)),
      '@i18n': fileURLToPath(new URL('./src/i18n', import.meta.url)),
      '@middleware': fileURLToPath(new URL('./src/middleware', import.meta.url)),
      '@store': fileURLToPath(new URL('./src/store', import.meta.url)),
      '@service': fileURLToPath(new URL('./src/service', import.meta.url)),
    },
  },
  server: {
    port: 3000,
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./vitest.setup.ts'],
    coverage: {
      enabled: true,
      provider: 'v8',
      // exclude: ['src/**/*.tsx', '*.config.*', 'coverage/**', 'node_modules/**'],
      exclude: [
        '*.config.*',
        'coverage/**',
        'dist/**',
        'node_modules/**',
        '**/*.d.ts',
        'src/utils/**',
        'src/pages/**/loadable.tsx',
        'src/i18n/index.ts',
      ],
      reporter: ['text', 'html', 'clover', 'json', 'lcov'],
      thresholds: {
        autoUpdate: true,
        statements: 45.93,
        branches: 75.47,
        functions: 52.08,
        lines: 45.93,
      },
    },
  },
});