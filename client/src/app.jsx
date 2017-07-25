import React from 'react';
import ReactDOM from 'react-dom';
import io from 'socket.io-client';
import Connect from './components/connect.jsx';
import Waiting from './components/waiting.jsx';
import Gameboard from './components/gameboard.jsx';
import ViewBars from './components/viewbars.jsx';

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      connected: false,
      matched: false,
      opponent: '',
      player1: '',
      player2: '',
      name: '',
      serial: ''
    };
  }

  componentWillMount() {
    this.socket = io.connect();

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

  }

  handleConnect() {

    let name = document.getElementById('nickname').value;
    let serial = document.getElementById('serial').value;

    serial = serial.toUpperCase();
    this.setState({name, serial});

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

  render() {
    let main = null;

    //NOT CONNECTED
    if (!this.state.connected) {
      main =
      <div>
      {/*<ViewBars socket={this.socket}/>*/}
      <Connect
      handlePlay={this.handlePlay.bind(this)}
      handleConnect={this.handleConnect.bind(this)}
      />
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
        socket={this.socket}
        player1={this.state.player1}
        player2={this.state.player2}/>
      </div>;
    }
    return (
      <div>
      {main}
      </div>
    );
  }
}

ReactDOM.render(<App/>, document.getElementById('root'));
