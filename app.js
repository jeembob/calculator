
const numBtns = document.querySelectorAll(".num");
const output = document.getElementById("output")
let currentInput = "";
let secondInput = "";
let currentOperator = "";

//Create input
numBtns.forEach((button) => {
  button.addEventListener("click", (event) => {
    currentInput += event.target.textContent;
    console.log(currentInput);
    output.textContent = currentInput;
  });
});

//Create input
numBtns.forEach((button) => {
  button.addEventListener("click", (event) => {
    currentInput += event.target.textContent;
    console.log(currentInput);
    output.textContent = currentInput;
  });
});



//create multifunctional press of operator
function getOperator(curr, second, oper) {

}



function add(a, b) {
  return a + b;
}

function subject(a, b) {
  return a - b;
}

function divide(a, b) {
  return a / b;
}

function multiply(a, b) {
  return a / b;
}
