var threadIndex = 0;
var url;

chrome.extension.onMessage.addListener(function(message, sender) {
  if (message.action == "load") {
    url = $('.title').eq(threadIndex).children().eq(0).attr('href');

    while(url === "" || url === null || url === undefined || url.indexOf('reddit') >= 0){
      threadIndex++;
      url = $('.title').eq(threadIndex).children().eq(0).attr('href');
    }
    // window.open(url, '_blank');
    chrome.extension.sendMessage({action: "new", url: url});
    threadIndex++;
  }
  else if(message.action == "next") {
    url = $('.title').eq(threadIndex).children().eq(0).attr('href');

   while(url === "" || url === null || url === undefined){
      threadIndex++;
      url = $('.title').eq(threadIndex).children().eq(0).attr('href');
    }
    // window.open(url, '_blank');
    chrome.extension.sendMessage({action: "update", url: url});
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
    chrome.extension.sendMessage({action: "update", url: url});
    threadIndex++;
  }
});
