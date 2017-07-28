import React from 'react';
import $ from 'jquery';
import 'jqueryui';

class ViewBarsSingle extends React.Component {

  constructor (props) {
    ViewBarsSingle.queue = Array(20).fill(50);
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
      console.log('testConnection', val);
      this.setState({ p1: val});
      this.ease();
    }.bind(this));
  }

  timeDiff () {
    var time = + new Date();
    var diff = time - ViewBarsSingle.time;
    ViewBarsSingle.time = time;
    return diff;
  }

  ease () {
    let p1 = this.state.p1;
    ViewBarsSingle.queue.push(p1);
    ViewBarsSingle.queue.shift();
    let avg = this.takeAverage();
    console.log(p1);
    this.run(avg);
  }

  takeAverage () {
    let sum = 0;
    let length = ViewBarsSingle.queue.length;
    ViewBarsSingle.queue.forEach((val) => {
      sum += val;
    })
    return sum / length;
  }

  run (p1) {
    this.getColor(p1);
    this.setColor(this.blue);
    this.setSize(p1);
  }

  getColor (p1, p2 = 0) {
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
  }

  setSize (p1) {
    $( '#p1' ).progressbar({
      value: p1
    });
  }

  render() {
    return (
      <div>
        <h3>Concentration Level</h3>
        <div id="p1"></div>
      </div>
    );
  }
}

// new ViewBars()
export default ViewBarsSingle;