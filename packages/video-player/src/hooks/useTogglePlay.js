export default function useTogglePlay(videoDom) {
    return function togglePlay() {
        const video = videoDom.value;
        if (video) {
            if (video.paused || video.ended) {
                video.play();
            }
            else {
                video.pause();
            }
        }
    };
}
//# sourceMappingURL=useTogglePlay.js.map