import React from 'react';
import ReactDOM from 'react-dom';
import io from 'socket.io-client';
import Connect from './components/connect.jsx';
import Waiting from './components/waiting.jsx';
import Gameboard from './components/gameboard.jsx';
import Signal from './components/signal.jsx';

// const remote = require('electron').remote

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      connected: false,
      matched: false,
      opponent: '',
      opponentId: 1,
      player1: '',
      player2: '',
      name: '',
      serial: '',
      hasNotifications: null,
      notificationsCount: null
    };
  }

  componentWillMount() {

    // localStorage.setItem('id', 1)
    this.socket = io.connect();

    // this.socket.emit('id', localStorage.getItem('id'))

    this.socket.on('matched', function(obj) {
      console.log(obj);
      this.setState({
        matched: true,
        opponent: obj.opponent
      });

      if (obj.left) {
        this.setState({
          player1: localStorage.getItem('name'),
          player2: obj.opponent
        });
      } else {
        this.setState({
          player1: obj.opponent,
          player2: localStorage.getItem('name')
        });
      }
    }.bind(this));

    this.socket.on('testConnection', function(currentConnection) {
      console.log('current connection is ', currentConnection);
    });

    this.socket.on('receiveFriendRequest', (obj) => {
      this.setState({ hasNotifications: true })
      console.log('Youve got a request')
    });
  }

  setUser1() {
    localStorage.setItem('id', 1)
    this.socket.emit('id', localStorage.getItem('id'))
  }

  setUser2() {
    localStorage.setItem('id', 2)
    this.socket.emit('id', localStorage.getItem('id'))
  }

  handleConnect() {
    // remote.openTerminal()
    let name = document.getElementById('nickname').value;
    let serial = document.getElementById('serial').value;

    serial = serial.toUpperCase();
    this.setState({ name, serial });

    console.log('handle connect called');
    [
      ['name', name],
      ['serial', serial]
    ]
    .forEach(item => localStorage.setItem(item[0], String(item[1])));

    this.socket.emit('streamConnection', { name, serial });

  }

  handlePlay() {

    this.setState({ connected: true });
    this.socket.emit('connectPlayers', { name: this.state.name, serial: this.state.serial });

  }

  handleAddFriend(e) {
    console.log('friend requested')
    this.socket.emit('createFriendRequest', { from: localStorage.getItem('id'), to: e.target.getAttribute('data') })
  }

  render() {
    let main = null;
    let nav = null

    //NOT CONNECTED
    if (!this.state.connected) {
      nav =
        <div>
          <h4>My Profile</h4>
          <h4>Connect</h4>
          <h4>Leaderboard</h4>
          <h4>{'Notifications ' + this.state.notificationsCount}</h4>
        </div>
      main =
        <div>
          <button onClick={this.setUser1.bind(this)} data={1}>I'm Player 1</button>
          <button onClick={this.setUser2.bind(this)} data={2}>I'm Player 2</button>
          <button onClick={this.handleAddFriend.bind(this)} data={1}>Add Friend 1</button>
          <button onClick={this.handleAddFriend.bind(this)} data={2}>Add Friend 2</button>
          <Connect
          handlePlay={this.handlePlay.bind(this)}
          handleConnect={this.handleConnect.bind(this)}
          />
          <Signal socket={this.socket}/>
      </div>;
    }
    //WAITING FOR OPPONENT
    if (this.state.connected && !this.state.matched) {
      main =
        <div>
          <Waiting />
        </div>;

    }

    //READY TO PLAY
    if (this.state.connected && this.state.matched) {
      main =
        <div>
          <Gameboard opponent={this.state.opponent}
            opponentId={this.state.opponentId}
            handleAddFriend={this.handleAddFriend.bind(this)}
            socket={this.socket}
            player1={this.state.player1}
            player2={this.state.player2}/>
        </div>;
    }
    return (
      <div>
        {nav}
        {main}
      </div>
    );
  }
}

ReactDOM.render(<App/>, document.getElementById('root'));
