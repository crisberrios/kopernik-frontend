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
kpn.apikey = '4p1k3yt3s7';
kpn.pingServer = 'http://localhost:3000/ping';
kpn.dataServer = 'http://localhost:3000/data';
