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
    operand = roundNumbersWithLongDecimals(operand);
    digitDisplay.textContent = operand;
}

function saveAndDisplayDot() {
    let operand = workingWithOp2 ? op2 : op1;
    if (!operand.includes(".")) {
        operand += ".";
    }
    if (!workingWithOp2) {
        op1 = operand;
    } else {
        op2 = operand;
    }
    operand = roundNumbersWithLongDecimals(operand);
    digitDisplay.textContent = operand;
}


function calculateAndDisplayResult() {
    if (operand === "/"  && op2 === "0") {
        divideByZero();
        return 
    }
    result = operate(+op1, operand, +op2);
    /* 2 cases at this point:
        1. The user wants to make a completely new calculation --> press any digit
                -firstDigit and workingWithOp2 flags are reset, meaning:
                    -Pressing any digit clears this result
                    -Any new digits are saved into the cleared op1
        OR
        2. The user wants to use this result --> press any operator
                -This result is saved in op1
                -firstDigit and workingWithOp2 flags are reset BUT pressing 
                 any operator will set workingWithOp2 back to true so that 
                 new input is saved into op2, with this result in op1 */
    op1 = result.toString();
    firstDigit = true;
    workingWithOp2 = false;
    result = roundNumbersWithLongDecimals(result);
    digitDisplay.textContent = result;
}

function changeOperator(operandToChangeTo) {
    operand = operandToChangeTo;
    workingWithOp2 = true;
    firstDigit = true;
}

function clearAllData() {
    op1 = "0";
    op2 = "0";
    operand = "+";
    workingWithOp2 = false;
    firstDigit = true;
    digitDisplay.textContent = "0";
}

function backSpaceDigit() {
    let operand = workingWithOp2 ? op2 : op1;
    if (operand.length > 1) {
        // Remove last/rightmost character from the string
        operand = operand.slice(0, -1);
    } else {
        // Not touching workingWithOp2 here, either operand can be
        // backspaced to 0 without affecting anything else
        operand = "0";
        firstDigit = true;
    }
    if (!workingWithOp2) {
        op1 = operand;
    } else {
        op2 = operand;
    }
    operand = roundNumbersWithLongDecimals(operand);
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
    operand = roundNumbersWithLongDecimals(operand);
    digitDisplay.textContent = operand;
}

function divideByZero() {
    op1 = "0";
    operand = "+";
    op2 = "0";
    firstDigit = true;
    workingWithOp2 = false;
    digitDisplay.textContent = "Can't Do That";
}

function roundNumbersWithLongDecimals(numberToRound) {
    if (numberToRound.toString().length > 10) {
        let roundedNumber = Number(numberToRound).toPrecision(9);
        let roundedString = roundedNumber.toString();
        const indexOfe = roundedString.indexOf("e");
        /* There are 2 cases, (case 1) either the string version of the number is 
        large or small enough to be written using e notation OR (case 2) the 
        number isn't large or small enough to be written using e notation
        and e won't be included in the string (which affects the slice 
        calculation) */
        if (indexOfe !== -1) {
            // Return the number without its four rightmost digits, that are 
            // not part of the e notation
            return roundedString.slice(0, indexOfe - 4) 
                   + roundedString.slice(indexOfe);
        } 
        return roundedString.slice(0, roundedString.length - 4);
    }
    return numberToRound
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
    button.addEventListener('click', () => changeOperator(button.id));
});

const clearBtn = document.getElementById("C");
clearBtn.addEventListener('click', () => clearAllData());

const equalsBtn = document.getElementById("=");
equalsBtn.addEventListener('click', () => calculateAndDisplayResult());

const backspaceBtn = document.getElementById("B");
backspaceBtn.addEventListener('click', () => backSpaceDigit());

const switchSignBtn = document.getElementById("+/-");
switchSignBtn.addEventListener('click', () => switchSign());

const dotBtn = document.getElementById(".");
dotBtn.addEventListener('click', () => saveAndDisplayDot()); 

document.addEventListener('keydown', (e) =>  {
    // isFinite checks for a finite number
    if (isFinite(e.key)) {
        saveAndDisplayDigit(e.key);
    } else {
        switch(e.key) {
            case "c":
            case "C":
                clearAllData();
                break;
            case "b":
            case "B":
                backSpaceDigit();
                break;
            case "s":
            case "S":
                switchSign();
                break;
            case"/":
                changeOperator("/");
                break;
            case "*":
            case "x":
            case "X":
                changeOperator("*");
                break;
            case "-":
                changeOperator("-");
                break;
            case "+":
                changeOperator("+");
                break;
            case "=":
            case "Enter":
                calculateAndDisplayResult();
                break;
            case ".":
                saveAndDisplayDot();
                break;
        }
    }
});