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
    // Default calculator state is zero displayed by itself, this is replaced
    // by the first entered digit, after this digit, concatenate digits to
    // build numbers
    if (firstDigit) {
        operand = digit;
        firstDigit = false;
    } else {
        operand += digit;
    }
    // Update corrct operand
    if (!workingWithOp2) {
        op1 = operand;
    } else {
        op2 = operand;
    }
    digitDisplay.textContent = operand;
}

function calculateAndDisplayResult() {
    result = operate(+op1, operand, +op2);
    /* 
    2 cases at this point:
        1. The user wants to make a completely new calculation --> press any digit
                -firstDigit and workingWithOp2 flags are reset
                -pressing any digit clears this result
                -any new digits are saved into the cleared op1
        OR

        2. The user wants to use this result --> press any operator
                -this result is saved in op1
                -firstDigit and workingWithOp2 flags are reset BUT pressing 
                 any operator will set workingWithOp2 to true so that 
                 new input is saved into op2, with this result in op1
    */
    op1 = result;
    firstDigit = true;
    workingWithOp2 = false;
    digitDisplay.textContent = result;
}

let op1 = "0";
let operand = "+";
let op2 = "0";
let workingWithOp2 = false;
let firstDigit = true;

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
        firstDigit = true;
    });
});

const clear = document.getElementById("C");
clear.addEventListener('click', () => {
    op1 = "0";
    op2 = "0";
    operand = "+";
    workingWithOp2 = false;
    firstDigit = true;
    digitDisplay.textContent = "0";
});

const equals = document.getElementById("=");
equals.addEventListener(('click'), () => calculateAndDisplayResult());

const backspace = document.getElementById("B");

const switchSign = document.getElementById("+/-");
switchSign.addEventListener(('click'), () => console.log("testing"));

const dot = document.getElementById(".");


