var threadIndex = 0;
var url;

chrome.extension.onMessage.addListener(function(message, sender) {
  //create main iframe player
  if($('#RCMiFrame').length == 0){
    var iframe = document.createElement('iframe');
    iframe.style.position = "fixed";
    iframe.style.top = "0";
    iframe.style.zIndex = "100";
    iframe.style.float = "right";
    iframe.id = "RCMiFrame";
    iframe.class = "youtube-player";
    iframe.style.right = "0";
    iframe.frameborder= "0";
    document.body.appendChild(iframe);
  }
  if (message.action == "load") {
    url = $('.title').eq(threadIndex).children().eq(0).attr('href');

    while(url === "" || url === null || url === undefined || url.indexOf('reddit') >= 0){
      threadIndex++;
      url = $('.title').eq(threadIndex).children().eq(0).attr('href');
    }
    // window.open(url, '_blank');
    // $('#RCMiFrame').attr('src', url);
    // chrome.extension.sendMessage({action: "new", url: url});
    threadIndex++;
  }
  else if(message.action == "next") {
    url = $('.title').eq(threadIndex).children().eq(0).attr('href');

   while(url === "" || url === null || url === undefined){
      threadIndex++;
      url = $('.title').eq(threadIndex).children().eq(0).attr('href');
    }
    // window.open(url, '_blank');
    // $('#RCMiFrame').attr('src', url);
    // chrome.extension.sendMessage({action: "update", url: url});
    threadIndex++;
  }
  else if(message.action == "update") {
    url = $('.title').eq(threadIndex).children().eq(0).attr('href');

   while(url === "" || url === null || url === undefined){
      threadIndex++;
      url = $('.title').eq(threadIndex).children().eq(0).attr('href');
    }
    threadIndex++;
  }
  else if(message.action == "back") {
    threadIndex-= 2;
    url = $('.title').eq(threadIndex).children().eq(0).attr('href');

    while(url === "" || url === null || url === undefined){
      threadIndex--;
      url = $('.title').eq(threadIndex).children().eq(0).attr('href');
    }
    // window.open(url, '_blank');
    // $('#RCMiFrame').attr('src', url);
    // chrome.extension.sendMessage({action: "update", url: url});
    threadIndex++;
  }
  if(url.indexOf("youtube") >= 0 || url.indexOf("youtu.be") >= 0){
    url = url.replace("watch?v=", "embed/") + "?autoplay=1";
  }
  $('#RCMiFrame').attr('src', url);
});
