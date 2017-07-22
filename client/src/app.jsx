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
      opponent: ''
    }
  }

  componentDidMount() {
    this.socket = io.connect();

    this.socket.on('score', function(obj) {
      console.log('score', obj)
    });

    this.socket.on('matched', function({opponent}) {
      this.setState({
        matched: true,
        opponent: opponent
      })
    }.bind(this));
  }


  handleConnect(name, serial) {

    // let name = document.getElementById('nickname').value;
    // let serial = document.getElementById('serial').value;
    serial = serial.toUpperCase();

    console.log('handle connect called');
    [['name', name], ['serial', serial]]
      .forEach(item => localStorage.setItem(item[0], String(item[1])));

    this.setState({ connected: true });
    this.socket.emit('connectPlayers', {name, serial})
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
      main = <Gameboard opponent={this.state.opponent}/>
    }

    return (
      <div>
      {main}
      </div>
    )
  }
}

ReactDOM.render(<App/>, document.getElementById('root'));
