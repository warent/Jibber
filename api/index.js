/* Require */
var WSServer = require('ws').Server;
var mongoose = require('mongoose');
var models = require('./models/default.js');
var bson = require("bson");
var q = require('q');
var httpRequest = require('request');
var BSON = new bson.BSONPure.BSON();

/* Initialize public variables */
var connections = {};
var connectionsCount = 0;

// Each index is a ws._uid
// Inside of that key is an array of jibber parent ids (pid)
var userRelConnections = {};

// Each index is a jibber parent id
// Inside of that key is an array of key/value pairs, where the key is the ws._uid and the value is the ws object
var relConnections = {};

/* Initialize server */
var socketServer = new WSServer({port: 8080});
console.log("-WebSocket server initialized-");

mongoose.connect('mongodb://localhost/jibber');
console.log("-Connected to MongoDB-");


genericResponse = function (inData, outData) {
  return JSON.stringify({
    'e': inData.e,
    't': inData.t,
    'rel': inData.rel,
    'd': outData
  });
}

getProp = function(obj, id) {
  if (obj.hasOwnProperty(id)) return obj[id];
  else return null;
}

broadcast = function(data, conList) {
  conList = conList || connections;
  for (con in conList) {
    conList[con].ws.send(genericResponse({
      'e': data.event,
      't': data.type,
    }, data.content));
  }
}

// rq (Request) : Asking for additional data
// ud (Update): Update existing data
// ps (Post): Create new data
// ua (User Action): Perform some command related to the websocket
safeEvents = ['rq', 'ud', 'ps', 'ua'];
socketEvent = {};

request = {};
request.types = {};
request.safeTypes = ['more', 'rel.more'];
request.types.more = request.types['rel.more'] = function(data) {
  var findFilter = {};
  data.d = data.d || {};
  findFilter.parent_jibber_id = getProp(data.d, 'pid');
  deferred = q.defer();
  query = models.jibber
      .find(findFilter);
  if (data.d && data.d.i) {
    query.skip(data.d.i);
  }
  query.limit(10)
    .sort({'created_at': 'descending'})
    .exec(function(err, jibbers) {
      if (jibbers.length == 0) jibbers = "none";
        resolveObj = {
          rel: findFilter.parent_jibber_id,
          d: jibbers
        }
        deferred.resolve(resolveObj);
      });
  return deferred.promise;
}

userAction = {};
userAction.types = {};
userAction.safeTypes = ['join', 'leave'];
userAction.types.join = function(ws, data) {
  if (data.d) {
    if (data.d.pid) {
      if (!relConnections.hasOwnProperty(data.d.pid)) relConnections[data.d.pid] = {};
      relConnections[data.d.pid][ws._uid] = ws;
      userRelConnections[ws._uid].push(data.d.pid);
      console.log(ws._uid, "has joined", data.d.pid);
    }
  }
}
userAction.types.leave = function(ws, data) {
  if (data.d) {
    if (data.d.pid) {
      uRelConIndex = userRelConnections[ws._uid].indexOf(data.d.pid);
      if (uRelConIndex > -1) {
        delete relConnections[data.d.pid][ws._uid];
        userRelConnections[ws._uid].splice(uRelConIndex, 1);
        console.log(ws._uid, "has left", data.d.pid);
      }
    }
  }
}

// Request type = data.t
// Request data = data.d

// GET
socketEvent['rq'] = function(ws, data) {
  if (request.safeTypes.indexOf(data.t) > -1){
    request.types[data.t](data).then(function(returns) {
      data.rel = returns.rel;
      ws.send(genericResponse(data, returns.d));
    });
  }
  else console.log("Invalid request type", data.t);
};

// PUT
socketEvent['ud'] = function(ws, data) {

}

socketEvent['ua'] = function(ws, data) {
  if (userAction.safeTypes.indexOf(data.t) > -1){
    userAction.types[data.t](ws, data);
  }
  else console.log("Invalid userAction type", data.t);
}

// POST
socketEvent['ps'] = function(ws, data) {
  var captcha = data.d.captcha;
  httpRequest.post({
    url: 'https://www.google.com/recaptcha/api/siteverify',
    form: {
      secret: '6LeKLhgTAAAAAFdw1LoPr4yht9RpyaAzAzJ68zUV',
      response: captcha
    }
  }, function(error, response, body) {
    if (!error) {
      jsonBody = JSON.parse(body);
      if (jsonBody.success) {
        newJibberData = {};
        newJibberData.body = data.d.body;
        if (data.d.parent) newJibberData.parent_jibber_id = data.d.parent;
        newJibber = new models.jibber(newJibberData);
        newJibber.save(function(err) {
          if (err) console.log("There was an error");
          else {
            if (!data.d.parent) {
              broadcast({
                event: "ps",
                type: "new",
                content: newJibber
              });
            } else {
              var conList = {};
              for (var relCon in relConnections[data.d.parent]) {
                conList[relCon] = connections[relCon];
              }
              broadcast({
                event: "ps",
                type: "rel.new",
                content: newJibber
              }, conList);
            }
          }
        });
      } else {
        ws.send(genericResponse({e: 'ps', t: 'err', d: 'captcha'}));
      }
    } else {
      ws.send(genericResponse({e: 'ps', t: 'err', d: 'internal'}));
    }
  });
}

socketServer.on('connection', function(ws) {
  var newConnection = {
    'time': Date.now,
    'ws': ws
  };
  myId = connectionsCount;
  ws._uid = myId;
  connections[ws._uid] = newConnection;
  userRelConnections[ws._uid] = [];
  connectionsCount += 1;

  console.log("New connection " + myId);
  broadcast({
    event: "ps",
    type: "con",
    content: "welcome"
  });

  ws.on('message', function(message) {
    msg = JSON.parse(message);
    console.log(ws._uid, msg.e, msg.t);
    if (safeEvents.indexOf(msg['e']) > -1) socketEvent[msg['e']](ws, msg);
  });

  ws.on('close', function() {
    console.log("Connection " + ws._uid + " closed");
    for (uRelCon in userRelConnections[ws._uid]) {
      delete relConnections[uRelCon][ws._uid];
    }
    delete userRelConnections[ws._uid];
    connections[ws._uid] = null;
    delete connections[ws._uid];
    broadcast({
      event: "ps",
      type: "con",
      content: "left"
    });
  });

});
