import { App } from 'vue'
import VideoPlayer from './components/VideoPlayer.vue';

function install(Vue: App) {
  Vue.component('VideoPlayer', VideoPlayer);
  Vue.component('video-player', VideoPlayer);
}
export default { install }