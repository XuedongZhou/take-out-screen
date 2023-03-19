import { fileURLToPath, URL } from 'node:url';

import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import viteCompression from 'vite-plugin-compression';
import legacy from '@vitejs/plugin-legacy';

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        vue(),
        viteCompression(),
        legacy({
            targets: ['> 0.5% in CN', 'not IE 11']
        })
    ],
    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./src', import.meta.url))
        }
    },
    css: {
        preprocessorOptions: {
            scss: {
                additionalData: '@import "./src/assets/style/variable.scss";'
            }
        }
    },
    base: '/large-screen',
    build: {
        outDir: 'large-screen',
        rollupOptions: {
            output: {
                manualChunks: (id) => {
                    if (id.includes('node_modules')) {
                        return 'vendor';
                    }
                }
            }
        }
    },
    server: {
        port: 4444,
        host: '0.0.0.0',
        // proxy: {
        //     '/take-out-api': {
        //         target: 'https://book.youbaobao.xyz:18082',
        //         rewrite: (path) => path.replace(/^\/take-out-api/, ''),
        //         changeOrigin: true
        //     }
        // }
    }
});
