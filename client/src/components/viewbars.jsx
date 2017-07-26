import React from 'react';
import $ from 'jquery';
import 'jqueryui';
import { createStore } from 'redux';


class ViewBars extends React.Component {

  constructor (props) {
    super(props);
    this.state = {
      p1: 0,
      p2: 0,
      players: 1
    };
    this.makeData(1000);
  }

  makeData (i) {
    let id = setInterval(()=>{
      this.state.p1 += 10;
      if (this.state.p1 === 100 || this.state.p2 === 100) {
        clearInterval(id);
      }
      this.updateBars();
    }, i);
  }

  componentDidMount () {
    console.log('viewbars mounted');
    this.props.socket.on('score', function(val) {
      this.setState({ p1: val.calmScore });
      this.updateBars();
    }.bind(this));
    // this.easeBars();
  }

  easeBars () {
    setInterval( () => {
      this.updateBars();
    }, 250);
  }

  updateBars () {
    console.log('this.updateBars called');
    let val = this.state.p1 - this.state.p2;
    val = Math.abs(val);
    val = val * 2.55;
    val = Number.parseInt(val);
    // val = 255 - val;
    val = val.toString(16);
    val = '#0000' + val;
    this.blue = val;
    this.setColor();
  }

  setColor () {
    console.log(this.blue);
    $('#p1').css({ 'background': '#ffffff'});
    $('#p1 > div').css({ 'background': this.blue });
    $('#p2').css({ 'background': '#ffffff'});
    $('#p2 > div').css({ 'background': this.blue });
    this.setSize();
  }

  setSize () {

    $( '#p1' ).progressbar({
      value: this.state.p1
    });

    $( '#p2' ).progressbar({
      value: this.state.p2
    });
  }

  render() {

    return (
      <div>
        P1

        <div id="p1"></div>

        P2
        <div id="p2"></div>

      </div>
    );

  }

}

// new ViewBars()
export default ViewBars;