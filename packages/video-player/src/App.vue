<template>
  <div style="width:100%">
    <h3>VideoPlayer Demo</h3>
    <div class="video-box" style="width:100vw">
      <video-player :src="src" poster="/src/assets/poster.jpg" />
    </div>
  </div>
</template>

<script lang="ts">
import VideoPlayer from './components/VideoPlayer.vue';
import { defineComponent,ref } from 'vue';
const App = defineComponent({
  name: 'App',
  components: {
    VideoPlayer,
  },
  setup() {
    const src = ref("https://file.ooowin.com/lvP5Y8CnvrwACu3_Q8ovaVMLb00h.mp4")
    return {
      src
    }
  }
})
export default App;
</script>

<style>
  .video-box{
    margin: 0 auto;
  }
</style>
