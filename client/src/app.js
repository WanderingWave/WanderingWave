import React from 'react';
import ReactDOM from 'react-dom';
import io from 'socket.io-client';

class App extends React.Component {

  constructor() {
    super()
    this.state = { message: 'ken' }
  }

  componentDidMount() {
    var socket = io.connect();

    socket.on('hello', function(obj) {
      console.log('message', obj)
    });
  }


  render() {
    return (
      <div>
      <h1>Hello</h1>
      <h2>{this.state.message}</h2>
      <input/>
      <button>submit</button>
      </div>
    )
  }
}

ReactDOM.render(<App/>, document.getElementById('root'));
