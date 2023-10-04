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
console.log(operate(op1, operand, op2));




