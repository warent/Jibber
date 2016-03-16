var WSServer = require('ws');
var socketServer = new WSServer("ws://localhost:8080");
socketServer.on('connection', function(ws) {
  console.log("Connected");
  ws.on('message', function(message) {
    ws.send(message);
  });
});
