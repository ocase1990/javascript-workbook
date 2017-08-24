'use strict';

const React = require('react');
const ReactDOM = require('react-dom');

class TowersOfHanoi extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      moved: {}
    };
    this.selectBlock = this.selectBlock.bind(this);
    this.placeBlock = this.placeBlock.bind(this);
    this.checkWin = this.checkWin.bind(this);
  }

  render() {
    return React.createElement(
      'div',
      null,
      React.createElement(
        'div',
        { 'data-stack': '1', onClick: this.placeBlock },
        React.createElement('div', { 'data-block': '100', onClick: this.selectBlock }),
        React.createElement('div', { 'data-block': '75', onClick: this.selectBlock }),
        React.createElement('div', { 'data-block': '50', onClick: this.selectBlock }),
        React.createElement('div', { 'data-block': '25', onClick: this.selectBlock })
      ),
      React.createElement('div', { 'data-stack': '2', onClick: this.placeBlock }),
      React.createElement('div', { 'data-stack': '3', onClick: this.placeBlock })
    );
  }

  selectBlock(e) {
    if (!this.state.moved.target) {
      // if target doesnt have a selected block then assign clicked block
      this.state.moved = { target: e.target, size: e.target.attributes[0].value, parent: e.target.parentNode };
      e.target.parentNode.removeChild(e.target);
    }
  }
  placeBlock(e) {
    let last = e.target.children[e.target.children.length - 1];
    let lastSize = last && parseInt(last.attributes[0].value, 10); // value return a string, this turns the value into a number

    if (!lastSize || lastSize > this.state.moved.size) {
      e.target.appendChild(this.state.moved.target);
      this.state.moved.target = 0; // makes target 0 to return falsey
      if (e.target.children.length === 4) {
        alert("You've won!");
      }
    } else {
      this.state.moved.parent.appendChild(this.state.moved.target);
      this.state.moved.target = 0; // makes target 0 to return falsey
    }
  }
}

ReactDOM.render(React.createElement(TowersOfHanoi, null), document.getElementById('towers-of-hanoi'));