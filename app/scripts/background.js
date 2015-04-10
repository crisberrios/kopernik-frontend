//checks online status by pinging the server defined in settings
kpn.checkOnline = function checkOnline() {
  'use strict';
  $.get(this.pingServer)
    .success(function() {
    $(document).trigger('online');
    })
  .fail(function() {
      $(document).trigger('offline');
    });
};

//handles the online event by sending items and updating UI
kpn.onlineHandler = function onlineHandler() {
  'use strict';
  var nameSpace = this.nameSpace;
  chrome.storage.local.get(nameSpace,function(obj) {
    if(obj[nameSpace].length > 0) {
      console.log('sending items: ' + JSON.stringify(obj[nameSpace]));
      kpn.sendItems(obj[nameSpace]);
    } else {
      console.log('no items to send');
    }
  });
};

//send items, passed as an array of objects.
kpn.sendItems = function sendItems(arr) {
  'use strict';
  var context = this;
  if (!this.lock) {
    arr.forEach(function(obj) {
    $.post(context.dataServer, obj)
      .success(function () {
        console.log('Send success!');
        context.clearStorage(); // clear stored objects;
      })
      .fail(function () {
        console.log('Error while sending data');
      });
    });
  }
};
//inits storage on first install or storage clear.
kpn.init = function init(nameSpace) {
  'use strict';
  nameSpace = nameSpace || this.nameSpace;
  this.nameSpace = this.nameSpace || nameSpace;
  var initObj = {};
  initObj[nameSpace] = [];
  initObj.totalAmount = 0;
  initObj.totalForms = 0;
  chrome.storage.local.get(nameSpace,function(obj) {
    if (Object.keys(obj).indexOf(nameSpace) <0) {
      console.log (nameSpace+' not found, initializing');
      chrome.storage.local.set(initObj);
    }
    });
};

//starts checking for online status
kpn.start = function start(interval) {
  'use strict';
  var context = this;
  setInterval(function () {
    context.checkOnline();
  }, interval);
};

//clears storage
kpn.clearStorage = function clearStorage() {
  'use strict';
  var obj = {};
  obj[this.nameSpace] = [];
  chrome.storage.local.set(obj,function() {});
};

//handler for online status
$(document).on('online',function() {
  'use strict';
  kpn.onlineHandler();
});

//let's init the storage
kpn.init('Kopernik');
//let's start checking for online status
kpn.start(15000);

var tabOpen = false;

//Extension button behaviour
chrome.browserAction.onClicked.addListener(function() {
  'use strict';
  var actionUrl = chrome.extension.getURL('main.html');
  if(tabOpen === false) {
    chrome.tabs.create({url: actionUrl, pinned: false}, function() {
      tabOpen = true;
      chrome.tabs.onRemoved.addListener(function() {
        tabOpen = false;
      });
    });
  }
});
