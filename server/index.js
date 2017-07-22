'use strict';
const app = require('./app');
const db = require('../db');
const PORT = process.env.port || 3000;
var osc = require('node-osc');

//APP
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
  activeClients = {}



// map =
// {
//   '52940': {
//     serial: '5394',
//     name: 'Ken',
//     socketId: 'IjqoVDsd3aVWjVEOAAAB',
//     port: 52940
//   }
// }



//PLAYER CONNECTS
io.sockets.on('connection', function(socket) {

  socket.on('connectPlayers', ({ name, serial }) => {
    console.log('new player connecting... ', name, ' on serial ', serial, '\n on socket id ', socket.id);
    clients[serial] = { serial, name, socketId: socket.id };
    // console.log(clients)
  });

});

//PLAYER STREAMS DATA
oscServer.on('message', function(msg, { port }) {

  if (msg[0] === '/muse/config') {
    var config = JSON.parse(msg[1]);
    let serial = config.serial_number.split('-')[2];
    // console.log(serial)
    // console.log(clients[serial])
    if (!clients[serial]) { return; }

    if (!map[port]) { // check if doesn't exist
      map[port] = clients[serial];
      map[port].port = port;
      queue.push(map[port]); // new player, add to queue
      if (queue.length >= 2) {
        startPlaying(queue.shift(), queue.shift());
      }
    }

  } else if (msg[0] === '/muse/elements/experimental/mellow') {
    if (!activeClients[port]) { return; }; // port doesn't exist
    dataPoints[port] = dataPoints[port] || [];
    dataPoints[port].push(msg[1]);
    // console.log('dataPoints', dataPoints)
  }
});

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
  activeClients[player1.port] = true
  activeClients[player2.port] = true

  console.log('playing', playing)
  console.log('active players', activeClients)
};


// get the player's points
let getPoints = function({ port }) {

  if (!dataPoints[port]) { return 0 }
  // console.log('before queue', dataPoints[port].length, port)

  var points = dataPoints[port].shift()
  // console.log('after queue', dataPoints[port].length, port)

  return points

};

let updateGame = function() {
  if (!playing.length) { return; }

  let pointsA = 0,
    pointsB = 0;

  playing.forEach(([player1, player2]) => {
    pointsA = getPoints(player1);
    pointsB = getPoints(player2);
    // console.log('points', pointsA, pointsB)

    let difference = pointsA - pointsB;

    [player1, player2].forEach(player => {
      let calmScore = null
      calmScore = getPoints(player) * 100
      console.log('calmScore', calmScore, player.port)
      io.to(player.socketId).emit('score', { difference, calmScore })
    })

  });
};

setInterval(updateGame, 200);
























// io.sockets.on('connection', function(socket) {
//   console.log('socket', socket.id)

//   socket.on('testing', function(obj) {
//     console.log('hello', obj, socket.id)
//   })

//   var map = {}
//   oscServer.on('message', function(msg, rinfo) {

//     //grab the pairing and add to the map
//     if (msg[0] === '/muse/config') {
//       var config = JSON.parse(msg[1])
//       map[rinfo.port] = config.serial_number.split('-')[2]
//       // console.log('message', { data: msg, serial: map[rinfo.port] })
//     }

//     //emit information to client
//     socket.emit('museData', { data: msg, serial: map[rinfo.port] });

//   });

// });
