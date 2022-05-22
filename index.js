function outer() {
    let counter = 0;
    function inner(){
        counter++;
        console.log(counter);
    }

   return inner
}

// const fn = outer();
// fn();
// fn();

function sum(a,b,c){
    return a + b + c;
}

function currySum(fn){

    return function(a){
        return function(b){
            return function(c){
                return fn(a,b,c);
            }
        }
    }
}

const curriedSum = currySum(sum);
// console.log(curriedSum(1)(3)(6));

const add1 = curriedSum(1);
const add3 = add1(3);
const add6 = add3(6);

// console.log(add6);


const person = {
    name:"walter white",
    sayMyName:function(){
        console.log(`my name is ${this.name}`);
    }
}

// person.sayMyName();

// function sayMyName(){
//     console.log(`my name is ${this.name}`);
// }

// sayMyName.call(person);

function Personn(name){
  this.name = name;
}

const p1 = new Personn("lara");
const p2 = new Personn("frost");

// console.log(p1.name,p2.name);

// NEID
globalThis.name = "lara";
function sayMyName(){
    console.log(`my name is ${this.name}`);
}

// sayMyName();

const arr1 = [1,2,3,4,5,6,7];

function getNewArr(arr){

    // const [,,...newArr , ,] = arr;XXXX
    const [,,...newArr] = arr;

    return newArr;
}

// console.log(getNewArr(arr1));


// function Person(fName,lName){
//     this.firstName = fName;
//     this.lastName = lName;
// }

// const person1 = new Person("Lara","Croft");
// const person2 = new Person("Frost","Fighter");

// // person1.getFullName = function(){
// //     return this.firstName +" "+ this.lastName;
// // }

// Person.prototype.getFullName = function(){
//     return this.firstName + ' ' + this.lastName;
// }

// console.log(person1.getFullName());
// console.log(person2.getFullName());

// function Person(fName,lName){
//     this.firstName = fName;
//     this.lastName = lName;
// }

// Person.prototype.getFullName = function (){
//     return `${this.firstName} ${this.lastName}`;
// }
// function SuperHero(fName,lName){

//     Person.call(this,fName,lName)
//     this.isSuperHero = true;    
// }
// SuperHero.prototype = Object.create(Person.prototype);

// SuperHero.prototype.fightCrime = function(){
//     console.log("fighting Crime");
//     return;
// }
// SuperHero.prototype.constructor = SuperHero;
// const batman = new SuperHero("Bruce","Wayne");

// // console.log(batman.getFullName());

// // console.log(batman.isSuperHero);
// console.log(batman.fightCrime());


class Person {

    constructor(fName,lName){
        this.firstName = fName;
        this.lastName = lName;
    }

    sayMyName(){
        return `${this.firstName} ${this.lastName}`;
    }
}

const classP1 = new Person("Bruce","Wayne");

// console.log(classP1.sayMyName());

class SuperHero extends Person {

    constructor(fName,lName){
        super(fName,lName);
        this.isSuperHero = true;
    }

    fightCrime(){
        console.log("fighting crime...")
    }
}

const batman = new SuperHero("Bruce","Wayne");

// console.log(batman.sayMyName());
// console.log(batman.isSuperHero);
// console.log(batman.fightCrime());

const obj = {
    [Symbol.iterator]:function(){
        let step = 0;
        const iterator = {
            next:function() {
                if(step === 0){
                    step++;
                    return {value:"hello",done:false}
                }
                else if(step === 1){
                    step++;
                    return {value:"world",done:false}
                }
                return {value:undefined,done:true}
            }
        };
        return iterator;
    }
}

for(const word of obj){
    console.log(word);
}