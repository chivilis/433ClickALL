var osc = require('node-osc');

var oscServer = new osc.Server(3333, '127.0.0.1');
oscServer.on("message", function (msg, rinfo) {
      console.log("TUIO message:");
      console.log(msg);
});