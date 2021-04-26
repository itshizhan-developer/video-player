import { createApp } from 'vue'
import App from './App.vue'
import VPlayer from "@itshizhan/video-player";
import "@itshizhan/video-player/dist/style.css";
createApp(App).use(VPlayer).mount('#app')
