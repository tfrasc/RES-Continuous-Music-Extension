var threadIndex = 0;
var url;
var player;

//handle message passing from popup page attached to button
chrome.extension.onMessage.addListener(function(message, sender) {

  //create main iframe player
  if($('#RCMiFrame').length == 0){
    var iframe = document.createElement('iframe');
    iframe.style.position = "fixed";
    iframe.style.top = "0";
    iframe.style.right = "0";
    iframe.style.zIndex = "100";
    iframe.style.float = "right";
    iframe.id = "RCMiFrame";
    document.body.appendChild(iframe);

    //add iframe css dynamically to page
    var css = '#RCMiFrame {top:0;width:350px;height:200px;left:0;position:fixed;z-index:100;}',
    head = document.head || document.getElementsByTagName('head')[0],
    style = document.createElement('style');
    style.type = 'text/css';
    if (style.styleSheet) {
      style.styleSheet.cssText = css;
    }
    else {
      style.appendChild(document.createTextNode(css));
    }
    head.appendChild(style);
  }

  //load first music player/video
  if (message.action == "load" && threadIndex < $('.title').length) {
    url = $('.title').eq(threadIndex).children().eq(0).attr('href');

    while((url === "" || url === null || url === undefined) && threadIndex < $('.title').length){
      threadIndex++;
      url = $('.title').eq(threadIndex).children().eq(0).attr('href');
    }
  }
  //load next music player/video
  else if(message.action == "next" && threadIndex < $('.title').length) {
    threadIndex++;
    url = $('.title').eq(threadIndex).children().eq(0).attr('href');

   while((url === "" || url === null || url === undefined) && threadIndex < $('.title').length){
      threadIndex++;
      url = $('.title').eq(threadIndex).children().eq(0).attr('href');
    }
  }
  //load previous music player/video
  else if(message.action == "back" && threadIndex < $('.title').length) {
    threadIndex--;
    url = $('.title').eq(threadIndex).children().eq(0).attr('href');

    while((url === "" || url === null || url === undefined) && threadIndex < $('.title').length){
      threadIndex--;
      url = $('.title').eq(threadIndex).children().eq(0).attr('href');
    }
  }

  //handle youtube url
  if(url.indexOf("youtube") >= 0 || url.indexOf("youtu.be") >= 0) {
    $.getJSON("https://youtube.com/oembed",
      { url: url,
        auto_play: true,
        format: "json" },
    function(data) {
      $("#RCMiFrame").replaceWith(data.html.replace("?feature=oembed", "?feature=oembed&autoplay=1&enablejsapi=1"));
      $('iframe:last').attr('id', 'RCMiFrame');
    })
  }
  //handle soundcloud url
  else if(url.indexOf("soundcloud") >= 0) {
    var embedUrl;
    $.getJSON("https://soundcloud.com/oembed",
      { url: url,
        auto_play: true,
        format: "json" },
    function(data)
    {
      $("#RCMiFrame").replaceWith(data.html);
      $('iframe:last').attr('id', 'RCMiFrame');

      var widget = SC.Widget('RCMiFrame');
      widget.bind(SC.Widget.Events.FINISH,
      function finishedPlaying() {
        chrome.extension.sendMessage({action: "next"});
      });
    })
  }
  //handle mixcloud url
  else if(url.indexOf("mixcloud") >= 0) {
    $.getJSON("https://mixcloud.com/oembed",
      { url: url,
        auto_play: true,
        format: "json" },
    function(data)
    {
      console.log(data.html);
      $("#RCMiFrame").replaceWith(data.html);
      $('iframe:last').attr('id', 'RCMiFrame');
    })
  }
  // TODO: handle bandcamp url
  // else if(url.indexOf("bandcamp") >= 0) {
  //   $.getJSON("https://bandcamp.com/oembed",
  //             { url: url,
  //               auto_play: true,
  //               format: "json" },
  //   function(data)
  //   {
  //     console.log(data.html);
  //     $("#RCMiFrame").replaceWith(data.html);
  //     $('iframe:last').attr('id', 'RCMiFrame');
  //   })
  // }
});
