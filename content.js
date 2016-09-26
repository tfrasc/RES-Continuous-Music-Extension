var threadIndex = 0;
var url;

chrome.extension.onMessage.addListener(function(message, sender, sendResponse) {
  if (message.action == "load") {
    url = $('.title').eq(threadIndex).children().eq(0).attr('href');

    while(url === "" || url === null || url === undefined || url.indexOf('reddit') >= 0){
      threadIndex++;
      url = $('.title').eq(threadIndex).children().eq(0).attr('href');
    }
    window.open(url, '_blank');
    threadIndex++;
  }
  else if(message.action == "next") {
    url = $('.title').eq(threadIndex).children().eq(0).attr('href');

   while(url === "" || url === null || url === undefined){
      threadIndex++;
      url = $('.title').eq(threadIndex).children().eq(0).attr('href');
    }
    window.open(url, '_blank');
    threadIndex++;
  }
  else if(message.action == "back") {
    threadIndex-= 2;
    url = $('.title').eq(threadIndex).children().eq(0).attr('href');

    while(url === "" || url === null || url === undefined){
      threadIndex--;
      url = $('.title').eq(threadIndex).children().eq(0).attr('href');
    }
    window.open(url, '_blank');
    threadIndex++;
  }
});
