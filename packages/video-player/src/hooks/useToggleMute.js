import { ref, onMounted } from 'vue';
export default function useToggleMute(videoDom) {
    const isMute = ref(false);
    onMounted(() => {
        isMute.value = false;
    });
    function toggleMute() {
        const video = videoDom.value;
        video.muted = !video.muted;
        isMute.value = video.muted;
        // TODO  大小处理
    }
    return {
        toggleMute,
        isMute
    };
}
//# sourceMappingURL=useToggleMute.js.map