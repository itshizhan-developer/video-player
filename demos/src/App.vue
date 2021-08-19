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
import { defineComponent, onMounted,ref } from 'vue'


export default defineComponent({
  name: 'App',
  setup() {
    const mp4Src = ref("");
    const posterSrc = ref("https://file.ooowin.com/20190305/964ed66bdf7035c0aff07836eb00d19c.png")
    onMounted(()=>{
      setTimeout(()=>{
        mp4Src.value = "https://file.ooowin.com/lvP5Y8CnvrwACu3_Q8ovaVMLb00h.mp4"
      },1000)
    })
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
