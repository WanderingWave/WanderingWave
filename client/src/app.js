

class App extends React.Component {

  constructor() {
    super()
    this.state = {
      nickname: null,
      serial: null,
      connected: false,
      matched: false
    }
  }

  componentDidMount() {
    this.socket = io.connect();

    this.socket.on('museData', function(obj) {
      console.log('museData', obj)
    });

    this.socket.on('matched', function(obj) {
      this.setState({ matched: true })
    });
  }


  handleConnect(nickname, serial) {
    console.log('hi')
    this.setState({ connected: true })
    // this.socket.emit('connect', { nickname: nickname, serial: serial })
  }

  handleNicknameChange(evt) {
    this.setState({
      nickname: evt.target.value
    });
  }

  handleSerialChange(evt) {
    this.setState({
      serial: evt.target.value
    });
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
      main = <Gameboard />
    }

    return (
      <div>
      {main}
      </div>
    )
  }
}

ReactDOM.render(<App/>, document.getElementById('root'));
