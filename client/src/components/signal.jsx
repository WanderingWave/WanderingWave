import React from 'react';

class Signal extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      leftEar: null,
      leftForehead: null,
      rightForehead: null,
      rightEar: null
    }
  }

  componentWillMount() {
    this.props.socket.on('signalStrength', (signal) => {
      this.setState({ leftEar: signal[0] })
      this.setState({ leftForehead: signal[1] })
      this.setState({ rightForehead: signal[2] })
      this.setState({ rightEar: signal[3] })
    })
  }

  render() {

    let signalStrength = {
      leftEar: null,
      leftForehead: null,
      rightEar: null,
      rightForehead: null
    }

    const good = {
      background: 'green'
    }

    const fair = {
      background: 'yellow'
    }

    const poor = {
      background: 'red'
    }

    for (var key in this.state) {
      if (this.state[key] === 1) {
        signalStrength[key] = good
      }
      if (this.state[key] === 2) {
        signalStrength[key] = fair
      }
      if (this.state[key] >= 3) {
        signalStrength[key] = poor
      }
    }

    return (
      <div>
          <h3>Headset Signal Quality</h3>
          <div style={signalStrength.leftEar}>Left Ear</div>
          <div style={signalStrength.leftForehead}>Left Forehead</div>
          <div style={signalStrength.rightForehead}>Right Forehead</div>
          <div style={signalStrength.rightEar}>Right Ear</div>
      </div>
    );
  }
}

export default Signal;
