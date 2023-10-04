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

let expression = "";
let op1 = 1;
let operand = "+";
let op2 = 1;
//console.log(operate(op1, operand, op2));

const zero = document.getElementById("0");
const one = document.getElementById("1");
const two = document.getElementById("2");
const three = document.getElementById("3");
const four = document.getElementById("4");
const five = document.getElementById("5");
const six = document.getElementById("6");
const seven = document.getElementById("7");
const eight = document.getElementById("7");
const nine = document.getElementById("9");

const clear = document.getElementById("C");
const backspace = document.getElementById("B");
const switchSign = document.getElementById("+/-");

const addBtn = document.getElementById("+");
const subtractBtn = document.getElementById("-");
const multiplyBtn = document.getElementById("x");
const divideBtn = document.getElementById("/");


