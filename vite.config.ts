/// <reference types="vitest" />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import { fileURLToPath, URL } from 'url';
import { obfuscator } from 'rollup-obfuscator';

// https://vitejs.dev/config/
export default () => {
  /**
   * @var prefix - unique prefix for the project
   * @example /reactreez/login -> reactreez
   */
  const prefix = 'reactreez';

  return defineConfig({
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
        selfDefending: true,
        simplify: true,
        splitStrings: false,
        stringArray: true,
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
      }),
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
      coverage: {
        provider: 'v8',
        exclude: ['src/**/*.tsx', '*.config.*', 'coverage/**', 'node_modules/**'],
        thresholds: {
          autoUpdate: true,
          statements: 80,
          branches: 80,
          functions: 80,
          lines: 80,
        },
      },
    },
  });
};
