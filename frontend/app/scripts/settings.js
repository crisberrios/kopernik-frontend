/**
 * Created by cristian on 25/02/15.
 */
var kpn = {
  status: 'offline',
  tab: false,
  nameSpace: 'Kopernik',
  agentMatch: function(val) {
    'use strict';
    return /[a-zA-Z]{2}.?[\d]{4,5}$/.test(val);
  }
};

//Configurations
kpn.apikey = 'test';
kpn.pingServer = 'http://kopernik.herokuapp.com/ping';
kpn.dataServer = 'http://kopernik.herokuapp.com/data';
