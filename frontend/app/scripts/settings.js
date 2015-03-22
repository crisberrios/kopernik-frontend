/**
 * Created by cristian on 25/02/15.
 */
var kpn = {
  status: 'offline',
  apikey: 'test',
  pingServer: 'http://kopernik.herokuapp.com/ping',
  dataServer: 'http://kopernik.herokuapp.com/data',
  tab: false,
  nameSpace: 'Kopernik',
  agentMatch: function(val) {
    'use strict';
    return /[a-zA-Z]{2}.?[\d]{4,5}$/.test(val);
  }
};
