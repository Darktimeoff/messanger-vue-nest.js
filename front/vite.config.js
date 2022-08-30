import { defineConfig } from 'vite'
import Vue from '@vitejs/plugin-vue'
import Pages from 'vite-plugin-pages'
import Layouts from 'vite-plugin-vue-layouts'
import Components from 'unplugin-vue-components/vite'
import {
  AntDesignVueResolver
} from 'unplugin-vue-components/resolvers'
import {resolve} from 'path'
import AutoImport from 'unplugin-auto-import/vite'

export default defineConfig({
  plugins: [
    Vue(),
    Pages(),
    Layouts(),
    Components({
      dts: true,
      resolvers: [
        AntDesignVueResolver(),
      ]
    }),
    AutoImport({
      include: [
        /\.vue$/,
        /\.vue\?vue/, // .vue
      ],
      dirs: ['./hooks'],
      imports: ['vue', 'vue-router', 'pinia', '@vueuse/core', 'vee-validate'],
      eslintrc: {
        enabled: true,
      },
    }),
  ],
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `
        @import "@/styles/_variables.scss";
        @import "@/styles/_animation.scss";
      `,
      },
    },
  },
  resolve: {
    alias: [
      { find: '@', replacement: resolve(__dirname, './src') },
      { find: '~', replacement: resolve(__dirname, './src') },
    ],
  },
  server: {
    fs: {
      allow: ['.'],
    },
  },
})
