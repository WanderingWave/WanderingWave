import React from 'react';

class Gameover extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <h1>Gameover</h1>
        <h3> { this.props.winner } won the game! </h3>
        <button data={this.props.opponentId} onClick={this.props.handleAddFriend}>Add your opponent as a friend</button>
      </div>
    );
  }
}

export default Gameover;
