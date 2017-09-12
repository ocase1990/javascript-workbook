'use strict';

const React = require('react');
const ReactDOM = require('react-dom');
const styles = require('./style.css');

class Fetch extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      blog: true,
      people: []
    };
  }
  componentWillMount () {
    fetch('https://swapi.co/api/starships/').then((response) => {
      response.json().then((data) => {
        this.setState({
          people: data.results
        });
      });
    });
  }
  render () {
    return (
      <div>
        {this.state.people.map((item) => {
          return (
            <div key={item.name}>
              <h4>{item.name}</h4>
              <ul>
                <li >Model: {item.model}</li>
                <li>Length: {item.length}</li>
                <li>Crew #: {item.crew}</li>
                <li>Passengers #: {item.passengers}</li>
                <button className='btn btn-primary'><a href={item.url}>Learn More</a></button>
              </ul>
            </div>
          );
        })}
      </div>
    );
  }
}

ReactDOM.render(<Fetch />, document.getElementById('fetch'));
