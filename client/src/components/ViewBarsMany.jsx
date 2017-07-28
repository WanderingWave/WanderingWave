import React from 'react';
import $ from 'jquery';
import 'jqueryui';

class ViewBarsMany extends React.Component {

  constructor (props) {
    super(props);
    this.state = {
      p1: 0,
      p2: 0,
    };
    // this.makeData(1000);
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
    this.props.socket.on('testConnection', function(val) {
      this.setState({ p1: val});
      this.run();
    }.bind(this));
  }

  run () {
    let p1 = this.state.p1;
    let p2 = this.state.p2;
    let color = this.blue;

    this.updateBars(p1, p2);
    this.setColor(color);
    this.setSize(p1, p2);
  }

  easeBars () {
    setInterval( () => {
      this.run();
    }, 250);
  }

  updateBars (p1, p2) {
    let val = p1 - p2;
    val = Math.abs(val);
    val = val * 2.55;
    val = Number.parseInt(val);
    // val = 255 - val;
    val = val.toString(16);
    val = '#0000' + val;
    this.blue = val;
  }

  setColor (blue) {
    $('#p1').css({ 'background': '#ffffff'});
    $('#p1 > div').css({ 'background': blue });
    $('#p2').css({ 'background': '#ffffff'});
    $('#p2 > div').css({ 'background': blue });
  }

  setSize (p1, p2) {
    $( '#p1' ).progressbar({
      value: p1
    });
    $( '#p2' ).progressbar({
      value: p2
    });
  }

  render() {
    return (
      <div>
        <h3>Concentration Level</h3>
        <div id="p1"></div>
        <div id="p2"></div>
      </div>
    );
  }

}

// new ViewBars()
export default ViewBarsMany;