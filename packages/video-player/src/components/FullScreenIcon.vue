<template>
  <svg
		:width="width"
		:height="width"
		viewBox="0 0 48 48"
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
	>
		<rect width="48" height="48" fill="white" fill-opacity="0.01" />
		<path
			d="M16 40H6C4.89543 40 4 39.1046 4 38V10C4 8.89543 4.89543 8 6 8H42C43.1046 8 44 8.89543 44 10V16"
			:stroke="strokeColor"
			stroke-width="2"
			stroke-linecap="square"
			stroke-linejoin="round"
		/>
		<rect
			x="24"
			y="24"
			width="20"
			height="16"
			rx="2"
			fill="none"
			:stroke="strokeColor"
			stroke-width="2"
			stroke-linejoin="round"
		/>
	</svg>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
const FullScreenIcon = defineComponent({
	name: 'FullScreenIcon',
	props: {
		width: {
			type: [Number, String],
			default: 24,
		},
		height: {
			type: [Number, String],
			default: 24,
		},
		strokeColor: {
			type: String,
			default: '#000',
		},
	},
});
export default FullScreenIcon;
</script>
