function load() {
  chrome.tabs.query({}, function(tabs) {
      var message = {action: "load"};
      for (var i=0; i<tabs.length; ++i) {
          chrome.tabs.sendMessage(tabs[i].id, message);
      }
  });
}

function next() {
  chrome.tabs.query({}, function(tabs) {
      var message = {action: "next"};
      for (var i=0; i<tabs.length; ++i) {
          chrome.tabs.sendMessage(tabs[i].id, message);
      }
  });
}

function back() {
  chrome.tabs.query({}, function(tabs) {
      var message = {action: "back"};
      for (var i=0; i<tabs.length; ++i) {
          chrome.tabs.sendMessage(tabs[i].id, message);
      }
  });
}
