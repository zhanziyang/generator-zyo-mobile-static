
// 跳转
function forward (url) {
  window.location.href = url
}

; (function () {
  // rem base setting
  var getDevicePixelRatio = function () {
    var ratio = 1
    // To account for zoom, change to use deviceXDPI instead of systemXDPI
    if (window.screen.systemXDPI !== undefined && window.screen.logicalXDPI !== undefined && window.screen.systemXDPI > window.screen.logicalXDPI) {
      // Only allow for values > 1
      ratio = window.screen.systemXDPI / window.screen.logicalXDPI
    } else if (window.devicePixelRatio !== undefined) {
      ratio = window.devicePixelRatio
    }
    return ratio
  }
  var windowWidth = document.documentElement.clientWidth
  var dpr = getDevicePixelRatio()
  var scale = 1 / dpr

  if (windowWidth > 768) {
    document.querySelector('.page').classList.add('lg-squeezed')
    windowWidth = 320
  }
  document.documentElement.style.fontSize = windowWidth / 10 * dpr + 'px'
  document.querySelector('meta[name=viewport]').setAttribute('content', 'initial-scale=' + scale + ', maximum-scale=' + scale + ', minimum-scale=' + scale + ', user-scalable=no')

  // fast click
  if (FastClick) {
    FastClick.attach(document.body)
  }
})()
