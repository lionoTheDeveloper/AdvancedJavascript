//nested function scope

// let a = 10;
// function outer() {
//   let b = 20;
//   function inner() {
//     let c = 30;
//     console.log(a, b, c);
//   }
//   inner();
// }
// outer();

//closure
/*
 a closure is the combination of a function bundled together with references to its surrounding state.
 closures are created every time a function is created, at function creation time.

 in javascript, when we return a function from another function, we are effectively returning a combination 
 of the function definition along with the functions's scope. this would let the function definition
 have an associated persistent memory which could hold on to live data between executions. that combination
 of the function and its scope chain is what is called a closure in javascript.

*/
function outer() {
  let counter = 0;
  function inner() {
    counter++;
    console.log(counter);
  }
  return inner;
}
// const fn = outer();
// fn();
// fn();

//function currying

/* 
    currying is a process in functional programming in which we transform a function with multiple 
    arguments into a sequence of nested functions that take one argument at a time.

*/
function sum(a, b, c) {
  return a + b + c;
}
// console.log(sum(2, 3, 5));

function curry(fn) {
  return function (a) {
    return function (b) {
      return function (c) {
        return fn(a, b, c);
      };
    };
  };
}

const curriedSum = curry(sum);

// console.log(curriedSum(2)(3)(5));

const add2 = curriedSum(2);
const add3 = add2(3);
const add5 = add3(5);

// console.log(add5);

/* this
  the javascript this keyword which is used in a function, refer to the object it belongs to
  it makes functions reusable by letting you decide the object value
  this value is determined entirely by how a function is called
  order of precedence
    -new binding
    -explicit binding
    -implicit binding
    -default binding

*/

//implicit binding

const person = {
  name: "liono",
  sayMyName: function () {
    console.log(`My name is ${this.name}`);
  },
};

// person.sayMyName();

//explicit binding

function sayMyName() {
  console.log(`My name is ${this.name}`);
}

// sayMyName.call(person);

//new binding

function Person(name) {
  this.name = name;
}

const p1 = new Person("liono");
const p2 = new Person("tygra");

// console.log(p1.name,p2.name);

//default binding
globalThis.name = "cheetara";
// sayMyName();

/*prototype

*/

function Person(fName, lName) {
  this.firstName = fName;
  this.lastName = lName;
}

const person1 = new Person("Bruce", "Wayne");
const person2 = new Person("Peter", "Parker");

// person1.getFullName = function(){
//   return `${this.firstName} ${this.lastName}`
// }

// console.log(person1.getFullName());
// console.log(person2.getFullName());

Person.prototype.getFullName = function () {
  return `${this.firstName} ${this.lastName}`;
};

// console.log(person1.getFullName());
// console.log(person2.getFullName());

/*
 prototypal inheritance
*/

function SuperHero(fName, lName) {
  Person.call(this, fName, lName);
  this.isSuperHero = true;
}

SuperHero.prototype = Object.create(Person.prototype);

SuperHero.prototype.constructor = SuperHero;

SuperHero.prototype.fightCrime = function () {
  console.log("fighting crime");
};

const batman = new SuperHero("Bruce", "Wayne");

// console.log(batman.getFullName());
// batman.fightCrime();

/*
 
  class

*/
class ClassPerson {
  constructor(fName, lName) {
    this.firstName = fName;
    this.lastName = lName;
  }

  sayMyName() {
    return `${this.firstName} ${this.lastName}`;
  }
}

// const classPerson1 = new ClassPerson('Bruce', 'Wayne');

// console.log(classPerson1.sayMyName());

class ClassSuperHero extends ClassPerson {
  constructor(fName, lName) {
    super(fName, lName);
    this.isSuperHero = true;
  }

  fightCrime() {
    console.log("fighting crime");
  }
}

const classBatman = new ClassSuperHero("Bruce", "Wayne");
// console.log(classBatman.sayMyName());
// classBatman.fightCrime();

/*
  iterables and iterators 
  why
    1-difficulty in accessing the element
    2-difficult to manage iteration on the data for various types of data structures

  there was a need to iterate over various data structures in a new way that abstracts away the complexity of 
  accessing elements one by one and was at the same time uniform across the different data structures
*/

const str = "lionothedeveloper";

for (let i = 0; i < str.length; i++) {
  // console.log(str.charAt(i));
}

const arr = ["l", "i", "o", "n", "o"];

for (let i = 0; i < arr.length; i++) {
  // console.log(arr[i]);
}

//for..of loop

for (const char of str) {
  // console.log(char);
}

for (const item of arr) {
  // console.log(item);
}

/*
  ...iterables and iterators 
   
  an object which implements the iterable protocol is called iterable
  
  for an object to be an iterable it must implement a method at the key [Symbol.iterator]
  that method should not accept any argument and should return an object which conforms to the iterator protocol

  the iterator protocol decides whether an object is an iterator

  the object must have a next() method that returns an objects with two properties
    value:which gives the current element
    done:which is a boolean value indicating whether or not there are more elements that could be iterated upon

*/

const obj = {
  [Symbol.iterator]: function () {
    let step = 0;
    const iterator = {
      next: function () {
        step++;
        if (step === 1) {
          return { value: "hello", done: false };
        } else if (step === 2) {
          return { value: "friend", done: false };
        }

        return { value: undefined, done: true };
      },
    };
    return iterator;
  },
};

// for(step of obj){
//   console.log(step);
// }

// Generators another and easier way to implement iterator.

function* generatorFunction(){
  yield "Hello";
  yield "World";
  yield "Whats up!";
}

const generatorObj = generatorFunction();

for(const item of generatorObj){
  console.log(item);
}