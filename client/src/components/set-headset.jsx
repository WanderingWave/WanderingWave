import React from 'react';
import Gameboard from './gameboard.jsx';

class SetHeadset extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      playerA: 'xxx',
      playerB: 'yyy'
    };
  }

  setPlayer(serial) {
    if (serial === '3D62') {
      this.setState({playerA: serial},
        () => { this.setState({playerB: '489F'}); }
      );
    } else {
      this.setState({playerA: '489F'},
        () => { this.setState({playerB: '3D62'}); }
      );
    }
  }

  // handleClick(id) {
  // 	// this.props.setPlayer(id);
  // 	console.log(id);
  // }

  render() {
    return (
      <div>
        <h1 className="select-headband">Select Headband For Player A</h1>
        <button onClick={ () => this.setPlayer('3D62') }>3D62</button>
        <button onClick={ () => this.setPlayer('489F') } >489F</button>
      </div>
    );
  }
}

export default SetHeadset;
