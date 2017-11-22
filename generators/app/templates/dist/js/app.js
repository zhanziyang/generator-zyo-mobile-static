
// 跳转
function forward (url) {
  window.location.href = url
}

<% if (fastClick) { %>
document.addEventListener('DOMContentLoaded', function() {
  FastClick.attach(document.body);
}, false);
<% } %>

<% if (flexPlan == 'rem' && !scaleViewport) { %>
;(function () {
  var set = function () {
    var windowWidth = window.innerWidth
    <% if (limitWidthOnPC) { %>
    if (windowWidth > <%=pcMinWidth %>) {
      document.querySelector('.page').classList.add('lg-squeezed')
      windowWidth = <%=widthOnPC %>
    } else {
      document.querySelector('.page').classList.remove('lg-squeezed')
    }
    <% } %>
    document.documentElement.style.fontSize = windowWidth / 10 + 'px'
  }
  set()
  window.addEventListener('resize', set)
  window.addEventListener('pageshow', set)
})()
<% } else if (flexPlan == 'rem' && scaleViewport) { %>
function getDevicePixelRatio () {
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

function setViewportScale (scale) {
  var viewportMeta = document.querySelector('meta[name=viewport]')
  if (!viewportMeta) {
    viewportMeta = document.createElement('meta')
    viewportMeta.setAttribute('name', 'viewport')
    document.head.appendChild(viewportMeta)
  }
  viewportMeta.setAttribute('content', 'initial-scale=' + scale + ', maximum-scale=' + scale + ', minimum-scale=' + scale + ', user-scalable=no')
}

window.$device = {
  isMobile: /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  ),

  isIOS: /iPhone|iPad|iPod/i.test(
    navigator.userAgent
  ),

  dpr: getDevicePixelRatio()
}

;(function () {
  if (window.$device.isIOS  && window.$device.dpr > 1) {
    setViewportScale(1 / window.$device.dpr)
    document.documentElement.setAttribute('data-dpr', window.$device.dpr)
  }
  var set = function () {
    var windowWidth = window.innerWidth
    var visualWindowWidth = windowWidth
    if (window.$device.isIOS && window.$device.dpr > 1) {
      visualWindowWidth = windowWidth / window.$device.dpr
    }
    <% if (limitWidthOnPC) { %>
    if (visualWindowWidth > <%=pcMinWidth %>) {
      document.querySelector('.page').classList.add('lg-squeezed')
      windowWidth = <%=widthOnPC %>
    } else {
      document.querySelector('.page').classList.remove('lg-squeezed')
    }
    <% } %>
    document.documentElement.style.fontSize = windowWidth / 10 + 'px'
  }
  set()
  window.addEventListener('resize', set)
  window.addEventListener('pageshow', set)
})()
<% } else if (flexPlan == 'autoFlex') { %>
;(function() {
  var viewportMeta = document.querySelector('meta[name=viewport]')
  if (!viewportMeta) {
    viewportMeta = document.createElement('meta')
    viewportMeta.setAttribute('name', 'viewport')
    document.head.appendChild(viewportMeta)
  }
  var set = function () {
    var windowWidth = window.innerWidth
    <% if (limitWidthOnPC) { %>
    if (windowWidth > <%=pcMinWidth %>) {
      viewportMeta.setAttribute('content', 'width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no')
      document.querySelector('.page').classList.add('lg-squeezed')
    } else {
      viewportMeta.setAttribute('content', 'width=' + <%=psWidth %> + ', user-scalable=no')
      document.querySelector('.page').classList.remove('lg-squeezed')
    }
    <% } else { %>
      viewportMeta.setAttribute('content', 'width=' + <%=psWidth %> + ', user-scalable=no')
    <% } %>
  }
  set()
  window.addEventListener('resize', set)
  window.addEventListener('pageshow', set)
})()
<% } else { %>
;(function() {
  var viewportMeta = document.querySelector('meta[name=viewport]')
  if (!viewportMeta) {
    viewportMeta = document.createElement('meta')
    viewportMeta.setAttribute('name', 'viewport')
    document.head.appendChild(viewportMeta)
  }
  viewportMeta.setAttribute('content', 'width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no')
})()
<% }%>