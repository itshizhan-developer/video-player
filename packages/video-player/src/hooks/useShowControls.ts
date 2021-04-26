//  HTMLMediaElement.canPlayType() 方法会判断传递的媒体格式参数是否能够被播放。
// https://developer.mozilla.org/zh-CN/docs/Web/API/HTMLMediaElement/canPlayType
import { ref } from "vue";

export default  function useCanPlayType(){
  const controls = ref(true)
  const canPlayType = !!document.createElement('video').canPlayType;
  console.log("--canPlayType--",canPlayType)
  if (canPlayType) {
    controls.value = false
  }
  return controls;
}
