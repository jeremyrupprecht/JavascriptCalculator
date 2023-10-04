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
    // Digits replace zero displayed by itself, otherwise concatenate them 
    // to build numbers
    if (+op1 === 0) {
        op1 = digit;
    } else {
        op1 += digit;
    }
    digitDisplay.textContent = +op1;
    // put logic for putting a number into op2 here
    
}

let op1 = "0";
let operand = "+";
let op2 = "0";

const digitDisplay = document.getElementById("digitDisplay");

let digitButtons = document.querySelectorAll(".digit");
digitButtons.forEach((button) => {
    button.addEventListener('click', () => {
        saveAndDisplayDigit(button.id);
    });
});

let operatorButtons = document.querySelectorAll(".operator");
operatorButtons.forEach((button) => {
    button.addEventListener('click', () => {
        console.log(button);
    });
});

const clear = document.getElementById("C");
clear.addEventListener('click', () => {
    op1 = "0";
    op2 = "0";
    digitDisplay.textContent = "0";
});
const backspace = document.getElementById("B");
const switchSign = document.getElementById("+/-");
const dot = document.getElementById(".");
const equals = document.getElementById("=");



