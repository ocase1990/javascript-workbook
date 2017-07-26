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
  let duplicateCounter = 0;

  if (guess === solution) {
    return 'You guessed it!';
  }
  // guess    aabb
  // solution abcd

  if (guess[0] === guess[1]) {
    duplicateCounter = duplicateCounter + 1;
  } else if (guess[0] === guess[2]) {
    duplicateCounter = duplicateCounter + 1;
  } else if (guess[0] === guess[3]) {
    duplicateCounter = duplicateCounter + 1;
  }

  if (guess[1] === guess[2]) {
    duplicateCounter = duplicateCounter + 1;
  } else if (guess[1] === guess[3]) {
    duplicateCounter = duplicateCounter + 1;
  }

  if (guess[2] === guess[3]) {
    duplicateCounter = duplicateCounter + 1;
  }
  /*
  if ((guess[1] === guess[2]) && (guess[1] === guess[3])) {
    --duplicateCounter;
  }
  if ((guess[0] === guess[1]) && (guess[0] === guess[2]) && (guess[0] === guess[3])) {
    ++duplicateCounter;
  }
*/
  console.log(duplicateCounter);

  for (let i = 0; i < 4; i++) {
    if (guess[i] === solution[i]) {
      ++correctLetters;
    } else if (guess[i] !== solution[i] && solution.includes(guess[i])) {
      ++wrongPositions;
    }
  }

  if (duplicateCounter >= correctLetters) {
  wrongPositions = (wrongPositions - duplicateCounter);
  }
  if (correctLetters === 3) {
  --wrongPositions;
  }

  if (wrongPositions < 0) {
    wrongPositions = 0;
  }


  return `${correctLetters}-${wrongPositions}`;
}

function mastermind (guess) {
  solution = 'abcd'; // Comment this out to generate a random solution
  console.log(solution);
  guess = guess.toLowerCase().trim();
  console.log(generateHint(guess));
  return generateHint(guess);
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
