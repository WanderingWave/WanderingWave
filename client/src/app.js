import React from 'react';
import ReactDOM from 'react-dom';
import io from 'socket.io-client';
import axios from 'axios';

class App extends React.Component {

  constructor() {
    super()
    this.state = { message: 'ken' }
  }

  test() {
    axios.post('/user', {
        firstName: 'Fred',
        lastName: 'Flintstone'
      })
      .then(function(response) {
        console.log(response);
      })
      .catch(function(error) {
        console.log(error);
      });
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
      <button onClick={this.test.bind(this)}>submit</button>
      </div>
    )
  }
}

ReactDOM.render(<App/>, document.getElementById('root'));
