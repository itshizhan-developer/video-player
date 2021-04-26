import { Ref } from "vue";
export default function useTogglePlay(videoDom: Ref<HTMLVideoElement|undefined>  ){
  return function togglePlay(){
    const video  = videoDom.value;
    if(video){
      if (video.paused || video.ended) {
        video.play();
      } else {
        video.pause();
      }
    }
  }
}