/**
 * Created by cristian on 24/02/15.
 */

//Clears input form by triggering a reset;
kpn.clearForm = function clearForm() {
  'use strict';
  $('form').trigger('reset');
};

//Stores a form object into chrome local storage.
kpn.store = function store(obj) {
  'use strict';
  var context = this;
  var nameSpace = this.nameSpace;
  var storageObj = {};
  chrome.storage.local.get(nameSpace,function(arr) {
    console.log(JSON.stringify(arr,null,'\t'));
    var tmp = arr[nameSpace];
    tmp.push(obj);
    storageObj[nameSpace] = tmp;
    chrome.storage.local.set(storageObj, function() {
      context.addTotal(obj.saleTotal);
      context.clearForm();
    });
  });
};

//Adds total amount submitted to local storage and reflects it on user interface
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

//updates user interface with total amount sent.
kpn.updateTotal = function updateTotal(){
  'use strict';
  chrome.storage.local.get(['totalAmount','totalForms'],function(data) {
    console.log('data:'+JSON.stringify(data));
    var totalAmount = data.totalAmount || 0;
    var totalForms = data.totalForms || 0;
    $('.feedback-total-amount').text('Rp. ' + totalAmount.toLocaleString('in'));
    $('.feedback-total-forms').text(totalForms);
  });
};
