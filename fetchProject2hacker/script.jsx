'use strict';

const React = require('react');
const ReactDOM = require('react-dom');
const styles = require('./style.css');

class Fetch extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      newsList: []

    };
  }
  componentWillMount () {
    var lastArticle = fetch('https://hacker-news.firebaseio.com/v0/maxitem.json').then((response) => {
      response.json().then((data) => {
        console.log(data);
        return data;
      });
    });
    fetch(`https://hacker-news.firebaseio.com/v0/item/8863.json?print=pretty`).then((response) => {
      response.json().then((data) => {
        this.setState({
          newsList: data
        });
      });
    });
  }
  render () {
    console.log(this.state.newsList);
    return (
      <div>
        <h3><a href={this.state.newsList.url}>{this.state.newsList.title}</a></h3>
        {this.state.newsList.score} points by: {this.state.newsList.by}

        {Object.keys(this.state.newsList).map((key) => {
          return <div> {key}, {this.state.newsList[key]}</div>;
        })}


      </div>
    );
  }
}

ReactDOM.render(<Fetch />, document.getElementById('fetch'));
