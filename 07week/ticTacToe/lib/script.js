'use strict';

class TicTacToe extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      playerTurn: 'X'
    };

    this.makeMove = this.makeMove.bind(this);
    this.checkWin = this.checkWin.bind(this);
    this.click = this.click.bind(this);
  }
  render() {
    return React.createElement(
      'div',
      null,
      React.createElement(
        'div',
        { className: 'row' },
        React.createElement('div', { 'data-cell': '0', onClick: this.click }),
        React.createElement('div', { 'data-cell': '1', onClick: this.click }),
        React.createElement('div', { 'data-cell': '2', onClick: this.click })
      ),
      React.createElement(
        'div',
        { className: 'row' },
        React.createElement('div', { 'data-cell': '3', onClick: this.click }),
        React.createElement('div', { 'data-cell': '4', onClick: this.click }),
        React.createElement('div', { 'data-cell': '5', onClick: this.click })
      ),
      React.createElement(
        'div',
        { className: 'row' },
        React.createElement('div', { 'data-cell': '6', onClick: this.click }),
        React.createElement('div', { 'data-cell': '7', onClick: this.click }),
        React.createElement('div', { 'data-cell': '8', onClick: this.click })
      )
    );
  }

  makeMove(e) {
    if (!e.target.innerHTML) {
      e.target.innerHTML = this.state.playerTurn;
      this.state.playerTurn = this.state.playerTurn === 'X' ? 'O' : 'X';
    } else {
      console.log('invalid');
    }
  }
  checkWin() {
    let qSelect = document.querySelectorAll('[data-cell]');
    // diagonal win
    if (qSelect[4].innerHTML) {
      if (qSelect[0].innerHTML + qSelect[4].innerHTML + qSelect[8].innerHTML === 'XXX' || qSelect[0].innerHTML + qSelect[4].innerHTML + qSelect[8].innerHTML === 'OOO') {
        alert(qSelect[4].innerHTML + "'s wins!'");
      }
      if (qSelect[2].innerHTML === qSelect[4].innerHTML && qSelect[4].innerHTML === qSelect[6].innerHTML) {
        alert(qSelect[4].innerHTML + "'s wins!'");
      }
    }
    // horizontal win
    for (var i = 0; i < 9; i += 3) {
      if (qSelect[i].innerHTML) {
        // if there is an x or o in the square
        if (qSelect[i].innerHTML === qSelect[i + 1].innerHTML && qSelect[i + 1].innerHTML === qSelect[i + 2].innerHTML) {
          // this line is for horizontal win
          alert(qSelect[i].innerHTML + "'s wins!'");
        }
      }
    }
    // vertical win
    for (let j = 0; j < 4; j++) {
      if (qSelect[j].innerHTML) {
        if (qSelect[j].innerHTML === qSelect[j + 3].innerHTML && qSelect[j + 3].innerHTML === qSelect[j + 6].innerHTML) {
          // this line is for vertical win
          alert(qSelect[j].innerHTML + "'s wins!'");
        }
      }
    }
  }

  click(e) {
    this.makeMove(e);
    this.checkWin();
  }
}

ReactDOM.render(React.createElement(TicTacToe, null), document.getElementById('container'));