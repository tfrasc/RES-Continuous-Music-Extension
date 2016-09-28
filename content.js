var threadIndex = 0;
var url;

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

    var css = '#RCMiFrame {top:0;width:350px;height:200px;left:0;position:fixed;z-index:100;}',
    head = document.head || document.getElementsByTagName('head')[0],
    style = document.createElement('style');

    style.type = 'text/css';
    if (style.styleSheet){
      style.styleSheet.cssText = css;
    } else {
      style.appendChild(document.createTextNode(css));
    }

    head.appendChild(style);

    // var div = document.createElement('div');
    // div.id = "RCMiFrameDiv";
    // document.body.appendChild(div);
    //
    // var youtubeApi = document.createElement('script');
    // var soundcloudApi = document.createElement('script');
    // youtubeApi.src = "https://www.youtube.com/iframe_api";
    // soundcloudApi.src = "https://w.soundcloud.com/player/api.js";
    //
    // var firstScriptTag = document.getElementsByTagName('script')[0];
    // firstScriptTag.parentNode.insertBefore(youtubeApi, firstScriptTag);
    // firstScriptTag.parentNode.insertBefore(soundcloudApi, firstScriptTag);
  }

  if (message.action == "load") {
    url = $('.title').eq(threadIndex).children().eq(0).attr('href');

    while( (url === "" || url === null || url === undefined) && threadIndex < $('.title').length){
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

   while( (url === "" || url === null || url === undefined) && threadIndex < $('.title').length){
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

   while( (url === "" || url === null || url === undefined) && threadIndex < $('.title').length){
      threadIndex++;
      url = $('.title').eq(threadIndex).children().eq(0).attr('href');
    }
    threadIndex++;
  }
  else if(message.action == "back") {
    threadIndex-= 2;
    url = $('.title').eq(threadIndex).children().eq(0).attr('href');

    while( (url === "" || url === null || url === undefined) && threadIndex < $('.title').length){
      threadIndex--;
      url = $('.title').eq(threadIndex).children().eq(0).attr('href');
    }
    // window.open(url, '_blank');
    // $('#RCMiFrame').attr('src', url);
    // chrome.extension.sendMessage({action: "update", url: url});
    threadIndex++;
  }

  if(url.indexOf("youtube") >= 0 || url.indexOf("youtu.be") >= 0){
    url = url.replace("watch?v=", "embed/");
    // url = url.replace("attribution_link", "embed/");
    url = url.replace(".be/", "be.com/embed/") + "?autoplay=1";
    url += "&enablejsapi=1";

    if(url.indexOf("https") < 0){
      url = url.replace("http", "https");
    }
      $('#RCMiFrame').attr('src', url);
  }
  else if(url.indexOf("soundcloud") >= 0) {
    var embedUrl;
    $.getJSON("https://soundcloud.com/oembed",
              { url: url,
                auto_play: true,
                format: "json"},
    function(data)
    {
      embedUrl = data.html.substring(data.html.lastIndexOf('src="')+5, data.html.lastIndexOf('"></iframe>')) + "&auto_play=true";
      // $('#RCMiFrame').attr('src', embedUrl + "&auto_play=true");
      $("#RCMiFrame").replaceWith(data.html);
      $('iframe:last').attr('id', 'RCMiFrame');
      // $("#RCMiFrame").css({'top':'0','width':'500px','height':'250px','right':'0','position':'fixed','z-index':'100'});
      var widget = SC.Widget('RCMiFrame');
      widget.bind(SC.Widget.Events.FINISH,
      function finishedPlaying() {
        console.log("HIT");
        chrome.extension.sendMessage({action: "next"});
      });
    })
  }
});
