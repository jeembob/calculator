//Document objects
const numBtns = document.querySelectorAll(".num");
const output = document.getElementById("output");
const cle = document.getElementById("CE");
const arithOperators = document.querySelectorAll(".arith");
const operators = document.querySelectorAll(".op");
const equals = document.getElementById("equals");

//Display level
let inputDisplayNum = ""; //a holder to captur

//Under the hood level
let accum = null; //this is the saved A and will always be a float
let currentOperator = null; //this is what you need to do

//CE clears all memory
cle.addEventListener("click", () => {
  console.log("pushed");
  accum = null;
  currentOperator = null;
  output.textContent = "";
  inputDisplayNum = "";
  floatEntry = 0;
});

//all of my functions
function add(a, b) {
  return a + b;
}

function subtract(a, b) {
  return a - b;
}

function divide(a, b) {
  //handle if b is zero
  // if (b === 0) {
  //     inputDisplayNum = "Error"
  // }
  return a / b;
}

function multiply(a, b) {
  return a * b;
}

const operations = {
  add,
  subtract,
  multiply,
  divide,
};

//Create inputDisplayNum mechanism
numBtns.forEach((numBut) => {
  numBut.addEventListener("click", (event) => {
    //On current entry, just do the regular thing

    if (inputDisplayNum.includes(".") && event.target.id === "decimal") {
      //ignore second decimal by doing nothing
    } else {
      inputDisplayNum += event.target.textContent;
      output.textContent = inputDisplayNum;
    }
  });
});

function evaluate() {
  let result = operations[currentOperator](
    accum,
    parseFloat(output.textContent)
  );
  accum = result;
  output.textContent = accum; //display the result
  currentOperator = null; //await new operator
  inputDisplayNum = "";
}

operators.forEach((opBut) => {
  opBut.addEventListener("click", (event) => {
    //All clear new, expecting
    if (currentOperator === null && accum === null) {
      currentOperator = event.target.id; //and then wait for the number
      console.log(output.textContent);
      accum = parseFloat(inputDisplayNum); //save the entry
      output.textContent = accum + " " + event.target.textContent;
      inputDisplayNum = ""; //reset the entry to next number input starts from nothing (new number)

      //Accum an accum but an operator, just change the operator
    } else if (accum != null && currentOperator === null) {
      //right after equals, if you hit a operator, just change it
      currentOperator = event.target.id;
      output.textContent = accum + " " + event.target.textContent;
      inputDisplayNum = "";
    } else if (accum != null && currentOperator != null) {
      evaluate(); //evaluate with current operator
      currentOperator = event.target.id; //preapre for next operator
    } else evaluate();
  });
});

equals.addEventListener("click", () => {
  evaluate();
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
