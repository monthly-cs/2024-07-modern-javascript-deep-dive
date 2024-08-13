function add(x, y) {
  return x + y;
}

let inst = new add(2, 8);

console.log(inst); //add {}

function createUser(name, role) {
  return { name, role };
}

inst = new createUser("jiu", "manager");
console.log(inst); //{ name: 'jiu', role: 'manager' }

////////////
// function Circle(radius) {
//   this.radius = radius;
//   this.getDiameter = function () {
//     return 2 * this.radius;
//   };
// }

// const circle = Circle(5);
// console.log("circle", circle); //TypeError

// console.log(radius);
// console.log(getDiameter());

// console.log(circle.getDiameter());
/////////////

function Circle(radius) {
  if (!new.target) {
    return new Circle(radius);
  }

  this.radius = radius;
  this.getDiameter = function () {
    return 2 * this.radius;
  };
}

const rec = Circle(5);
console.log(rec.getDiameter());

/////////////
function square(number) {
  return number * number;
}

console.dir(square);
console.log(Object.getOwnPropertyDescriptor(Object.prototype, "__proto__"));

////////////
function sum() {
  let res = 0;

  for (let index = 0; index < arguments.length; index++) {
    res += arguments[i];
  }
  return res;
}

console.log(sum()); //0
console.log(sum(1, 2)); //3
console.log(sum(1, 2, 3)); //6
