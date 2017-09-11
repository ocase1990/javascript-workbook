'use strict';
import Request from 'superagent';
const React = require('react');
const ReactDOM = require('react-dom');
const styles = require('./style.css');

class Fetch extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      city: 'Austin',
      weather: []
    };
    this.clicked = this.clicked.bind(this);
  }

  componentWillMount () {
    var url = 'http://api.openweathermap.org/data/2.5/weather?q=' + this.state.city + '&APPID=d02f9b1a48f5251fc78f85caab8bdf90';
    Request.get(url).then((response) => {
      console.log(response);
      this.setState({
        weather: response.body.main
      });
    });
  }

  render () {
    return <div className='container main'>
      <div className='row one'>
        <div><h1>SimpleWeather</h1></div>
      </div>
      <div className='row one'>
        <button id='dallas' className='btn btn-primary' onClick={this.clicked}>Dallas</button>
        <button id='austin' className='btn btn-primary' onClick={this.clicked}>Austin</button>
        <button id='sanantonio' className='btn btn-primary' onClick={this.clicked}>San Antonio</button>
        <button id='houston' className='btn btn-primary' onClick={this.clicked}>Houston</button>
        <button id='sydney' className='btn btn-primary' onClick={this.clicked}>Sydney</button>
        <button id='london' className='btn btn-primary' onClick={this.clicked}>London</button>
        <button id='amsterdam' className='btn btn-primary' onClick={this.clicked}>Amsterdam</button>
      </div>
      <div className='row'>
        <div className='result'>Temp: {((1.8 * ((parseInt(this.state.weather.temp)) - 273)) + 32)} degrees</div>
        <div className='result'>Humidity: {this.state.weather.humidity}%</div>
        <div className='result'>Pressure: {this.state.weather.pressure}mb</div>
      </div>
    </div>;
  }

  clicked (e) {
    console.log(e.target.id);
    let newUrl = 'http://api.openweathermap.org/data/2.5/weather?q=' + e.target.id + '&APPID=d02f9b1a48f5251fc78f85caab8bdf90';
    Request.get(newUrl).then((response) => {
      console.log(response);
      this.setState({
        weather: response.body.main
      });
    });
  }
}

ReactDOM.render(<Fetch />, document.getElementById('fetch'));
