import React from 'react';
import io from 'socket.io-client';

class ViewBars extends React.Component {

  // set initial values for testing
  constructor (props) {
    super(props);
    this.state = {

    };

    // refactor into state
    this.pair1 = 0;
    this.pair2 = 100;
    this.makeData(1000);
    var that = this;
    $('#pair1').bind('progressbarchange', function(event, ui) {
      that.blue = that.convertToBlue(that.calcDif());
      that.setCSS();
    });
  }

  // will use relscaling later
  calcDif () {
    let temp = this.pair1 - this.pair2;
    return temp;
  }

  convertToBlue (val) {

    // remove the negative sign
    val = Math.abs(val);

    // scale to 0 to 254
    val = val * 2.55;

    // conert to and int
    val = Number.parseInt(val);

    // shift the range
    val = 255 - val;

    // conver to hexadecimal string
    val = val.toString(16);

    // make a blue scale
    val = '#0000' + val;

    return val;
  }

  makeData (i) {
    let id = setInterval(()=>{
      this.pair1 += 10;
      if (this.pair1 === 100) {
        clearInterval(id);
      }
      $( '#pair1' ).progressbar({
        value: this.pair1
      });

      $( '#pair2' ).progressbar({
        value: this.pair2
      });

    }, i);
  }

  setCSS () {
    $('#pair1').css({ 'background': '#ffffff'});
    $('#pair1 > div').css({ 'background': this.blue });

    $('#pair2').css({ 'background': '#ffffff'});
    $('#pair2 > div').css({ 'background': this.blue });
  }

  render() {
    return (
      <div>
        P1
        <div id="pair1"></div>

        P2
        <div id="pair2"></div>
      </div>
    );
  }
}
