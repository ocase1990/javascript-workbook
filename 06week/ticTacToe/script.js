'use strict';

document.addEventListener('DOMContentLoaded', () => {
  let toggle = true;
 var qSelect = document.querySelectorAll('[data-cell]'); // this adds the array for the data-cells to my shorthand variable
/*
 for (let j = 0; j < qSelect.length; j++) {
   qSelect[j] = qSelect[j].innerHTML;
 }
*/
  document.querySelectorAll('[data-cell]').forEach((div) => {
    div.addEventListener('click', (e) => {
      if (!e.target.innerHTML) {
        e.target.innerHTML = toggle ? 'X' : 'O';
        toggle = !toggle;
        checkWin();
      } else {
        alert('move taken');
      }
    });
  });
/* potentially adding the winning combo to an array and comparing it to see if winning
  var winningCombo = [[0, 1, 2], [3, 4, 5], [6, 7, 8],
   [0, 3, 6], [1, 4, 7], [2, 5, 8],
   [0, 4, 8], [2, 4, 6]];
   */
  function checkWin () {
    // diagonal win
    if (qSelect[4].innerHTML) {
      if (((qSelect[0].innerHTML + qSelect[4].innerHTML + qSelect[8].innerHTML) === 'XXX') || ((qSelect[0].innerHTML + qSelect[4].innerHTML + qSelect[8].innerHTML) === 'OOO')) {
        alert(qSelect[4].innerHTML + "'s wins!'");
      }
      if ((qSelect[2].innerHTML === qSelect[4].innerHTML) && (qSelect[4].innerHTML === qSelect[6].innerHTML)) {
        alert(qSelect[4].innerHTML + "'s wins!'");
      }
      debugger;
    }
    // horizontal win
    for (var i = 0; i < 9; i += 3) {
      if (qSelect[i].innerHTML) { // if there is an x or o in the square
        if (((qSelect[i].innerHTML === qSelect[i + 1].innerHTML) && (qSelect[i + 1].innerHTML === qSelect[i + 2].innerHTML)) || // this line is for horizontal win
        ((qSelect[i].innerHTML === qSelect[i + 3].innerHTML) && (qSelect[i + 3].innerHTML === qSelect[i + 6].innerHTML))) { // this line is for vertical win
          alert(qSelect[i].innerHTML + "'s wins!'");
        }
      }
    }


}

  document.querySelector('button').addEventListener('click', (e) => {
    document.querySelectorAll('[data-cell]').forEach((div) => {
      div.innerHTML = '';
    });
  });


});
