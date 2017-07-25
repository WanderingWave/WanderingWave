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
				playerA: this.props.playerA,
				playerB: this.props.playerB
			};
			this.changeBallSize = this.changeBallSize.bind(this);
		}
		
		componentDidMount() {
			alert('are you ready to play?');
			var socket = io();
			socket.on('hello', (data) => {
				this.getMellowData(data, this.changeBallSize);
			});
		}

		getMellowData(data, callback) {
			if (data['data'][0] === '/muse/elements/experimental/mellow') {
				var val = data['data'][1];
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

		render() {
			return (
        <div>
          <svg width="700" height="450">
					<circle className ="ball" cx={this.state.cx} cy={this.state.cy} r={this.state.radius} stroke="green" strokeWidth="4" fill="yellow" />
				  </svg>
					<h1 className="player-a">Player A : {this.state.playerA}</h1>
					<h1>Player B : {this.state.playerB}</h1>
        </div>
			);
		}
};


export default Gameboard;