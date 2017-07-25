import React from 'react';
import d3 from 'd3';
import io from 'socket.io-client';

class Gameboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cx : '100',
      cy : '100',
      radius: '40',
      playerA: '',
      playerB: '',
      socket: null
    };
    this.changeBallSize = this.changeBallSize.bind(this);
  }

  componentDidMount() {
    console.log('component did mount, before socket, running');
    if(this.state.socket) { return; }
    console.log('component did mount, after socket, running');
    var socket = io();
    this.setState({socket});
      // debugger;
      // this.getMellowData(data, this.changeBallSize);

    socket.on('matched', (data) => {
      alert('you have been matched with ' + data);
    });

  }

  getMellowData({data}, callback) {
    if (data[0] === '/muse/elements/experimental/mellow') {
      debugger;
      var val = data[1];
      callback(val);
    }
  }

  changeBallSize(val) {
    var r = this.state.radius;
    if (val > 50) {
      this.setState({radius: r + 5});
    } else {
      this.setState({radius: r - 5});
    }
  }

  connectUser(name, serial) {
    this.state.socket.emit('connectPlayers', {name, serial});
  }

  render() {
    return (
      <div>
        <button className="user" onClick={this.connectUser.bind(this, 'Pete', '4B9F')}>Pete</button>
        <button className="user" onClick={this.connectUser.bind(this, 'James', '3D62')}>James</button>
        <svg width="700" height="450">
          <circle className ="ball" cx={this.state.cx} cy={this.state.cy} r={this.state.radius} stroke="green" strokeWidth="4" fill="yellow" />
        </svg>
      </div>
    );
  }
};


export default Gameboard;

