<template>
	<svg
		:width="size"
		:height="size"
		viewBox="0 0 48 48"
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
	>
		<rect width="48" height="48" fill="white" fill-opacity="0.01" />
		<path
			d="M16 12V36"
			:stroke="strokeColor"
			stroke-width="2"
			stroke-linecap="square"
			stroke-linejoin="round"
		/>
		<path
			d="M32 12V36"
			:stroke="strokeColor"
			stroke-width="2"
			stroke-linecap="square"
			stroke-linejoin="round"
		/>
	</svg>
</template>
<script lang="ts">
import { defineComponent } from '@vue/runtime-core';

const PauseIcon = defineComponent({
	name: 'PauseIcon',
	props: {
		size: {
			type: [Number, String],
			default: 24,
		},
		strokeColor: {
			type: String,
			default: '#ec0808',
		},
	},
});
export default PauseIcon;
</script>
