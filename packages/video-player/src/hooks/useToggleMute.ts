import { Ref, ref, onMounted } from 'vue';
export default function useToggleMute(videoDom: Ref<HTMLVideoElement|undefined>  ){
  const isMute = ref(false)
  onMounted(()=>{
    isMute.value = false
  })
  function toggleMute(){
    const video = videoDom.value as HTMLVideoElement
    video.muted = !video.muted;
    isMute.value = video.muted;
    // TODO  大小处理
  }
  return {
    toggleMute,
    isMute
  }
}