var kpn = {
  status: 'offline',
  pingServer: 'http://localhost:3000/ping',
  dataServer: 'http://localhost:3000/data'
};

kpn.checkOnline = function checkOnline(callback) {
  'use strict';
  var status = 'initial';
  $.get(this.pingServer)
    .success(function(data) {
    callback('online');
    })
  .fail(function(data) {
    callback('offline');
    });
};

kpn.statusHandler = function statusHandler(status) {
  "use strict";
  this.status = status;
  if(status) {
    $(document).trigger(status);
  }
};

kpn.onlineHandler = function onlineHandler() {
  "use strict";
  $('.indicator').css('background','lightgreen');
  chrome.storage.local.get(null,function(items) {
    if(Object.keys(items).length > 0) {
      console.log('sending items: ' + JSON.stringify(items));
      kpn.sendItems(items);
    }
  });
};

kpn.sendItems = function sendItems(items) {
  "use strict";
  var keys = Object.keys(items);
  keys.forEach(function(key) {
    kpn.pushItem(key,items[key]);
  });
};

kpn.pushItem = function pushItem(key,value) {
  "use strict";
  var obj = {};
  obj.id = key;
  obj.data = value;
  $.post(this.dataServer,JSON.stringify(obj))
    .success(function() {
      console.log(key + ' was successfully sent');
      chrome.storage.local.remove(key);
    })
    .fail(function() {
      console.log('Error when sending key:'+key+' value:'+value);
    });
};

setInterval(function() {
  kpn.checkOnline(function(status) {
    kpn.statusHandler(status);
  });
},5000);

$(document).on('online', kpn.onlineHandler);
