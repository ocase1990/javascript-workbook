'use strict';

// 1
let cars = ['Ford', 'Chrystler', 'Toyota', 'Cheverolet'];
console.log(cars.length);

// 2
let moreCars = ['Dodge', 'Hummer', 'Mac', 'Honda'];
let totalCars = cars.concat(moreCars);
console.log(totalCars);

// 3
console.log(moreCars.indexOf('Honda'));
console.log(cars.lastIndexOf('Ford'));

// 4
let stringOfCars = totalCars.join(',');
console.log(stringOfCars);

// 5
totalCars = stringOfCars.split(',');
console.log(totalCars);

// 6
let carsInReverse = totalCars.reverse();
console.log(carsInReverse);

// 7
carsInReverse.sort();
// alert(carsInReverse.indexOf('Cheverolet'));
console.log(carsInReverse);

// 8
let removedCars = carsInReverse.slice(3, 5);
console.log(removedCars);

// 9
carsInReverse.splice(1, 2, removedCars);
console.log(carsInReverse);

// 10
carsInReverse.push('Chrystler', 'Dodge');
console.log(carsInReverse);

// 11
console.log(carsInReverse.pop());

// 12
console.log(carsInReverse.shift());

// 13
carsInReverse.unshift('Jeep');
console.log(carsInReverse);

// 14
let numbers = [23, 45, 0, 2];
numbers.forEach(function (element) {
  console.log(element + 2);
});
