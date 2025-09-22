//Document objects
const numBtns = document.querySelectorAll(".num");
const output = document.getElementById("output");
const cle = document.getElementById("CE");
const arithOperators = document.querySelectorAll(".arith");
const operators = document.querySelectorAll(".op");
const equals = document.getElementById("equals");
const contextWindow = document.getElementById("context");

//Display level
let inputDisplayNum = ""; //a holder to captur

//Under the hood level
let accum = null; //this is the saved A and will always be a float
let currentOperator = null; //this is what you need to do
let contextText = "";

//CE clears all memory
cle.addEventListener("click", () => {
  console.log("pushed");
  accum = null;
  currentOperator = null;
  output.textContent = "";
  inputDisplayNum = "";
  contextWindow.textContent = "";
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

const operatorSymbols = {
  add: "+",
  subtract: "−",
  multiply: "×",
  divide: "÷",
  decimal: ".",
};

const keySymbols = {
  "+": "add",
  "-": "subtract",
  "*": "multiply",
  "/": "divide",
  ".": "decimal",
};

console.log(keySymbols["*"]);

//Hitting the equals button
equals.addEventListener("click", () => {
  evaluate();
});

//Keyboard Controls
document.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    event.preventDefault(); //This stops from pressing the focused mouse area button!!!
    equals.click();
  } else if (keySymbols[event.key] != undefined) {
    document.getElementById(keySymbols[event.key]).click();
  } else {
    document.getElementById(event.key).click();
  }
});

//Click input control
numBtns.forEach((numBut) => {
  numBut.addEventListener("click", (event) => {
    if (inputDisplayNum.includes(".") && event.target.id === "decimal") {
      //ignore multiple decimals
    } else {
      inputDisplayNum += event.target.textContent;
      output.textContent = inputDisplayNum;
      if (currentOperator != null && accum != null) {
        contextWindow.textContent =
          accum + " " + operatorSymbols[currentOperator];
      }
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
  contextWindow.textContent = "";
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

      //Right after you hit equals
    } else if (accum != null && currentOperator === null) {
      //right after equals, if you hit a operator, just change it
      currentOperator = event.target.id;
      output.textContent = accum + " " + event.target.textContent;
      inputDisplayNum = "";

      //On sequential operator push
    } else if (accum != null && currentOperator != null) {
      evaluate(); //evaluate with current operator
      currentOperator = event.target.id; //preapre for next operator
      output.textContent = accum + " " + event.target.textContent;
    } else evaluate();
  });
});
