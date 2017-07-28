import React from 'react';
import $ from 'jquery';
import 'jqueryui';

class ViewBarsSingle extends React.Component {

  constructor (props) {

    // initialize queues
    ViewBarsSingle.queueMellow = Array(20).fill(50);
    ViewBarsSingle.queueConcentration = Array(20).fill(50);

    super(props);
    this.state = {
      mellow: 0,
      concentration: 0,
      rawFFT0: 0
    };
    // this.makeData(1000);
  }

  componentDidMount () {
    this.props.socket.on('testConnection', function(val) {
      // console.log('experimentalMellow', val);
      this.setState({ mellow: val});
      this.easeMellow(this.state.mellow);
    }.bind(this));

    this.props.socket.on('experimentalConcentration', function(val) {
      // console.log('experimentalConcentration', val);
      this.setState({ concentration: val});
      this.easeConcentration(this.state.concentration);
    }.bind(this));

    this.props.socket.on('rawFFT0', function(val) {
      this.setState({ rawFFT0: val});
      this.easeRaw(this.state.rawFFT0);
    }.bind(this));

  }

  easeConcentration (concentration) {
    ViewBarsSingle.queueConcentration.push(concentration);
    ViewBarsSingle.queueConcentration.shift();
    this.run(this.takeAverage(ViewBarsSingle.queueConcentration), '#concentration');
  }

  easeMellow (mellow) {
    ViewBarsSingle.queueMellow.push(mellow);
    ViewBarsSingle.queueMellow.shift();
    this.run(this.takeAverage(ViewBarsSingle.queueMellow), '#mellow');
  }

  easeRaw (raw) {
    raw.shift();
    let sum = 0;
    raw.forEach((val) => {
      sum += val
    })
    let avg = sum /  raw.length;
    let low = -10;
    let high = 30;
    let abs = Math.abs(avg);
    let scaled =  ( abs / ( high - low ) ) * 100;
    this.run(scaled, '#raw');
  }

  takeAverage (queueType) {
    let sum = 0;
    let length = queueType.length;
    queueType.forEach((val) => {
      sum += val;
    });
    return sum / length;
  }

  run (avgVal, dom) {
    let val = avgVal;
    val = Math.abs(val);
    val = val * 2.55;
    val = Number.parseInt(val);
    val = val.toString(16);
    if(dom === '#mellow'){
      val = '#0000' + val;
    }
    if(dom === '#concentration'){
      val = '#00' + val + '00';
    }
    if(dom === '#raw'){
      console.log('EEG', avgVal);

      val = '#' + val + '0000';
    }
    $(dom).css({ 'background': '#ffffff'});
    $( dom + ' > div').css({ 'background': val });
    $( dom ).progressbar({
      value: avgVal
    });
  }

  // put in a utility file
  timeDiff () {
    var time = + new Date();
    var diff = time - ViewBarsSingle.time;
    ViewBarsSingle.time = time;
    return diff;
  }

  // put in a utility file
  makeData (i) {
    let id = setInterval(()=>{
      this.state.mellow += 10;
      if (this.state.mellow === 100 || this.state.concentration === 100) {
        clearInterval(id);
      }
      this.updateBars();
    }, i);
  }


  render() {
    return (
      <div>
        <h3>Mellow Level</h3>
        <div id="mellow"></div>

        <h3>Concentration Level</h3>
        <div id="concentration"></div>

        <h3>Raw EEG</h3>
        <div id="raw"></div>

      </div>
    );
  }
}

// new ViewBars()
export default ViewBarsSingle;