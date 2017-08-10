'use strict';

const assert = require('assert');
const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

var player = 'r';

function Checker() {
  // Your code here
}

function Board() {
  this.checkers = 'bbbbbbbbbbbbbbbbbbbbbbbb';
  this.grid = [];
  // creates an 8x8 array, filled with null values
  this.createGrid = function() {
    // loop to create the 8 rows
    for (let row = 0; row < 8; row++) {
      this.grid[row] = [];
      // push in 8 columns of nulls
      for (let column = 0; column < 8; column++) {
        this.grid[row][column] = null;
      }
    }
    // black pieces
    this.grid[0][1] = 'b';
    this.grid[0][3] = 'b';
    this.grid[0][5] = 'b';
    this.grid[0][7] = 'b';
    this.grid[1][0] = 'b';
    this.grid[1][2] = 'b';
    this.grid[1][4] = 'b';
    this.grid[1][6] = 'b';
    this.grid[2][1] = 'b';
    this.grid[2][3] = 'b';
    this.grid[2][5] = 'b';
    this.grid[2][7] = 'b';

    // red pieces
    this.grid[7][0] = 'r';
    this.grid[7][2] = 'r';
    this.grid[7][4] = 'r';
    this.grid[7][6] = 'r';
    this.grid[6][1] = 'r';
    this.grid[6][3] = 'r';
    this.grid[6][5] = 'r';
    this.grid[6][7] = 'r';
    this.grid[5][0] = 'r';
    this.grid[5][2] = 'r';
    this.grid[5][4] = 'r';
    this.grid[5][6] = 'r';
  };

  // prints out the board
  this.viewGrid = function() {
    // add our column numbers
    let string = "  0 1 2 3 4 5 6 7\n";
    for (let row = 0; row < 8; row++) {
      // we start with our row number in our array
      const rowOfCheckers = [row];
      // a loop within a loop
      for (let column = 0; column < 8; column++) {
        // if the location is "truthy" (contains a checker piece, in this case)
        if (this.grid[row][column]) {
          // push the symbol of the check in that location into the array
          rowOfCheckers.push(this.grid[row][column]);
        } else {
          // just push in a blank space
          rowOfCheckers.push('_');
        }
      }
      // join the rowOfCheckers array to a string, separated by a space
      string += rowOfCheckers.join(' ');
      // add a 'new line'
      string += "\n";
    }
    console.log(string);
  };


}
function Game() {
  this.board = new Board();

  this.start = function() {
    this.board.createGrid();

  };
  this.moveChecker = function(whichPiece, toWhere) {
    let first1 = whichPiece[0]; // 5
    let second1 = whichPiece[1]; // 0
    let first2 = toWhere[0]; // 4
    let second2 = toWhere[1]; // 1
    if (player === 'r') {
      if(toWhere < whichPiece) { // 50 41
        if((whichPiece[0] - toWhere[0]) === 1) {
          game.board.grid[whichPiece[0]][whichPiece[1]] = '_';
          game.board.grid[toWhere[0]][toWhere[1]] = player;
          player = 'b';
        } else if ((whichPiece[0] - toWhere[0]) === 2) {
          let deleteRow = whichPiece[0] - 1; // 56 34 delete 45  -- 50 32 delete 41
          let deleteColumn = 1;
          if (whichPiece[1] > toWhere[1]) {
            deleteColumn = (whichPiece[1] - 1);
          } else {
            deleteColumn = (toWhere[1] - 1);
          }
          if (game.board.grid[deleteRow][deleteColumn] === 'b') {
            game.board.grid[whichPiece[0]][whichPiece[1]] = '_';
            game.board.grid[deleteRow][deleteColumn] = '_';
            game.board.grid[toWhere[0]][toWhere[1]] = player;
            player = 'b';
            game.board.checkers = game.board.checkers.slice(1, game.board.checkers.length);
          } else {
            console.log('Not a legal move.');
          }

        }
      } else {
        console.log('Not a legal move.')
      }
    } else { // b
      if(whichPiece < toWhere) { // 30 52
        if((toWhere[0] - whichPiece[0]) === 1) {
          game.board.grid[whichPiece[0]][whichPiece[1]] = '_';
          game.board.grid[toWhere[0]][toWhere[1]] = player;
          player = 'r';
        } else if ((toWhere[0] - whichPiece[0]) === 2) {
          let deleteRow = toWhere[0] - 1;
          let deleteColumn = 1;
          if (whichPiece[1] > toWhere[1]) {
            deleteColumn = (whichPiece[1] - 1);
          } else {
            deleteColumn = toWhere[1] - 1;
          }
          if ((game.board.grid[deleteRow][deleteColumn] === 'r')) {
            game.board.grid[whichPiece[0]][whichPiece[1]] = '_';
            game.board.grid[deleteRow][deleteColumn] = '_';
            game.board.grid[toWhere[0]][toWhere[1]] = player;
            player = 'r';
            game.board.checkers = game.board.checkers.slice(1, game.board.checkers.length);
          } else {
            console.log('Not a legal move.')
          }

        }
      } else {
        console.log('Not a legal move.')
      }
    }
  }
}

function getPrompt() {
  console.log("It's player " + player + "'s turn.'");
  game.board.viewGrid();
  rl.question('which piece?: ', (whichPiece) => {
    rl.question('to where?: ', (toWhere) => {
      game.moveChecker(whichPiece, toWhere);
      getPrompt();
    });
  });
}

const game = new Game();
game.start();


// Tests

if (typeof describe === 'function') {
  describe('Game', () => {
    it('should have a board', () => {
      assert.equal(game.board.constructor.name, 'Board');
    });
    it('board should have 24 checkers', () => {
      assert.equal(game.board.checkers.length, 24);
    });
  });

  describe('Game.moveChecker()', function () {
    it('should move a checker', function () {
      assert(!game.board.grid[4][1]);
      game.moveChecker('50', '41');
      assert(game.board.grid[4][1]);
      game.moveChecker('21', '30');
      assert(game.board.grid[3][0]);
      game.moveChecker('52', '43');
      assert(game.board.grid[4][3]);
    });
    it('should be able to jump over and kill another checker', () => {
      game.moveChecker('30', '52');
      assert(game.board.grid[5][2]);
      assert(game.board.grid[4][1], '_');
      assert.equal(game.board.checkers.length, 23);
    });
  });
} else {
  getPrompt();
}
