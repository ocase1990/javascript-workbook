'use strict';

const assert = require('assert');
const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

let lastStack1;
let lastStack2;

let stacks = {
  a: [4, 3, 2, 1],
  b: [],
  c: []
};

function printStacks() {
  console.log("a: " + stacks.a);
  console.log("b: " + stacks.b);
  console.log("c: " + stacks.c);
}

function movePiece() {
  // Your code here

}

function isLegal(startStack, endStack) {
  if ((!endStack) && (startStack)) {
    console.log('true');
    return true;
  } else if (startStack[startStack.length - 1] > endStack[endStack.length - 1]) {
    console.log('true');
    return true;
  } else {
    return false;
  }

}

function checkForWin() {
  // Your code here

}

function towersOfHanoi(startStack, endStack) {
  /*
  if (startStack === 'a') {startStack = stacks.a;}
  else if (startStack === 'b') {startStack = stacks.b;}
  else if (startStack === 'c') {startStack = stacks.c;}

  if (endStack === 'a') {endStack = stacks.a;}
  else if (endStack === 'b') {endStack = stacks.b;}
  else if (endStack === 'c') {endStack = stacks.c;}
*/

  if (isLegal(startStack, endStack)) {
    movePiece();
    if (checkForWin()) {
      console.log("Winner!");
    } else {
      getPrompt();
    }
  } else {
    getPrompt();
  }
}

function getPrompt() {
  printStacks();
  rl.question('start stack: ', (startStack) => {
    rl.question('end stack: ', (endStack) => {
      towersOfHanoi(startStack, endStack);
      getPrompt();
    });
  });
}

// Tests

if (typeof describe === 'function') {

  describe('#towersOfHanoi()', () => {
    it('should be able to move a block', () => {
      towersOfHanoi('a', 'b');
      assert.deepEqual(stacks, { a: [4, 3, 2], b: [1], c: [] });
    });
  });

  describe('#isLegal()', () => {
    it('should not allow an illegal move', () => {
      stacks = {
        a: [4, 3, 2],
        b: [1],
        c: []
      };
      assert.equal(isLegal('a', 'b'), false);
    });
    it('should allow a legal move', () => {
      stacks = {
        a: [4, 3, 2, 1],
        b: [],
        c: []
      };
      assert.equal(isLegal('a', 'c'), true);
    });
  });
  describe('#checkForWin()', () => {
    it('should detect a win', () => {
      stacks = { a: [], b: [4, 3, 2, 1], c: [] };
      assert.equal(checkForWin(), true);
      stacks = { a: [1], b: [4, 3, 2], c: [] };
      assert.equal(checkForWin(), false);
    });
  });
} else {

  getPrompt();

}
