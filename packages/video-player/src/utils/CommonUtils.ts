export function formatTime(timeInSeconds:number) {
  if(typeof timeInSeconds=="undefined") return
  const result = new Date(timeInSeconds * 1000).toISOString().substr(11, 8);
  return {
    minutes: result.substr(3, 2),
    seconds: result.substr(6, 2),
  };
}


function isMobile () {
  if ((navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i))) {
    return true // 手机端
  } else {
    return false // alert('PC端')
  }
}
function isWechat() {
  return /MicroMessenger/i.test(window.navigator.userAgent);
}

const CommonUtils = {
  formatTime,
  isMobile,
  isWechat
}

export default CommonUtils