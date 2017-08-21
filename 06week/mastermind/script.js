'use strict';

document.addEventListener('DOMContentLoaded', () => {
  var stack = document.querySelectorAll('[data-stack]');
  var block = document.querySelectorAll('[data-block]');
  var newBlock = block[0].cloneNode(false);
  let moved = {};
  let currentColor = block[0].cloneNode(false);
  let currentGuess = [];
  let currentRow = 2;
  let solution = [];
  let solutionBlock = [];
  // generateSolution generates a random number solution -- each number associates with a color
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
  generateSolution(); // calls the random solution

// adds click events for the data blocks only allows home stack elements to be copied
  document.querySelectorAll('[data-block]').forEach((dataBlock) => {
    dataBlock.addEventListener('click', (e) => {
      e.stopPropagation();
      moved = { target: e.target, size: e.target.attributes[0].value, parent: e.target.parentNode };
      console.log(parseInt(moved.parent.attributes[0].value));
      if (parseInt(moved.parent.attributes[0].value) === 1) {
        currentColor = moved.target.cloneNode(false);
      } else {
        moved.parent.removeChild(moved);
      }
    });
  });

// adds click events for the data stacks to add copied blocks to current stack/row
  document.querySelectorAll('[data-stack]').forEach((dataStack) => {
    dataStack.addEventListener('click', (e) => {
      if (currentRow === parseInt(e.target.attributes[0].value)) { // if selected stack is current stack then place piece
        if (stack[currentRow - 1].children.length < 4) {
          e.target.appendChild(currentColor);
          currentColor = {};
        }
      }
    });
  });

// adds click function to button to check the guess to the solution
  document.querySelector('button').addEventListener('click', (e) => {
    checkAnswer();
  });
  function getCurrentGuess () {
    for (let i = 0; i < 4; i++) {
      currentGuess += stack[currentRow - 1].children[i].attributes[0].value;
    }
  }
  // defines the functionaliy of the button to check the answer
  // also changes current row unless final row where it calls the display solution function
  function checkAnswer () {
    getCurrentGuess();
    console.log(currentGuess);
    if (currentGuess === solution) {
      let win = document.createTextNode('You Win!');
      stack[currentRow - 1].appendChild(win);
    } else {
      generateHint(currentGuess);
    }
    currentRow++;
    currentGuess = [];
    if (currentRow === 12) {
      console.log('solution display');
      displaySolution();
    }
  }
  // display solution displays the solution generated at the beginning of the game after 10 guesses
  function displaySolution () {
    let solutionBlock = [];
    for (let i = 0; i < 4; i++) {
      solutionBlock[i] = newBlock.cloneNode(false);
      solutionBlock[i].style.width = '25px';
      solutionBlock[i].style.height = '25px';
      solutionBlock[i].style.float = 'left';
      solutionBlock[i].style.borderRadius = '100px';
      solutionBlock[i].style.margin = '2px';
      solutionBlock[i].attributes[0].value = parseInt(solution[i]);
      stack[11].appendChild(solutionBlock[i]);
    }
  }
  //generatehint generates a hint based on correct positions correct colors and correct colors wrong positions
  function generateHint (currentGuess) {
    let correctLetters = 0;
    let wrongPositions = 0;
    let duplicateCounter = 0;
    let correctPeg = [];
    let wrongPositionsPeg = [];

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

    for (let i = 0; i < 4; i++) {
      if (currentGuess[i] === solution[i]) {
        ++correctLetters;
      } else if (currentGuess[i] !== solution[i] && solution.includes(currentGuess[i])) {
        ++wrongPositions;
        console.log(wrongPositions);
        console.log(duplicateCounter);
      }
    }

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

    // this section creates the black and white pegs for correct colors
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
      correctPeg[j].style.borderRadius = '100px';
      correctPeg[j].style.float = 'right';
      correctPeg[j].style.backgroundColor = '#000000';
      hintBox.appendChild(correctPeg[j]);
    }
    for (let k = 0; k < wrongPositions; k++) {
      wrongPositionsPeg[k] = document.createElement('DIV');
      wrongPositionsPeg[k].style.height = '8px';
      wrongPositionsPeg[k].style.width = '8px';
      wrongPositionsPeg[k].style.margin = '2px';
      wrongPositionsPeg[k].style.borderRadius = '100px';
      wrongPositionsPeg[k].style.float = 'right';
      wrongPositionsPeg[k].style.backgroundColor = '#FFFFFF';
      hintBox.appendChild(wrongPositionsPeg[k]);
    }
    stack[currentRow - 1].appendChild(hintBox);
  }
});
