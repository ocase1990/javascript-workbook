'use strict';

const assert = require('assert');
const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

let board = [];
let solution = '';
let letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];

function printBoard() {
  for (let i = 0; i < board.length; i++) {
    console.log(board[i]);
  }
}

function generateSolution() {
  for (let i = 0; i < 4; i++) {
    const randomIndex = getRandomInt(0, letters.length);
    solution += letters[randomIndex];
  }
}

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

function generateHint(guess) {
  let correctLetters = 0;
  let wrongPositions = 0;
  for (let i = 0; i < 4; i++) {
    if (guess[i] === solution[i]) {
      correctLetters = correctLetters + 1;
      wrongPositions = wrongPositions - 1;
    } else {
      for (let j = 0; j < 4; j++) {
        if (guess[i] === solution[j]) {
          wrongPositions = wrongPositions + 1;
        }
      }
    }
  }
  wrongPositions = (wrongPositions - correctLetters);
  return `${correctLetters}-${wrongPositions}`;
}

function mastermind(guess) {
  solution = 'abcd'; // Comment this out to generate a random solution
  // your code here
  console.log(solution);
  console.log(generateHint(guess));
  if (guess === solution) {
    console.log('You guessed it!');
  }
}

function getPrompt() {
  rl.question('guess: ', (guess) => {
    mastermind(guess);
    printBoard();
    getPrompt();
  });
}

// Tests

if (typeof describe === 'function') {
  solution = 'abcd';
  describe('#mastermind()', () => {
    it('should register a guess and generate hints', () => {
      mastermind('aabb');
      assert.equal(board.length, 1);
    });
    it('should be able to detect a win', () => {
      assert.equal(mastermind(solution), 'You guessed it!');
    });
  });

  describe('#generateHint()', () => {
    it('should generate hints', () => {
      assert.equal(generateHint('abdc'), '2-2');
    });
    it('should generate hints if solution has duplicates', () => {
      assert.equal(generateHint('aabb'), '1-1');
    });

  });

} else {

  generateSolution();
  getPrompt();
}
