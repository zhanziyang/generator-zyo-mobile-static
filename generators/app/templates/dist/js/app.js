//弹出框
function dialog(id,time,url) {
  dialogClose()
  
  $(".mask").show();
  $(id).show();
  $("body").css({"overflow-y": "hidden"});
}

function dialogClose() {
  $(".dialog").hide();
  $(".mask").hide();
  $("body").css({"overflow-y": "auto"});
}
function noClose(){
  if(event.stopPropagation)
     event.stopPropagation();
  else
     event.cancelBubble = true;
}

//跳转
function forward(url) {
  window.location.href = url;
}

//loading
function loading() {
  $("#loading").show();
  $(".mask").show();
}

function stopLoading() {
  $("#loading").hide();
  $(".mask").hide();
}