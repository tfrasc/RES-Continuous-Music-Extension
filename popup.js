var background = chrome.extension.getBackgroundPage();

$(document).ready(function() {

  $('#start-btn').click(function() {
    background.load();
  });

  $('#next-btn').click(function() {
    background.next();
  });

  $('#back-btn').click(function() {
    background.back();
  });

});
