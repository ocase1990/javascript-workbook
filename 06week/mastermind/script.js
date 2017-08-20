'use strict';

document.addEventListener('DOMContentLoaded', () => {
  // Your code here
  let stack = document.querySelectorAll('[data-stack]');
  let block = document.querySelectorAll('[data-block]');
  let moved = {};
  let currentColor;
  document.querySelectorAll('[data-block]').forEach((block) => {
    block.addEventListener('click', (e) => {
      e.stopPropagation();
      moved = { target: e.target, size: e.target.attributes[0].value, parent: e.target.parentNode };
      currentColor = moved.target.cloneNode(true);
    });
  });

  document.querySelectorAll('[data-stack]').forEach((stack) => {
    stack.addEventListener('click', (e) => {
      e.target.appendChild(currentColor);
    });
  });

  document.querySelector('button').addEventListener('click', (e) => {
    checkAnswer();
  });


  function checkAnswer() {

  }


});
