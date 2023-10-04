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
                -firstDigit and workingWithOp2 flags are reset, meaning:
                -pressing any digit clears this result
                -any new digits are saved into the cleared op1
        OR

        2. The user wants to use this result --> press any operator
                -this result is saved in op1
                -firstDigit and workingWithOp2 flags are reset BUT pressing 
                 any operator will set workingWithOp2 back to true so that 
                 new input is saved into op2, with this result in op1
    */
    op1 = result.toString();
    firstDigit = true;
    workingWithOp2 = false;
    digitDisplay.textContent = result;
}

function backSpaceDigit() {
    let operand = workingWithOp2 ? op2 : op1;
    if (operand.length > 1) {
        // remove last/rightmost character from the string
        operand = operand.slice(0, -1);
        console.log("SLICE: " + operand);
    } else {
        // Note: not touching workingWithOp2 here, either operand can be
        // backspaced to 0 without affecting anything else
        operand = "0";
        firstDigit = true;
    }
    if (!workingWithOp2) {
        op1 = operand;
    } else {
        op2 = operand;
    }
    digitDisplay.textContent = operand;
}

function switchSign() {
    let operand = workingWithOp2 ? op2 : op1;
    operand *= -1;
    if (!workingWithOp2) {
        op1 = operand;
    } else {
        op2 = operand;
    }
    digitDisplay.textContent = operand;
}

let op1 = "0";
let operand = "+";
let op2 = "0";
let workingWithOp2 = false;
let firstDigit = true;

const digitDisplay = document.getElementById("digitDisplay");

let digitBtns = document.querySelectorAll(".digit");
digitBtns.forEach((button) => {
    button.addEventListener('click', () => saveAndDisplayDigit(button.id));
});

let operatorBtns = document.querySelectorAll(".operator");
operatorBtns.forEach((button) => {
    button.addEventListener('click', () => {
        operand = button.id;
        workingWithOp2 = true;
        firstDigit = true;
    });
});

const clearBtn = document.getElementById("C");
clearBtn.addEventListener('click', () => {
    op1 = "0";
    op2 = "0";
    operand = "+";
    workingWithOp2 = false;
    firstDigit = true;
    digitDisplay.textContent = "0";
});

const equalsBtn = document.getElementById("=");
equalsBtn.addEventListener(('click'), () => calculateAndDisplayResult());

const backspaceBtn = document.getElementById("B");
backspaceBtn.addEventListener(('click'), () => backSpaceDigit());

const switchSignBtn = document.getElementById("+/-");
switchSignBtn.addEventListener(('click'), () => switchSign());

const dotBtn = document.getElementById(".");



