import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
// import typescript2 from 'rollup-plugin-typescript2'

/**
 * vite build 无法生成类型申明
 * https://github.com/vitejs/vite/issues/2049,
 * 解决方案： 1. 使用 typescript2,2. 使用tsc
 */
// https://vitejs.dev/config/
export default defineConfig({
  root:'.',
  base:'./',
  plugins: [
    vue(),
    // {
    //   ...typescript2(),
    //   apply: 'build'
    // }
  ],
  build: {
    //构建为库
    lib: {
      //打包入口文件
      entry: resolve(__dirname, 'src/index.ts'),
      //umd时,浏览器中全局变量
      name:'ItshizhanVPlayer',
      fileName:'index'
    },
    // 默认dist, fileName 是 package.json 的 name 选项
    // outDir:'lib',
    rollupOptions: {
      // 不打包vue
      external: ['vue'],
      output: {
        globals: {
          vue: 'Vue',
        },
      }
    }
  }
})
