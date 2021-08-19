<template>
  <div class="itshizhan-video-container" ref="videoContainerDom" @click="animatePlayback">
    <transition name="fade" v-show="isShowAnimatePlayIcon">
      <div class="playback-animation" @click.stop="togglePlayNew">
        <play-icon stroke-color="#fff" size="30" />
      </div>
    </transition>
		<transition name="fade" v-show="isShowAnimatePauseIcon">
      <div class="playback-animation" @click.stop="togglePlayNew">
        <pause-icon stroke-color="#fff" size="30" />
      </div>
    </transition>
    <video
      ref="videoDom"
      :controls="controls"
      class="video"
      preload="metadata"
      :poster="poster"
      :src="src"
    >
      <!-- <source :src="src" type="video/mp4" /> -->
    </video>

    <div class="video-controls" :class="{ hidden: controls,'hidden-controll': hiddenControlls}" ref="videoControls">
      <div class="video-progress">
        <progress
          class="progress-bar"
          :value="progressValue"
          min="0"
          :max="progressMax"
        ></progress>
        <input
          class="seek"
          @mousemove="updateSeekTooltip"
          v-model="progressValue"
          min="0"
          :max="progressMax"
          type="range"
          step="1"
        />
        <div ref="seekTooltipDom" class="seek-tooltip">{{ seekTooltip }}</div>
      </div>

      <div class="bottom-controls">
        <div class="left-controls">
          <button data-title="Ctrl+P" @click="togglePlay">
            <play-icon v-if="!isPlaying" stroke-color="#fff" size="30" />
            <pause-icon v-else stroke-color="#fff" size="30" />
          </button>

          <div class="volume-controls">
            <button
              data-title="Mute (m)"
              class="volume-button"
              @click="toggleMute"
            >
              <volume-icon v-if="!isMute" stroke-color="#fff" />
              <mute-icon v-else stroke-color="#fff" />
            </button>
            <input
              v-if="false"
              class="volume"
              value="1"
              data-mute="0.5"
              type="range"
              max="1"
              min="0"
              step="0.01"
            />
          </div>

          <div class="time">
            <time :datatime="elapsedTime">{{ elapsedTime }}</time>
            <span>/</span>
            <time :datatime="durationTime">{{ durationTime }}</time>
          </div>
        </div>

        <div class="right-controls">
          <button data-title="PIP (p)" class="pip-button">
            <!-- TODO 画中画 -->
          </button>
          <button
            data-title="Full screen (f)"
            class="fullscreen-button"
            @click="toggleFullScreen"
          >
            <full-screen-icon stroke-color="#fff" />
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref, onMounted, watch } from "vue";
import useShowControls from "../hooks/useShowControls";
import useTogglePlay from "../hooks/useTogglePlay";
import PlayIcon from "./PlayIcon.vue";
import PauseIcon from "./PauseIcon.vue";
import VolumeIcon from "./VolumeIcon.vue";
import MuteIcon from "./MuteIcon.vue";
import FullScreenIcon from "./FullScreenIcon.vue";
import CommonUtils from "../utils/CommonUtils";
import useToggleMute from "../hooks/useToggleMute";

