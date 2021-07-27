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
import { defineComponent } from 'vue';
//@ts-ignore
import src from './assets/video.mp4';
const App = defineComponent({
  name: 'App',
  components: {
    VideoPlayer,
  },
  setup() {
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
