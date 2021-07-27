<template>
<svg
  class="small-play"
  :width="size"
  :height="size"
  viewBox="0 0 48 48"
  fill="none"
  xmlns="http://www.w3.org/2000/svg">
  <rect width="48" height="48" fill="white" fill-opacity="0.01" />
  <path
    d="M15 24V11.8756L25.5 17.9378L36 24L25.5 30.0622L15 36.1244V24Z"
    fill="none"
    :stroke="strokeColor"
    stroke-width="2"
    stroke-linejoin="miter"/>
</svg>
</template>
<script lang="ts">
import { defineComponent } from "@vue/runtime-core";

const PlayIcon = defineComponent({
  name:'PlayIcon',
  props: {
    size: {
      type: [Number, String],
      default: 24
    },
    strokeColor: {
      type: String,
      default: '#000'
    }
  }
})
export default PlayIcon
</script>