export default defineComponent({
  name: "VideoPlayer",
  components: {
    PlayIcon,
    PauseIcon,
    VolumeIcon,
    MuteIcon,
    FullScreenIcon,
  },
  props: {
    src: {
      type: String,
      required: true,
    },
    poster: {
      type: String,
      required: true,
    },
  },
  setup() {
    const videoDom = ref<HTMLVideoElement>();
    const videoControls = ref<HTMLElement>()
    const isPlaying = ref(false);
    const controls = useShowControls();
    const togglePlay = useTogglePlay(videoDom);
    const durationTime = ref("00:00");
    const elapsedTime = ref("00:00");
    const progressMax = ref();
    const progressValue = ref(0);
    const seekTooltip = ref();
    const seekTooltipDom = ref();
		const hiddenControlls = ref(false);
    const videoContainerDom = ref<HTMLElement>();
    const { isMute, toggleMute } = useToggleMute(videoDom);
		const isShowAnimatePlayIcon = ref(true);
		const isShowAnimatePauseIcon = ref(false);

    function initVideo() {
      const video = videoDom.value as HTMLVideoElement;
      const videoDuration = Math.round(video.duration);
      progressMax.value = videoDuration;
      const time = CommonUtils.formatTime(videoDuration);
      durationTime.value = `${time.minutes}:${time.seconds}`;
    }
    function updateTimeElapsed() {
      const video = videoDom.value as HTMLVideoElement;
      const videoCurrentTime = Math.round(video.currentTime);
      const time = CommonUtils.formatTime(videoCurrentTime);
      elapsedTime.value = `${time.minutes}:${time.seconds}`;
      progressValue.value = Math.floor(video.currentTime);

			
    }

    function updateSeekTooltip(event: MouseEvent) {
      const video = videoDom.value as HTMLVideoElement;
      const skipTo = Math.round(
        (event.offsetX / (event?.target as HTMLElement).clientWidth) *
          parseInt(progressMax.value, 10)
      );
      const t = CommonUtils.formatTime(skipTo);
      seekTooltip.value = `${t.minutes}:${t.seconds}`;
      const rect = video.getBoundingClientRect();
      seekTooltipDom.value.style.left = `${event.pageX - rect.left}px`;
    }

    function animatePlayback() {
			const video = videoDom.value as HTMLVideoElement;
      console.log("--animatePlayback----");
			isShowAnimatePlayIcon.value = false;
			isShowAnimatePauseIcon.value = true;
			//显示controll
			hiddenControlls.value = false;
			setTimeout(()=>{
				if(video.played){
					//隐藏播放按钮
					isShowAnimatePauseIcon.value = false;
					//隐藏controll
					hiddenControlls.value = true;
				}
			},3000)
    }

    //PC鼠标移动上去，状态展示
    function animatePlaybackForPc() {
			const video = videoDom.value as HTMLVideoElement;

      console.log("--animatePlaybackForPc----");
      //显示controll
      hiddenControlls.value = false;
      if(video.paused ||video.ended){
        console.log("======暂停=======");
        //隐藏暂停按钮
        isShowAnimatePauseIcon.value = false
        //显示播放按钮
        isShowAnimatePlayIcon.value = true;
      }else{
        console.log("======非暂停=======")
        //隐藏播放按钮
        isShowAnimatePlayIcon.value = false;
        //显示暂停按钮
        isShowAnimatePauseIcon.value = true;
        
      }
    }


    function toggleFullScreen() {
      console.log("----toggleFullScreen-----");
      // typescript中 webkitFullscreenElement 属性不存在，所有强制any
      const document: any = window.document;
      const videoContainer = videoContainerDom.value as any;
      if (document.fullscreenElement) {
        document.exitFullscreen();
      }
      //  else if (document.webkitFullscreenElement) {
      //   // Need this to support Safari
      //   document.webkitExitFullscreen();
      // } else if (videoContainer.webkitRequestFullscreen) {
      //   // Need this to support Safari
      //   videoContainer.webkitRequestFullscreen();
      // }
      else {
        videoContainer.requestFullscreen();
      }
    }

		function togglePlayNew(){
			console.log("togglePlayNew")
			const video = videoDom.value as HTMLVideoElement;
			if (video) {
					if (video.paused || video.ended) {
							video.play();
							isShowAnimatePlayIcon.value = false;
							isShowAnimatePauseIcon.value = false;
					}
					else {
							video.pause();
							isShowAnimatePlayIcon.value = true;
					}
			}
		}

    function doNothing(){
      console.log("--------doNothing---------")
    }

    // input事件 在vue 中，更推荐监听 progressValue的值
    // function skipAhead(){
    //   const video = videoDom.value as HTMLVideoElement
    //   const skipTo = progressValue.value;
    //   console.log(skipTo)
    //   video.currentTime = skipTo;
    // }
    watch(progressValue, () => {
      (videoDom.value as HTMLVideoElement).currentTime = progressValue.value;
    });

    onMounted(() => {
      const video = videoDom.value;
      video?.addEventListener("play", () => {
        console.log("playing");
        isPlaying.value = true;
				//隐藏
				setTimeout(()=>{
					hiddenControlls.value = true;
				},1000)
      });
      video?.addEventListener("pause", () => {
        console.log("pause");
        isPlaying.value = false;
				//视频暂停，显示
				setTimeout(()=>{
					hiddenControlls.value = false;
				},500)
				
      });
      //初始化视频视频
      video?.addEventListener("loadedmetadata", initVideo);
      //更新视频播放事件
      video?.addEventListener("timeupdate", updateTimeElapsed);

      //监听PC端鼠标事件
      if(CommonUtils.isMobile()||CommonUtils.isMobile()){
        console.log("------微信或移动端-------")
      }else{
        console.log("------PC 端-------")
        const videoContainer = videoContainerDom.value as any;
        let  ismouseenter = false // 初态未移入鼠标
        //事件务必不能绑定在video上，否则会无限闪烁
        videoContainer?.addEventListener("mouseenter", () => {
          if(ismouseenter) {
            //鼠标已移入，不再重复激活
            return
          }else{
            console.log("mouseenter")
            setTimeout(()=>{
              animatePlaybackForPc()
              ismouseenter = true; // 状态设为移入
            },60)
            
          }

        });
        videoContainer?.addEventListener("mouseleave", () => {
          if(ismouseenter==false){
            //鼠标未移入，不存在离开
            return
          }else{
            console.log("mouseleave")
            setTimeout(()=>{
              //隐藏播放按钮
              isShowAnimatePauseIcon.value = false;
              //隐藏controll
              hiddenControlls.value = true;
              ismouseenter = false
            },60)
          }
        });

  
      }
			
    });
    return {
      controls,
      videoDom,
      togglePlay,
      isPlaying,
      elapsedTime,
      durationTime,
      progressMax,
      progressValue,
      updateSeekTooltip,
      seekTooltip,
      seekTooltipDom,
      animatePlayback,
      isMute,
      toggleMute,
      toggleFullScreen,
      videoContainerDom,
			hiddenControlls,
			isShowAnimatePlayIcon,
			isShowAnimatePauseIcon,
			togglePlayNew,
    };
  },
});
</script>
<style lang="scss">
/* ==========================================================================
#Custom HTML5 Video Player
//https://freshman.tech/custom-html5-video/
========================================================================== */
:root {
  --youtube-red: #fe0900;
}

