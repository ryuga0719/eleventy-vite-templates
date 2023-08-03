import path from 'path';
import { splitVendorChunkPlugin } from 'vite';

const builtDir = 'dist';

export default {
  lang: 'ja-JP',
  base: './',
  assetsDir: './',
  server: {
    host: true,
    port: 8888
  },
  build: {
    manifest: false,
    outDir: 'dist',
    assetsDir: './src/assets',
    rollupOptions: {
      input: ['/src/assets/ts/main.ts', '/src/assets/scss/main.scss'],
      output: {
        assetFileNames: assetInfo => {
          let extType = assetInfo.name.split('.').at(1);
          // if (/png|jpg|jpeg|svg|gif|tiff|bmp|ico/i.test(extType)) {
          //   extType = 'img';
          // }
          return `assets/${extType}/[name][extname]`;
        },
        chunkFileNames: 'assets/js/vendor/[name]-[hash].js', // ビルド後のチャンクファイル名
        entryFileNames: 'assets/js/[name].js' // ビルド後のjsファイル名
      }
    }
  },
  css: {
    preprocessorOptions: {
      scss: {
        charset: false
      }
    }
  },
  plugins: [splitVendorChunkPlugin()],
  resolve: {
    alias: {
      '@': path.resolve('./src')
    }
  }
};

