'use strict';

const assert = require('assert');
const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function pigLatin (word) {
  word = word.toLowerCase().trim();
  var vowels = ['a', 'e', 'i', 'o', 'u'];
  var vowelNum = word.length;
  var first;
  var last;
  for (var i = 0; i < vowels.length; i++) {
    if (word.indexOf(vowels[i]) > -1) {
      if (word.indexOf(vowels[i]) < vowelNum) {
        vowelNum = word.indexOf(vowels[i]);
      } // findest closet number of vowel
    } // finds if the vowel exists in the word
  }
  if (vowelNum !== 0) {
    first = word.slice(vowelNum, word.length);
    last = word.slice(0, vowelNum);
    return (first + last) + 'ay';
  } else {
    return word + 'yay';
  }
}

/*
function pigLatin (word) {

var vowels = ['a', 'e', 'i', 'o', 'u'];

  word = word.toLowerCase().trim();
  let finalWord = word;
  for (var i = 0; i < word.length; i++) {
    if (checkVowel(word[i])) {
      // starts with vowel if statement
      if (i === 0) {
        finalWord = finalWord + 'yay';
      } else {
        finalWord = finalWord + 'ay';
      }
      return finalWord;
    } else {
      finalWord = finalWord.substring(1);
      finalWord += word[i];
    }
  }
}

function checkVowel (letter) {
  if ((letter === 'a') || (letter === 'e') || (letter === 'i') || (letter === 'o') || (letter === 'u')) {
    return true;
  } else {
    return false;
  }
}
*/
function getPrompt () {
  rl.question('word ', (answer) => {
    console.log(pigLatin(answer));
    getPrompt();
  });
}

// Tests

if (typeof describe === 'function') {
  describe('#pigLatin()', () => {
    it('should translate a simple word', () => {
      assert.equal(pigLatin('car'), 'arcay');
      assert.equal(pigLatin('dog'), 'ogday');
    });
    it('should translate a complex word', () => {
      assert.equal(pigLatin('create'), 'eatecray');
      assert.equal(pigLatin('valley'), 'alleyvay');
    });
    it('should attach "yay" if word begins with vowel', () => {
      assert.equal(pigLatin('egg'), 'eggyay');
      assert.equal(pigLatin('emission'), 'emissionyay');
    });
    it('should lowercase and trim word before translation', () => {
      assert.equal(pigLatin('HeLlO '), 'ellohay');
      assert.equal(pigLatin(' RoCkEt'), 'ocketray');
    });
  });
} else {

  getPrompt();

}
