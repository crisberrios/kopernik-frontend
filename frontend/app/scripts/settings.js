/**
 * Created by cristian on 25/02/15.
 */
var kpn = {
  status: 'offline',
  apiKey: '01020304050607090A0B0C0D0E0F',
  pingServer: 'http://kopernik.herokuapp.com/ping',
  dataServer: 'http://kopernik.herokuapp.com/data',
  tab: false,
  nameSpace: 'Kopernik',
  agentMatch: function(val) {
    'use strict';
    return /[a-zA-Z]{2}.?[\d]{4,5}$/.test(val);
  }
};
