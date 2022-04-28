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
          return fn(a,b,c);
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
  name : 'liono',
  sayMyName : function() {
    console.log(`My name is ${this.name}`)
  }
}

// person.sayMyName();


//explicit binding 

function sayMyName(){
    console.log(`My name is ${this.name}`);
}

// sayMyName.call(person);

//new binding

function Person(name){
  this.name = name;
}

const p1 = new Person('liono');
const p2 = new Person('tygra');

// console.log(p1.name,p2.name);

//default binding
globalThis.name = 'cheetara';
sayMyName();