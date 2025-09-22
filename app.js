//Document objects
const numBtns = document.querySelectorAll(".num");
const output = document.getElementById("output");
const cle = document.getElementById("CE");
const arithOperators = document.querySelectorAll(".arith");
const operators = document.querySelectorAll(".op");

//Display level
let inputDisplayNum = ""; //a holder to captur

//Under the hood level
let floatEntry = parseFloat(inputDisplayNum); //the actual scren reading as a number
let accum = null; //this is the saved A and will always be a float
let currentOperator = null; //this is what you need to do

//CE clears all memory
cle.addEventListener("click", () => {
  accum = null;
  currentOperator = null;
  output.textContent = "";
  inputDisplayNum = "";
  floatEntry = "";
});

//all of my functions
function add(a, b) {
  accum = a + b;
}

function subject(a, b) {
  accum = a - b;
}

function divide(a, b) {
  //handle if b is zero
  // if (b === 0) {
  //     inputDisplayNum = "Error"
  // }
  accum = a / b;
}

function multiply(a, b) {
  accum = a / b;
}

const operations = {
  add,
  subject,
  multiply,
  divide,
};

//Create inputDisplayNum mechanism
numBtns.forEach((numBut) => {
  numBut.addEventListener("click", (event) => {
    
    //On current entry, just do the regular thing
    if (currentOperator === null) {
      if (inputDisplayNum.includes(".") && event.target.id === "decimal") {
        //ignore second decimal by doing nothing
      } else {
        inputDisplayNum += event.target.textContent;
        output.textContent = inputDisplayNum;
        console.log(typeof inputDisplayNum);
      }
    } else { //if there is an operator selected, start a new one
      output.textContent = "";
    }
  });
});

operators.forEach((opBut) => {
  opBut.addEventListener("click", (event) => {
    currentOperator = event.target.id;
  });
});

// //An operator is pushed. It can either way for the second input, or show the result
// arithOperators.forEach((opBut) => {
//   opBut.addEventListener("click", (event) => {
//     //get the operator
//     currentOperator = event.target.id;

//     //display it
//     inputDisplayNum += event.target.textContent;
//     output.textContent = inputDisplayNum;

//     accum = operations[currentOperator](accum, floatEntry); //operate A/B, return result
//     inputDisplayNum = accum; //show the current
//   });
// });

//create multifunctional press of operator
function operate(curr, second, oper) {
  //cases null, 1
  //case2 something, something, operator
}
