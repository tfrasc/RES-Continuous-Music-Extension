//load first music player/video
function load() {
  chrome.tabs.query({}, function(tabs) {
      for (var i = 0; i < tabs.length; ++i) {
        chrome.tabs.sendMessage(tabs[i].id, {action: "load"});
      }
  });
}

//toggle playing and pausing music/video
function togglePlay() {
  chrome.tabs.query({}, function(tabs) {
      for (var i = 0; i < tabs.length; ++i) {
        chrome.tabs.sendMessage(tabs[i].id, {action: "togglePlay"});
      }
  });
}

//load next music player/video
function next() {
  chrome.tabs.query({}, function(tabs) {
      for (var i = 0; i < tabs.length; ++i) {
        chrome.tabs.sendMessage(tabs[i].id, {action: "next"});
      }
  });
}

//load previous music player/video
function back() {
  chrome.tabs.query({}, function(tabs) {
      for (var i = 0; i < tabs.length; ++i) {
        chrome.tabs.sendMessage(tabs[i].id, {action: "back"});
      }
  });
}

//handle message passing from content to background (handled music/video has ended event)
chrome.extension.onMessage.addListener(function(message, sender, sendResponse) {

  //handle message received to load next music player/video
  if(message.action === "next"){
    chrome.tabs.query({}, function(tabs) {
      next();
    });
  }
})
