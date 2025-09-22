//Document objects
const numBtns = document.querySelectorAll(".num");
const output = document.getElementById("output");
const cle = document.getElementById("CE");
const arithOperators = document.querySelectorAll(".arith");
const operators = document.querySelectorAll(".op");
const equals = document.getElementById("equals");
const contextWindow = document.getElementById("context");

const ac = document.getElementById("accum");
const cur = document.getElementById("co");
const inpu = document.getElementById("inp");

//Display level
let inputDisplayNum = ""; //Under the hood presentation of the display so you can start a new number
let contextText = "";

//Calculation variables
let accum = null; //this is the saved A and will always be a float
let currentOperator = null; //this is what you need to do

//Arithmetic functions
function add(a, b) {
  return a + b;
}

function subtract(a, b) {
  return a - b;
}

function divide(a, b) {
  return a / b;
}

function multiply(a, b) {
  return a * b;
}

//Object of functions
const operations = {
  add,
  subtract,
  multiply,
  divide,
};

//Symbols for text context help
const operatorSymbols = {
  add: "+",
  subtract: "−",
  multiply: "×",
  divide: "÷",
  decimal: ".",
};

//"Reverse lookup" for keyboard detection, to keyboad pushes can map to arith. functions
const keySymbols = {
  "+": "add",
  "-": "subtract",
  "*": "multiply",
  "/": "divide",
  ".": "decimal",
};

//CORE CALCULATOR APP FUNCTIONALITY

//CE clear all
cle.addEventListener("click", () => {
  accum = null;
  currentOperator = null;
  output.textContent = "";
  inputDisplayNum = "";
  contextWindow.textContent = "";
  floatEntry = 0;
  list();
});

//Evalutes arithmetic
function evaluate() {
  let result = operations[currentOperator](
    accum,
    parseFloat(output.textContent)
  );
  accum = result;
  output.textContent = accum; //display the result
  currentOperator = null; //await new operator
  inputDisplayNum = "";
  contextWindow.textContent = "";
  list();
}

//Equals button behavior
equals.addEventListener("click", (event) => {
  evaluate();
  list();
});

//Number button behavior
numBtns.forEach((numBut) => {
  numBut.addEventListener("click", (event) => {
    if (
      (inputDisplayNum.includes(".") && event.target.id === "decimal") ||
      (accum == output.textContent && currentOperator === null) //Used loose equality to compare to numbers
    ) {
      //ignore multiple decimals
    } else {
      inputDisplayNum += event.target.textContent;
      output.textContent = inputDisplayNum;
      if (currentOperator != null && accum != null) {
        contextWindow.textContent =
          accum + " " + operatorSymbols[currentOperator];
      }
      list();
    }
  });
});

//Operator button behavior
operators.forEach((opBut) => {
  opBut.addEventListener("click", (event) => {
    //All clear new, expecting
    if (currentOperator === null && accum === null) {
      currentOperator = event.target.id; //and then wait for the number
      // inputDisplayNum = output.textContent;
      accum = parseFloat(inputDisplayNum) ? parseFloat(inputDisplayNum) : 0; //save the entry
      output.textContent = accum + " " + event.target.textContent;
      inputDisplayNum = ""; //reset the entry to next number input starts from nothing (new number)
      list();
      //Right after you hit equals, waiting for next
    } else if (accum != null && currentOperator === null) {
      //right after equals, if you hit a operator, just change it
      currentOperator = event.target.id;
      output.textContent = accum + " " + event.target.textContent;
      inputDisplayNum = "";
      list();
      //On sequential operator push
    } else if (accum != null && currentOperator != null) {
      evaluate(); //evaluate with current operator
      currentOperator = event.target.id; //preapre for next operator
      output.textContent = accum + " " + event.target.textContent;
      list();
    } else evaluate();
  });
});

//Keyboard inputs
document.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    event.preventDefault(); //This stops from pressing the focused mouse area button!!!
    equals.click();
  } else if (event.key === "Backspace") {
    if (accum == output.textContent && currentOperator === null) {
      //do nothing if the window is an output
    } else {
      let backone = output.textContent.slice(0, -1);
      output.textContent = backone;
      // inputDisplayNum = backone;
    }
  } else if (keySymbols[event.key] != undefined) {
    document.getElementById(keySymbols[event.key]).click();
  } else if (event.key === "Delete") {
    cle.click();
  } else {
    document.getElementById(event.key).click();
  }
});

//verify

// function list() {
//   ac.textContent = "accum: " + accum;
//   cur.textContent = "current operator: " + currentOperator;
//   inpu.textContent = "input num: " + inputDisplayNum;
// }
