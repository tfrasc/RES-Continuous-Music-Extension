var background = chrome.extension.getBackgroundPage();
var x;

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

  // $('#test-btn').click(function() {
  //   console.log(background.test());
  // });

});
