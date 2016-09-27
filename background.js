var lastURL;
var tabId;
var found = false;

function load() {
  chrome.tabs.query({}, function(tabs) {
      for (var i = 0; i < tabs.length; ++i) {
        chrome.tabs.sendMessage(tabs[i].id, {action: "load"}), function(response) {
          lastURL = response.url;
          console.log(response);
          return lastURL;
        };
      }
  });
}

function next() {
  chrome.tabs.query({}, function(tabs) {
      for (var i = 0; i < tabs.length; ++i) {
        chrome.tabs.sendMessage(tabs[i].id, {action: "next"}), function(response) {
          lastURL = response.url;
          console.log(response);
          return lastURL;
        };
      }
  });
}

function back() {
  chrome.tabs.query({}, function(tabs) {
      for (var i = 0; i < tabs.length; ++i) {
        chrome.tabs.sendMessage(tabs[i].id, {action: "back"}), function(response) {
          lastURL = response.url;
          console.log(response);
          return lastURL;
        };
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

chrome.extension.onMessage.addListener(function(message, sender, sendResponse) {
  if(message.action === "new"){
    chrome.tabs.create({url: message.url}, function(tab){
      tabId = tab.id;
    });
    lastURL = message.url;
  }
  if(message.action == "update"){
    found = false;
    chrome.tabs.query({}, function(tabs) {
      for (var i = 0; i < tabs.length; i++) {
        if(tabs[i].url === lastURL) {
            chrome.tabs.update(tabs[i].id, {url: message.url});
            tabId = tabs[i].id;
            lastURL = message.url;
            found = true;
        }
      }
      if(!found){
        chrome.tabs.update(tabId, {url: message.url});
        lastURL = message.url;
      }
    })
  }
})
