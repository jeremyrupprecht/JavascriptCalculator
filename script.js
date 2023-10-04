function add(a,b) {
    return a + b
}

function subtract(a,b) {
    return a - b
}

function multiply(a,b) {
    return a * b
}

function divide(a,b) {
    return a / b
}

function operate(op1, operand, op2) {
    switch(operand) {
        case "+":
            return add(op1, op2)
        case "-":
            return subtract(op1, op2)
        case "*":
            return multiply(op1, op2)
        case "/":
            return divide(op1, op2)
    }
}

function saveAndDisplayDigit(digit) {
    let operand = workingWithOp2 ? op2 : op1;
    // Default calculator state is zero displayed by itself, this is 
    // replaced by the first entered digit, then concatenate 
    // digits to build numbers
    if (+operand === 0) {
        operand = digit;
    } else {
        operand += digit;
    }
    // update corrct operand
    if (!workingWithOp2) {
        op1 = operand;
    } else {
        op2 = operand;
    }
    digitDisplay.textContent = operand;
    console.log(operand);
}

function calculateResult() {

}

let op1 = "0";
let operand = "+";
let op2 = "0";
let workingWithOp2 = false;

const digitDisplay = document.getElementById("digitDisplay");

let digitButtons = document.querySelectorAll(".digit");
digitButtons.forEach((button) => {
    button.addEventListener('click', () => saveAndDisplayDigit(button.id));
});

let operatorButtons = document.querySelectorAll(".operator");
operatorButtons.forEach((button) => {
    button.addEventListener('click', () => {
        operand = button.id;
        workingWithOp2 = true;
    });
});

const clear = document.getElementById("C");
clear.addEventListener('click', () => {
    op1 = "0";
    op2 = "0";
    operand = "+";
    digitDisplay.textContent = "0";
});

const equals = document.getElementById("=");
equals.addEventListener(('click'), () => calculateResult());

const backspace = document.getElementById("B");

const switchSign = document.getElementById("+/-");
switchSign.addEventListener(('click'), () => console.log("testing"));

const dot = document.getElementById(".");


