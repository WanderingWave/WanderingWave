import React from 'react';
import ReactDOM from 'react-dom';
import io from 'socket.io-client';
import Connect from './components/connect.jsx';
import Waiting from './components/waiting.jsx';
import Gameboard from './components/gameboard.jsx';

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      connected: false,
      matched: false,
      opponent: '',
      player1: '',
      player2: ''
    }
  }

  componentDidMount() {
    this.socket = io.connect();

    this.socket.on('matched', function(obj) {
      console.log(obj)
      this.setState({
        matched: true,
        opponent: obj.opponent
      })

      if (obj.left) {
        this.setState({
          player2: obj.opponent,
          player1: localStorage.getItem('name')
        })
      } else {
        this.setState({
          player2: localStorage.getItem('name'),
          player1: obj.opponent
        })
      }


    }.bind(this));
  }


  handleConnect() {

    let name = document.getElementById('nickname').value;
    let serial = document.getElementById('serial').value;

    serial = serial.toUpperCase();

    console.log('handle connect called');
    [
      ['name', name],
      ['serial', serial]
    ]
    .forEach(item => localStorage.setItem(item[0], String(item[1])));

    this.setState({ connected: true });
    this.socket.emit('connectPlayers', { name, serial })
  }

  render() {
    let main = null;

    //NOT CONNECTED
    if (!this.state.connected) {
      main = <Connect
      handleConnect={this.handleConnect.bind(this)}
      />
    }

    //WAITING FOR OPPONENT
    if (this.state.connected && !this.state.matched) {
      main = <Waiting />
    }

    //READY TO PLAY
    if (this.state.connected && this.state.matched) {
      main = <Gameboard opponent={this.state.opponent}
      socket={this.socket}
      player1={this.state.player1}
      player2={this.state.player2}
      />
    }

    return (
      <div>
      {main}
      </div>
    )
  }
}

ReactDOM.render(<App/>, document.getElementById('root'));
