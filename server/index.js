'use strict';
const app = require('./app');
const db = require('../db');
const PORT = process.env.port || 3000;
var osc = require('node-osc');

let server = app.listen(PORT, () => {
  console.log('Example app listening on port 3000!');
});

var io = require('socket.io')(server);
var oscServer = new osc.Server(5000);
var map = {},
  queue = [],
  dataPoints = {},
  playing = [],
  clients = {},
  activeClients = {};

//PLAYER CONNECTS
io.sockets.on('connection', function(socket) {

  socket.on('streamConnection', ({ name, serial }) => {
    console.log('connection starting to stream');
    clients[serial] = { serial, name, socketId: socket.id, isPlaying: false };

  });

  socket.on('connectPlayers', ({ serial }) => {
    console.log('clients serial is ', serial, ' client is ', clients[serial]);
    if (!clients[serial] || clients[serial].isPlaying) { return; } // if no client or client is playing, end

    console.log('connecting serial ', clients[serial]);
    clients[serial].isPlaying = true;
    queue.push(clients[serial]); // new player, add to queue
    if (queue.length >= 2) {
      startPlaying(queue.shift(), queue.shift());
    }
  });

});

//PLAYER STREAMS DATA
oscServer.on('message', function(msg, { port }) {

  // if (msg[0] === '/muse/elements/horseshoe') {
  //   console.log(msg)
  // }

  if (msg[0] === '/muse/config') {
    var config = JSON.parse(msg[1]);
    let serial = config.serial_number.split('-')[2];
    if (!clients[serial]) { return; }

    if (!map[port]) { // check if doesn't exist
      map[port] = clients[serial];
      map[port].port = port;
    }

  } else {

    if (msg[0] === '/muse/elements/experimental/mellow') {

      // if (!activeClients[port]) { return; }; // port doesn't exist
      if (!map[port]) { return; }
      if (!map[port].isPlaying) { // client is not playing yet. stream them just their data
        io.to(map[port].socketId).emit('testConnection', msg[1] * 100);
      }
      dataPoints[port] = dataPoints[port] || [];
      dataPoints[port].push(msg[1]);
    }

    if (msg[0] === '/muse/elements/horseshoe') {
      if (!map[port]) { return; }
      if (!map[port].isPlaying) { // client is not playing yet. stream them just their data
        io.to(map[port].socketId).emit('signalStrength', [msg[1], msg[2], msg[3], msg[4]]);
      }
    }
  }
})


let startPlaying = function(player1, player2) {
  console.log('game started for players');
  console.log('player1 ', player1);
  console.log('player2 ', player2);

  player1.pair = player2;
  player2.pair = player1;

  [player1, player2].forEach((player, index) => {
    console.log('start streaming for ', player.name, ' on socket ', player.socketId);
    io.to(player.socketId).emit('matched', { opponent: player.pair.name, left: !index });
  });

  playing.push([player1, player2]);
  // activeClients[player1.port] = true
  // activeClients[player2.port] = true
};


// get the player's points
let getPoints = function({ port }) {

  if (!dataPoints[port] || !dataPoints[port].length) { return 0; }
  // console.log('before queue', dataPoints[port].length, port)

  var points = dataPoints[port].shift();
  // console.log('after queue', dataPoints[port].length, port)

  return points;

};

let updateGame = function() {
  if (!playing.length) { return; }

  let pointsA = 0,
    pointsB = 0;

  playing.forEach(([player1, player2]) => {
    pointsA = getPoints(player1);
    pointsB = getPoints(player2);

    let difference = pointsA - pointsB;

    [player1, player2].forEach(player => {
      let calmScore = null;
      calmScore = getPoints(player) * 100;
      console.log('calmScore', calmScore, player.port);
      io.to(player.socketId).emit('score', { difference, calmScore });
    });

  });
};

setInterval(updateGame, 200);
