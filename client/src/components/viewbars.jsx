import React from 'react';
import io from 'socket.io-client';

class ViewBars extends React.Component {

  // set initial values for testing
  constructor(props) {
    super(props);
    this.state = { calmScore: null };
  }

  componentDidMount() {
    this.props.socket.on('score', function(val) {
      console.log('data', val)
      this.setState({ calmScore: val.calmScore });
    }.bind(this));
  }

  render() {
    return (
      <div>
        <h1>{this.state.calmScore}</h1>
      </div>
    );
  }
}

export default ViewBars;
