// Called when the user clicks on the browser action.
chrome.browserAction.onClicked.addListener(function(callback) {
  var action_url = chrome.extension.getURL("main.html");
  chrome.tabs.create({ url: action_url });
});
chrome.storage.onChanged.addListener(function (changes) {
  chrome.storage.local.get(null, function (storage) {
    $('.storage').text(JSON.stringify(storage));
  })
});

$('.store').click(function(){
  var key = $('.key').val();
  var value = $('.value').val();
  var store = {};
  store[key]=value;
  chrome.storage.local.set(store, function(){});
});


