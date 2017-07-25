import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import Gameboard from './components/gameboard.jsx';
import SetHeadset from './components/set-headset.jsx';
import Message from './components/message.jsx';

class App extends React.Component {

  constructor(props) {
    super(props);
     this.state = {
      view: '',
      messages: [],
      playerA: '',
      playerB: ''
    };
    this.changeView = this.changeView.bind(this);
  }

  handleMessage(event) {
    event.preventDefault();
    console.log('sending message');
    let that = this;
    let messageObj = document.getElementById('message');
    let message = messageObj.value;
    console.log(message);

    axios.post('/messages', {message})
      .then(function (response) {
        messageObj.value = '';
        that.getMessage();

        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  getMessage() {
    let that = this;
    axios.get('/messages')
      .then(function (response) {
        console.log(response);
        // debugger;
        that.setState({
          messages: response.data
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  // componentDidMount() {
  //   this.getMessage();
  // }

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

  changeView() {
    if (this.state.view === 'setHeadset') {
      return <SetHeadset setPlayer={this.setPlayer}/>;
    } else {
      return <Gameboard />;
    }
  }

  render() {
    return (
      <div>
        {this.changeView()}
      </div>
    );
  }

//   // render() {
//   //   return (
//   //     <div>
//   //       <h1>Hello World, from React...</h1>
//   //       <hr/>
//   //       {this.state.messages.map((message, index) => <Message message={message} key={index} />)}
//   //       <form>
//   //         <input type="text" id="message" />
//   //         <button onClick={this.handleMessage.bind(this)}>Save Message</button>
//   //       </form>
//   //     </div>
//   //   );
//   // }
}

ReactDOM.render(<App />, document.getElementById('root'));
