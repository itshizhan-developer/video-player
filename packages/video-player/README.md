# @itshizhan/video-player
video-player based vue3 and typescript

# Get Started
## Npm
```shell
$ npm install @itshizhan/video-player --save
```
## Yarn
```shell
$ yarn add @itshizhan/video-player --save
```

# Usage

```typescript

import { createApp } from 'vue'
import App from './App.vue'
import VPlayer from "@itshizhan/video-player";
import "@itshizhan/video-player/dist/style.css";

createApp(App).use(VPlayer).mount('#app')
```

# 更新日志
2021-08-20 
  - 区分移动端和PC的适配
  - 异步加载视频地址

2021-07-28 已适配移动端

# Inspired

This Component is inspired by this [Article](https://freshman.tech/custom-html5-video/), just refactor based on vue3 and typescript

# Referrence

https://freshman.tech/custom-html5-video/

https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/video

https://vitejs.dev/

https://github.com/vitejs/vite/issues/2989

https://github.com/vitejs/vite/issues/2049

https://github.com/egoist/rollup-plugin-esbuild

https://github.com/egoist/tsup

https://github.com/ezolenko/rollup-plugin-typescript2

https://github.com/Swatinem/rollup-plugin-dts

https://github.com/rollup/rollup


