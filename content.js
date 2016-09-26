var i = 0;
var url;

chrome.extension.onMessage.addListener(function(message, sender, sendResponse) {
   if (message.action == "load") {
     url = $('.title').eq(i).children().eq(0).attr('href');

     while(url === "" || url === null || url === undefined){
       i++;
       url = $('.title').eq(i).children().eq(0).attr('href');
     }
     window.open(url, '_blank');
     i++;
   }
   else if(message.action == "next") {
     url = $('.title').eq(i).children().eq(0).attr('href');

     while(url === "" || url === null || url === undefined){
       i++;
       url = $('.title').eq(i).children().eq(0).attr('href');
     }
     window.open(url, '_blank');
     i++;
   }
   else if(message.action == "back") {
     i-= 2;
     url = $('.title').eq(i).children().eq(0).attr('href');

     while(url === "" || url === null || url === undefined){
       i--;
       url = $('.title').eq(i).children().eq(0).attr('href');
     }
     window.open(url, '_blank');
     i++;
   }
});
