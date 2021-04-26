function formatTime(timeInSeconds) {
    const result = new Date(timeInSeconds * 1000).toISOString().substr(11, 8);
    return {
        minutes: result.substr(3, 2),
        seconds: result.substr(6, 2),
    };
}
;
const CommonUtils = {
    formatTime
};
export default CommonUtils;
//# sourceMappingURL=CommonUtils.js.map