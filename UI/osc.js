var osc = require('node-osc');

// SET OSC SENDER
var client = new osc.Client('192.168.8.100', 3334);
    client.send('f/tempo/raw', 11, function () {
        client.kill();
    });

// SET OSC SERVER
var oscServer = new osc.Server(3333, '127.0.0.1');
oscServer.on("message", function (msg, rinfo) {
    //if(msg[2][0] == '/tempo') {
        console.log(msg[2][0]);      
    //}

});
