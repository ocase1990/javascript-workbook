'use strict';
// car code
let cars = ['Ford', 'Chrystler', 'Toyota', 'Cheverolet'];
let moreCars = ['Dodge', 'Hummer', 'Mac', 'Honda'];
let totalCars = cars.concat(moreCars);
let stringOfCars = totalCars.join(',');
totalCars = stringOfCars.split(',');
let carsInReverse = totalCars.reverse();
// car code

// 1
for (let i = 0; i < carsInReverse.length; i++) {
  console.log(carsInReverse[i]);
}

// 2
let persons = {
  firstName: "Jane",
  lastName: "Doe",
  birthDate: "Jan 5, 1925",
  gender: "female"
};

for (var key in persons) {
  console.log(key);
  if (key === 'birthDate') {
    console.log(persons[key]);
  }
}

// 4
var k = 1;
while (k < 1001) {
  console.log(k);
  k++;
}

/*
// 5
A for loop is better than a while loop when you have a certain numbers of loops
to do.
While is better to do when you need something to loop until or while a condition is met.
For loops are more readable because you can easily determine how long they will run.
*/

// 6
/* for loop runs from a var created inside the parameter area.
a while loop runs until a condition is met
*/

// 7
/* do while loop always runs once.
while loop does not.
*/
