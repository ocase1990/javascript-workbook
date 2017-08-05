function countWords (inputWords) {
  inputWords.reduce(function (countMap, word) {
    countMap[word] = ++countMap[word] || 1; // increment or initialize to 1
  }, {});
}

module.exports = countWords;
