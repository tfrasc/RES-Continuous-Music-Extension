var lastURL;
var lastTabId;
var foundTab = false;

//load first music player/video
function load() {
  chrome.tabs.query({}, function(tabs) {
      for (var i = 0; i < tabs.length; ++i) {
        chrome.tabs.sendMessage(tabs[i].id, {action: "load"});
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

// chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
//   if(changeInfo.status === "complete"){
//     chrome.tabs.query({}, function(tabs) {
//       for (var i = 0; i < tabs.length; i++) {
//         if(tabs[i].url.indexOf("youtube") >= 0 && tabs[i].status == "complete") {
//           // chrome.tabs.sendMessage(tabs[i].id, {action: "update"}), function(response) {
//             // chrome.tabs.update(tabs[i].id, {url: "https://www.google.com"});
//           // };
//         }
//       }
//     })
//   }
// });

// function test() {
//   chrome.tabs.query({}, function(tabs) {
//     return tabs;
//   })
// }

//handle message passing from content to background
chrome.extension.onMessage.addListener(function(message, sender, sendResponse) {
  // var url = message.url;
  //
  // if(url.indexOf("youtube") >= 0 || url.indexOf("youtu.be") >= 0){
  //   url += "?rel=0&autoplay=1";
  // }
  //
  // if(message.action === "new"){
  //   chrome.tabs.create({url: url}, function(tab){
  //     lastTabId = tab.id;
  //   });
  //   lastURL = url;
  // }

  //handle message sent to load next music player/video
  if(message.action === "next"){
    chrome.tabs.query({}, function(tabs) {
      next();
    });
  }
  // else if(message.action === "update"){
  //   foundTab = false;
  //   chrome.tabs.query({}, function(tabs) {
  //     for (var i = 0; i < tabs.length; i++) {
  //       if(tabs[i].url === lastURL) {
  //           chrome.tabs.update(tabs[i].id, {url: url});
  //           lastTabId = tabs[i].id;
  //           lastURL = url;
  //           foundTab = true;
  //       }
  //     }
  //     if(!foundTab){
  //       chrome.tabs.update(lastTabId, {url: url});
  //       lastURL = url;
  //     }
  //   })
  // }
})
