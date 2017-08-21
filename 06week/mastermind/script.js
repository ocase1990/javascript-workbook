'use strict';

document.addEventListener('DOMContentLoaded', () => {
  let stack = document.querySelectorAll('[data-stack]');
  let block = document.querySelectorAll('[data-block]');
  let moved = {};
  let currentColor = {};
  let currentGuess = [];
  let currentRow = 2;
  let solution = [];
  let solutionBlock = [];
  // generateSolution
  function generateSolution () {
    for (let i = 0; i < 4; i++) {
      solution += getRandomInt(1, 8);
    }
    console.log(solution);
  }
  // random number for solution positions
  function getRandomInt (min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
  }
  generateSolution();

  document.querySelectorAll('[data-block]').forEach((block) => {
    block.addEventListener('click', (e) => {
      e.stopPropagation();
      moved = { target: e.target, size: e.target.attributes[0].value, parent: e.target.parentNode };
      currentColor = moved.target.cloneNode(true);
    });
  });

  document.querySelectorAll('[data-stack]').forEach((stack) => {
    stack.addEventListener('click', (e) => {
      if (currentRow === parseInt(e.target.attributes[0].value)) { // if selected stack is current stack then place piece
        e.target.appendChild(currentColor);
        currentGuess += currentColor.attributes[0].value;
        console.log(currentGuess);
      }
    });
  });

  document.querySelector('button').addEventListener('click', (e) => {
    checkAnswer();
  });

  function checkAnswer () {
    if (currentGuess === solution) {
      let win = document.createTextNode('You Win!');
      stack[currentRow - 1].appendChild(win);
    } else {
      generateHint(currentGuess);
    }
    currentRow++;
    currentGuess = [];
    if (currentRow === 12) {
      displaySolution();
    }
  }
  function displaySolution () {
    stack[12].appendChild(stack[11]);
  }
  function generateHint (currentGuess) {
    let correctLetters = 0;
    let wrongPositions = 0;
    let duplicateCounter = 0;
    let correctPeg = [];
    let wrongPositionsPeg = [];

    // guess    7714
    // solution 1734

    if (currentGuess[0] === currentGuess[1]) {
      ++duplicateCounter;
    } else if (currentGuess[0] === currentGuess[2]) {
      ++duplicateCounter;
    } else if (currentGuess[0] === currentGuess[3]) {
      ++duplicateCounter;
    }

    if (currentGuess[1] === currentGuess[2]) {
      ++duplicateCounter;
    } else if (currentGuess[1] === currentGuess[3]) {
      ++duplicateCounter;
    }

    if (currentGuess[2] === currentGuess[3]) {
      ++duplicateCounter;
    }
    /*
    if ((guess[1] === guess[2]) && (guess[1] === guess[3])) {
      --duplicateCounter;
    }
    if ((guess[0] === guess[1]) && (guess[0] === guess[2]) && (guess[0] === guess[3])) {
      ++duplicateCounter;
    }
  */
    // console.log(duplicateCounter);

    for (let i = 0; i < 4; i++) {
      if (currentGuess[i] === solution[i]) {
        ++correctLetters;
      } else if (currentGuess[i] !== solution[i] && solution.includes(currentGuess[i])) {
        ++wrongPositions;
        console.log(wrongPositions);
        console.log(duplicateCounter);
      }
    }
  // 7714
  // 1734
    if (duplicateCounter >= correctLetters) {
      wrongPositions = (wrongPositions - duplicateCounter);
    } else {
      wrongPositions = wrongPositions - duplicateCounter;
    }
    if (correctLetters === 3) {
      --wrongPositions;
    }

    if (wrongPositions < 0) {
      wrongPositions = 0;
    }
    console.log(correctLetters + '-' + wrongPositions);
    let hintBox = document.createElement('DIV');
    hintBox.style.height = '25px';
    hintBox.style.width = '25px';
    hintBox.style.display = 'flex';
    hintBox.style.flexWrap = 'wrap';

    for (let j = 0; j < correctLetters; j++) {
      correctPeg[j] = document.createElement('DIV');
      correctPeg[j].style.height = '8px';
      correctPeg[j].style.width = '8px';
      correctPeg[j].style.margin = '2px';
      correctPeg[j].style.backgroundColor = '#000000';
      hintBox.appendChild(correctPeg[j]);
    }
    for (let k = 0; k < wrongPositions; k++) {
      wrongPositionsPeg[k] = document.createElement('DIV');
      wrongPositionsPeg[k].style.height = '8px';
      wrongPositionsPeg[k].style.width = '8px';
      wrongPositionsPeg[k].style.margin = '2px';
      wrongPositionsPeg[k].style.backgroundColor = '#FFFFFF';
      hintBox.appendChild(wrongPositionsPeg[k]);
    }
    stack[currentRow - 1].appendChild(hintBox);
  }
});
