var threadIndex = 0;
var url;
var widget;
var toggled = false;
var first = true;

//handle message passing from popup page attached to button
chrome.extension.onMessage.addListener(function(message, sender) {

  //load first music player/video
  if (first == true && message.action == "load" && threadIndex < $('.title').length) {
    first = false;
    load();
    url = $('.title').eq(threadIndex).children().eq(0).attr('href');

    while((url === "" || url === null || url === undefined || url.indexOf("soundcloud") < 0) && threadIndex < $('.title').length){
      threadIndex++;
      url = $('.title').eq(threadIndex).children().eq(0).attr('href');
    }
  }
  //toggle playing and pausing the music player/video
  else if ((message.action == "togglePlay" && threadIndex < $('.title').length) || (first == false && message.action == "load")) {
    //handle soundcloud player
    if(url.indexOf("soundcloud") >= 0) {
      widget.toggle();
      toggled = true;
    }
  }
  //load next music player/video
  else if(message.action == "next" && threadIndex < $('.title').length) {
    toggled = false;
    threadIndex++;
    url = $('.title').eq(threadIndex).children().eq(0).attr('href');

   while((url === "" || url === null || url === undefined || url.indexOf("soundcloud") < 0) && threadIndex < $('.title').length){
      threadIndex++;
      url = $('.title').eq(threadIndex).children().eq(0).attr('href');
    }
  }
  //load previous music player/video
  else if(message.action == "back" && threadIndex < $('.title').length) {
    toggled = false;
    threadIndex--;
    url = $('.title').eq(threadIndex).children().eq(0).attr('href');

    while((url === "" || url === null || url === undefined || url.indexOf("soundcloud") < 0) && threadIndex < $('.title').length){
      threadIndex--;
      url = $('.title').eq(threadIndex).children().eq(0).attr('href');
    }
  }

  //handle soundcloud url
  if(url.indexOf("soundcloud") >= 0 && !toggled) {
    var embedUrl;
    $.getJSON("https://soundcloud.com/oembed",
      { url: url,
        auto_play: true,
        format: "json" },
    function(data)
    {
      $("#RCMiFrame").replaceWith(data.html);
      $('iframe:last').attr('id', 'RCMiFrame');

      widget = SC.Widget('RCMiFrame');
      widget.bind(SC.Widget.Events.FINISH,
      function finishedPlaying() {
        toggled = false;
        chrome.extension.sendMessage({action: "next"});
      });
    })
  }
});