*,
*::before,
*::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

.itshizhan-video-container {
  width: 100%;
  border-radius: 4px;
  margin: 0 auto;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  video {
    width: 100%;
    height: 100%;
    border-radius: 4px;
		cursor: pointer;
  }

  .video-controls {
    height: 50px;
    right: 0;
    left: 0;
    padding: 10px 10px 0 10px;
    position: absolute;
    bottom: 0;
    transition: all 0.2s ease;
    background-image: linear-gradient(
      to bottom,
      rgba(0, 0, 0, 0.3),
      rgba(0, 0, 0, 0.5)
    );
    // 设置后无法播放，不相应鼠标事件
    // pointer-events: none;
  }

  .video-controls.hide {
    opacity: 0;
    pointer-events: none;
  }

  .video-progress {
    position: relative;
    height: 3.4px;
    margin-bottom: 8px;
    padding: 0 12px;
    overflow: hidden;
    display: flex;
  }

  progress {
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    border-radius: 2px;
    width: 100%;
    height: 3.4px;
    pointer-events: none;
    position: absolute;
    top: 0;
  }

  progress::-webkit-progress-bar {
    background-color: #474545;
    border-radius: 2px;
  }

  progress::-webkit-progress-value {
    background: var(--youtube-red);
    border-radius: 2px;
  }

  progress::-moz-progress-bar {
    border: 1px solid var(--youtube-red);
    background: var(--youtube-red);
  }

  .seek {
    position: absolute;
    top: 0;
    width: 100%;
    cursor: pointer;
    margin: 0;
  }

  .seek:hover + .seek-tooltip {
    display: block;
  }

  .seek-tooltip {
    display: none;
    position: absolute;
    top: -50px;
    margin-left: -20px;
    font-size: 12px;
    padding: 3px;
    content: attr(data-title);
    font-weight: bold;
    color: #fff;
    background-color: rgba(0, 0, 0, 0.6);
  }

  .bottom-controls {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 25px;
  }

  .left-controls {
    display: flex;
    align-items: center;
    color: #fff;
    height: 25px;
  }
  .right-controls {
    height: 25px;
  }

  .volume-controls {
    display: flex;
    align-items: center;
    margin-right: 10px;
  }

  .volume-controls input {
    width: 100px;
    opacity: 1;
    transition: all 0.4s ease;
  }

  .volume-controls:hover input,
  .volume-controls input:focus {
    width: 100px;
    opacity: 1;
  }

  button {
    cursor: pointer;
    position: relative;
    margin-right: 7px;
    font-size: 12px;
    padding: 3px;
    border: none;
    outline: none;
    background-color: transparent;
  }

  button * {
    pointer-events: none;
  }

  button::before {
    content: attr(data-title);
    position: absolute;
    display: none;
    right: 0;
    top: -50px;
    background-color: rgba(0, 0, 0, 0.6);
    color: #fff;
    font-weight: bold;
    padding: 4px 6px;
    word-break: keep-all;
    white-space: pre;
  }

  button:hover::before {
    display: inline-block;
  }

  .fullscreen-button {
    margin-right: 0;
    padding: 0 3px;
  }

  .pip-button svg {
    width: 26px;
    height: 26px;
  }

  .playback-animation {
    // pointer-events: none;
    position: absolute;
    top: 50%;
    left: 50%;
    margin-left: -40px;
    margin-top: -40px;
    width: 80px;
    height: 80px;
    border-radius: 80px;
    background-color: rgba(0, 0, 0, 0.6);
    display: flex;
    justify-content: center;
    align-items: center;
    opacity: 0.6;
		z-index: 999;
  }

  input[type="range"] {
    -webkit-appearance: none;
    -moz-appearance: none;
    height: 4.4px;
    background: transparent;
    cursor: pointer;
  }

  input[type="range"]:focus {
    outline: none;
  }

  input[type="range"]::-webkit-slider-runnable-track {
    width: 100%;
    cursor: pointer;
    border-radius: 1.3px;
    -webkit-appearance: none;
    transition: all 0.4s ease;
  }

  /* 原点的大小 */
  input[type="range"]::-webkit-slider-thumb {
    height: 12px;
    width: 12px;
    border-radius: 12px;
    background: var(--youtube-red);
    cursor: pointer;
    -webkit-appearance: none;
    margin-left: -1px;
  }

  input[type="range"]:focus::-webkit-slider-runnable-track {
    background: transparent;
  }

  input[type="range"].volume {
    height: 4.4px;
    background-color: #fff;
  }

  input[type="range"].volume::-webkit-slider-runnable-track {
    background-color: transparent;
  }

  input[type="range"].volume::-webkit-slider-thumb {
    margin-left: 0;
    height: 12px;
    width: 12px;
    background: #fff;
  }

  input[type="range"]::-moz-range-track {
    width: 100%;
    height: 4.4px;
    cursor: pointer;
    border: 1px solid transparent;
    background: transparent;
    border-radius: 1.3px;
  }

  input[type="range"]::-moz-range-thumb {
    height: 12px;
    width: 12px;
    border-radius: 12px;
    border: 1px solid var(--youtube-red);
    background: var(--youtube-red);
    cursor: pointer;
    margin-top: 5px;
  }

  input[type="range"]:focus::-moz-range-track {
    outline: none;
  }

  input[type="range"].volume::-moz-range-thumb {
    border: 1px solid #fff;
    background: #fff;
  }

  .hidden {
    display: none;
  }
	.hidden-controll {
		display: none!important;
	}

  .fade-enter-active,
  .fade-leave-active {
    transition: opacity 1.5s ease;
  }

  .fade-enter-from,
  .fade-leave-to {
    opacity: 0;
  }
}

// 视频移动端
@media screen and (max-width: 415px) {
  .itshizhan-video-container {
    .video-controls {
      height: 42px;
      padding: 6px 10px 0 10px;
    }
    .video-progress {
      margin-bottom: 6px;
    }
    .bottom-controls {
      height: 24px;
      font-size: 14px;
      svg.small-play,
      svg.small-pause {
        width: 26px;
        height: 26px;
      }
      svg.small-volume,
      svg.small-mute {
        width: 20px;
        height: 20px;
      }
      svg.small-fullscreen {
        width: 20px;
        height: 20px;
      }
    }
    .playback-animation {
      top: 40%;
    }
		.hidden-controll {
			display: none!important;
		}
  }
}
</style>
