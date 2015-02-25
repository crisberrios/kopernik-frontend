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

kpn.onlineHandler = function onlineHandler() {
  'use strict';
  var nameSpace = this.nameSpace;
  $('.indicator').css('background','lightgreen');
  chrome.storage.local.get(nameSpace,function(arr) {
    if(arr[nameSpace].length > 0) {
      console.log('sending items: ' + JSON.stringify(arr));
      kpn.sendItems(arr);
    } else {
      console.log('no items to send');
    }
  });
};

kpn.sendItems = function sendItems(arr) {
  'use strict';
  var context = this;
  if(!this.lock) {
    $.post(this.dataServer, JSON.stringify({'data': arr}))
      .success(function () {
        console.log('send success');
        context.clearStorage(); // clear stored objects;
      })
      .fail(function () {
        console.log('Error when sending data');
      });
  }
};

kpn.init = function init(nameSpace) {
  'use strict';
  nameSpace = nameSpace || this.nameSpace;
  this.nameSpace = this.nameSpace || nameSpace;
  var initObj = {};
  initObj[nameSpace] = [];
  initObj.totalAmount = 0;
  initObj.totalForms = 0;
  chrome.storage.local.get(nameSpace,function(obj) {
    if(Object.keys(obj).indexOf(nameSpace) <0) {
      console.log (nameSpace+' not found, initializing');
      chrome.storage.local.set(initObj);
    }
    });
};

kpn.start = function start(interval) {
  'use strict';
  var context = this;
  setInterval(function () {
    context.checkOnline();
  }, interval);
};

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
kpn.start(10000);


var tabOpen = false;

chrome.browserAction.onClicked.addListener(function() {
  var actionUrl = chrome.extension.getURL('main.html');
  if(tabOpen === false) {
    chrome.tabs.create({url: actionUrl, pinned: true}, function() {
      'use strict';
      tabOpen = true;
      chrome.tabs.onRemoved.addListener(function() {
        tabOpen = false;
      });
    });
  }
});
