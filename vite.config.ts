/*
 * @Author: xie 1459547902@qq.com
 * @Date: 2024-07-22 09:41:22
 * @LastEditors: xie 1459547902@qq.com
 * @LastEditTime: 2024-07-26 14:28:38
 * @FilePath: \learnvue3_vite\vite.config.ts
 * @Description: vite.config.ts
 */
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
import { ElementPlusResolver } from "unplugin-vue-components/resolvers";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    AutoImport({
      imports: ['vue', 'vue-router'],
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [ElementPlusResolver()],
    }),
  ],
  resolve: {
    alias: {
      "@": "/src",
    },
  },
  define: {
   __APP_VERSION__: JSON.stringify('1.0.0'),
  }
});
