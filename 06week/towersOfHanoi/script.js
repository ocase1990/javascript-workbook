'use strict';

document.addEventListener('DOMContentLoaded', () => {
  // Your code here
  let stack = document.querySelectorAll('[data-stack]');
  let block = document.querySelectorAll('[data-block]');
  let moved = {};
  document.querySelectorAll('[data-block]').forEach((block) => {
    block.addEventListener('click', (e) => {
      e.stopPropagation();
      console.log(moved.target);
      if (!moved.target) { // if target doesnt have a selected block then assign clicked block
        moved = { target: e.target, size: e.target.attributes[0].value, parent: e.target.parentNode };
        e.target.parentNode.removeChild(e.target);

      }

    });
  });

  document.querySelectorAll('[data-stack]').forEach((stack) => {
    stack.addEventListener('click', (e) => {
      let last = e.target.children[e.target.children.length - 1];
      let lastSize = last && parseInt(last.attributes[0].value, 10); // value return a string, this turns the value into a number

      if (!lastSize || lastSize > moved.size) {
        e.target.appendChild(moved.target);
        moved.target = 0; // makes target 0 to return falsey
        checkForWin();
      } else {
        moved.parent.appendChild(moved.target);
        moved.target = 0; // makes target 0 to return falsey
      }
    });
  });
  function checkForWin () {
    // win function looks at the stack children and if there are 4 in any stack alert for the win
    if ((stack[1].children.length === 4) || (stack[2].children.length === 4)) {
      alert("You've won!");
    }
  }
});
