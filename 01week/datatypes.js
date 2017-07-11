'use strict'
//1
function getDate() {
  return new Date();
}
console.log(getDate());

//2
function convertToString(num) {
  return num.toString();
}
console.log(convertToString(7438483));

//3
function convertToNum(string) {
  return Number(string);
}
console.log(convertToNum('17'));

//4
function whatIs(type) {
  console.log(typeof type);
}
whatIs(true);
whatIs(5);
whatIs('word');

//5
function myAdd(first, second) {
  return first + second;
}
myAdd(65,75);

//6
function twoTrue (one, two) {
  if (one && two) {
    console.log('Both of these are true.')
  }
}
twoTrue(true,true);

//7
function oneOfTwoTrue (one, two) {
  if (one || two) {
    console.log('One of these are true.')
  }
}
oneOfTwoTrue(true, false);

//8
function bothFalse(one, two) {
  if (!one && !two) {
    console.log('Both of these are false.');
  }
}
bothFalse(false, false);
