'use strict';

const assert = require('assert');
const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

let rockPaperScissors = (hand1, hand2) => {
  hand1 = hand1.toLowerCase().trim();
  hand2 = hand2.toLowerCase().trim();
  if (hand1 === hand2) {
    return "It's a tie!";
  } else {
    if (((hand1 === 'rock') && (hand2 === 'paper')) ||
    ((hand1 === 'paper') && (hand2 === 'scissors')) ||
    ((hand1 === 'scissors') && (hand2 === 'rock'))) {
      return 'Hand two wins!';
    } else {
      return 'Hand one wins!';
    }
  }
};

/*
  switch (hand1) {
    case 'rock':
      if (hand2 === 'paper') {
        return 'Hand two wins!';
      } else if (hand2 === 'scissors') {
        return 'Hand one wins!';
      } else {
        return "It's a tie!";
      }
      break;
    case 'paper':
      if (hand2 === 'scissors') {
        return 'Hand two wins!';
      } else if (hand2 === 'rock') {
        return 'Hand one wins!';
      } else {
        return "It's a tie!";
      }
      break;
    case 'scissors':
      if (hand2 === 'rock') {
        return 'Hand two wins!';
      } else if (hand2 === 'paper') {
        return 'Hand one wins!';
      } else {
        return "It's a tie!";
      }
        break;
  }
}
*/
function getPrompt () {
  rl.question('hand1: ', (answer1) => {
    let compAnswer = Math.random();
    let answer2;
    if (compAnswer < 0.33) {
      answer2 = 'rock';
    } else if (compAnswer > 0.66) {
      answer2 = 'paper';
    } else {
      answer2 = 'scissors';
    }
    console.log('hand2: ' + answer2);
    console.log(rockPaperScissors(answer1, answer2));
    getPrompt();
  });
}

// Tests

if (typeof describe === 'function') {

  describe('#rockPaperScissors()', () => {
    it('should detect a tie', () => {
      assert.equal(rockPaperScissors('rock', 'rock'), "It's a tie!");
      assert.equal(rockPaperScissors('paper', 'paper'), "It's a tie!");
      assert.equal(rockPaperScissors('scissors', 'scissors'), "It's a tie!");
    });
    it('should detect which hand won', () => {
      assert.equal(rockPaperScissors('rock', 'paper'), "Hand two wins!");
      assert.equal(rockPaperScissors('paper', 'scissors'), "Hand two wins!");
      assert.equal(rockPaperScissors('rock', 'scissors'), "Hand one wins!");
    });
    it('should scrub input to ensure lowercase with "trim"ed whitepace', () => {
      assert.equal(rockPaperScissors('rOcK', ' paper '), "Hand two wins!");
      assert.equal(rockPaperScissors('Paper', 'SCISSORS'), "Hand two wins!");
      assert.equal(rockPaperScissors('rock ', 'sCiSsOrs'), "Hand one wins!");
    });
  });
} else {

  getPrompt();

}
