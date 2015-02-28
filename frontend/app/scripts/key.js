function open(password) {
  'use strict';
  var pass = ['W', 'e', 'l', 'c', 'o', 'm', 'e', '1', 't', 'o', '2', 'F', 'C', 'C'];
  var key = password.split('');

  function sleep(milliseconds) {
    var start = new Date().getTime();
    while(true) {
      if ((new Date().getTime() - start) > milliseconds) {
        break;
      }
    }
  }

  function check(a, b) {
    console.log('a'+a+'b'+b);
    if (a === b) {
      sleep(50);
      return true;
    }
    else {
      return false;
    }

  }

  for (var i = 0; i <= pass.length; i++) {
    if (check(pass[i], key[i]) === false) {
      return false;
    }
  }
  return true;
}
console.log(open('Welcome1to2FC'));

