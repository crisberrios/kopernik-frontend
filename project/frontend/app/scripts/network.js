var kpn = {
  status: 'offline',
  pingServer: 'http://localhost:3000/ping',
  dataServer: 'http://localhost:3000/data',
  lock: false
};

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
  this.updateTotal();
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
    context.updateTotal();
  }, interval);
};
kpn.store = function store(obj) {
  'use strict';
  this.init(this.nameSpace);
  this.lock = true; // prevent race condition when sending
  var context = this;
  var nameSpace = this.nameSpace;
  var storageObj = {};
   chrome.storage.local.get(nameSpace,function(arr) {
     console.log('arr:' + JSON.stringify(arr));
     var tmp = arr[nameSpace];
     tmp.push(obj);
     storageObj[nameSpace] = tmp;
       chrome.storage.local.set(storageObj, function() {
         context.addTotal(obj.saleTotal);
         context.lock = false;
    });
  });
};
kpn.clearStorage = function clearStorage() {
  'use strict';
  var obj = {};
  obj[this.nameSpace] = [];
  chrome.storage.local.set(obj,function() {});
};
kpn.addTotal = function addTotal(amount) {
  'use strict';
  var context = this;
  var num = Number.parseInt(amount.replace(/[^\d]/g,''));
  chrome.storage.local.get(['totalAmount','totalForms'],function(data){
    data.totalAmount= +data.totalAmount + num;
    data.totalForms = +data.totalForms + 1;
    chrome.storage.local.set(data,function() {
      context.updateTotal();
      return true;
    });
  });
};
kpn.updateTotal = function updateTotal(){
  'use strict';
  chrome.storage.local.get(['totalAmount','totalForms'],function(data) {
  console.log("data:"+JSON.stringify(data));
    var totalAmount = data.totalAmount || 0;
    var totalForms = data.totalForms || 0;
    $('.feedback-total-amount').text(totalAmount);
  $('.feedback-total-forms').text(totalForms);
  });
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
