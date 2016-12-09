var background = chrome.extension.getBackgroundPage();
var first = true;

$(document).ready(function() {

  $('#start-btn').click(function() {
    if(first == false) {
      background.togglePlay();
    }
    else {
      background.load();
      first = false;
    }
  });

  $('#next-btn').click(function() {
    background.next();
  });

  $('#back-btn').click(function() {
    background.back();
  });

});
