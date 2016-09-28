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

    // var div = document.createElement('div');
    // div.id = "RCMiFrameDiv";
    // document.body.appendChild(div);

    var youtubeApi = document.createElement('script');
    var soundcloudApi = document.createElement('script');
    youtubeApi.src = "https://www.youtube.com/iframe_api";
    soundcloudApi.src = "https://w.soundcloud.com/player/api.js";

    var firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(youtubeApi, firstScriptTag);
    firstScriptTag.parentNode.insertBefore(soundcloudApi, firstScriptTag);
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

  console.log("URL");
  console.log(url);
  if(url.indexOf("youtube") >= 0 || url.indexOf("youtu.be") >= 0){
    console.log("YOUTUBE");
    url = url.replace("watch?v=", "embed/");
    // url = url.replace("attribution_link", "embed/");
    url = url.replace(".be/", "be.com/embed/") + "?autoplay=1";
    url += "&enablejsapi=1";
    console.log("URL");
    console.log(url);

    if(url.indexOf("https") < 0){
      console.log("HIT");
      url = url.replace("http", "https");
    }
      // // 2. This code loads the IFrame Player API code asynchronously.
      // // var tag = document.createElement('script');
      // //
      // // tag.src = "https://www.youtube.com/iframe_api";
      // // var firstScriptTag = document.getElementsByTagName('script')[0];
      // // firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
      //
      // // 3. This function creates an <iframe> (and YouTube player)
      // //    after the API code downloads.
      // $('#RCMiFrame').attr('src', url);
      // var player = $('#RCMiFrame').find('#player .full-frame');
      // // function onYouTubeIframeAPIReady() {
      // //   player = new YT.Player('RCMiFrameDiv', {
      // //     height: '390',
      // //     width: '640',
      // //     videoId: 'M7lc1UVf-VE',
      // //     events: {
      // //       'onReady': onPlayerReady,
      // //       'onStateChange': onPlayerStateChange
      // //     }
      // //   });
      // // }
      // // console.log(  $('#RCMiFrame').find('#player'));
      //
      // // 4. The API will call this function when the video player is ready.
      // function onPlayerReady(event) {
      //   event.target.playVideo();
      // }
      //
      // // 5. The API calls this function when the player's state changes.
      // //    The function indicates that when playing a video (state=1),
      // //    the player should play for six seconds and then stop.
      // var done = false;
      // function onPlayerStateChange(event) {
      //   if (event.data == YT.PlayerState.PLAYING && !done) {
      //     setTimeout(stopVideo, 600);
      //     done = true;
      //     console.log("YEET");
      //   }
      // }
      // function stopVideo() {
      //   player.stopVideo();
      // }
      $('#RCMiFrame').attr('src', url);
  }
  else if(url.indexOf("soundcloud") >= 0) {
    var embedUrl;
    console.log("SOUNDCLOUD");
    $.getJSON("https://soundcloud.com/oembed",
              {url: url, format: "json"},
    function(data)
    {
      embedUrl = data.html.substring(data.html.lastIndexOf('src="')+5, data.html.lastIndexOf('"></iframe>')) + "&auto_play=true";
      $('#RCMiFrame').attr('src', embedUrl + "&auto_play=true");
    })
// https%3A//api

    // $('#RCMiFrame').attr('src', "https://w.soundcloud.com/player/?url=" + url.replace("https://", "https%3A//api."));
    var widget = SC.Widget('RCMiFrame');
    widget.load(embedUrl);
    widget.bind(SC.Widget.Events.FINISH, function () {
        console.log('Ready');
        // widget.load(embedUrl);
        // widget.bind(SC.Widget.Events.PLAY, function () {
        //     widget.getCurrentSound(function (sound) {
        //         console.log(sound.title);
        //     });
        // });
        //    widget.bind(SC.Widget.Events.FINISH, function () {
        //        console.log('Finished');
        // });
    });
    // $('#RCMiFrame').attr('src', url);
    //
    // widget.load(url);
    // SC.oEmbed(url,  {
    //   auto_play: true,
    //   start_track: 0,
    //   iframe: true,
    //   maxwidth: 480,
    //   enable_api: true,
    //   randomize: true
    //   },
    //   document.getElementById("RCMiFrame")
    // );
  }
});
