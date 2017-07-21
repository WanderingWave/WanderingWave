import React from 'react';

class Connect extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <h1 className='welcome-message'> Welcome Back! </h1>
        <h3 className='instructions'> Enter a nickname and your headset number to start a game</h3>
        <input className='nickname' onChange={this.props.handleNicknameChange}></input>
        <input className='serial' onChange={this.props.handleSeralChange}></input>
        <button onClick={() => (this.props.handleConnect(this.props.nickname, this.props.serial))}>Connect</button>
      </div>
    );
  }
}

export default Connect;
