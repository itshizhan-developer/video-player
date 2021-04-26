<template>
  <h3>Demos</h3>
  <!-- <video src="./assets/video.mp4" controls></video> -->
  <div class="video-box">
    <!-- 相对路径报错 -->
    <!-- <video-player :src="mp4Src" poster="assets/poster.jpg"/> -->
    <video-player :src="mp4Src" :poster="posterSrc"/>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
//@ts-ignore
import mp4Src from './assets/video.mp4';
//@ts-ignore
import posterSrc from './assets/poster.jpg';

export default defineComponent({
  name: 'App',
  setup() {
    return {
      mp4Src,
      posterSrc
    }
  }
})
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  /* margin-top: 60px; */
}
.video-box {
  width:800px;
  margin: 0 auto;
}
</style>
