let displayValue = '0';
let operator = null;
let memory = null;

let newNumber = false;
let chainedOperators = false;
const DECIMAL_PLACES = 10000;

window.addEventListener('DOMContentLoaded', (event) => {

    // Initialize display
    updateDisplay();

    // Operand buttons (0-9)
    operandButtons = document.querySelectorAll('.operand')
    operandButtons.forEach(btn => { 
        btn.addEventListener('click', event => {
            let value;
            //console.log(displayValue);

            if (newNumber) {
                displayValue = '0';
                newNumber = false;
            }

            if (displayValue === '0') {
                value = event.target.value;
            }
            else {
                value = displayValue +  event.target.value;
            }
            updateDisplay(value);
        })
    });

    // Operator buttons (+ - * /)
    operandButtons = document.querySelectorAll('.operator')
    operandButtons.forEach(btn => { 
        btn.addEventListener('click', event => {

            if (chainedOperators) calculateSolution();
            chainedOperators = true;

            memory = displayValue;
            newNumber = true;
            
            switch (event.target.value) {
                case '+':
                    operator = add;
                    break;
                case '-':
                    operator = subtract;
                    break;
                case '*':
                    operator = multiply;
                    break;
                case '/':
                    operator = divide;
                    break;
            }
        })
    });

    // Clear button
    clearBtn = document.querySelector('.clear');
    clearBtn.addEventListener('click', clear);

    // Equals button
    equalsBtn = document.querySelector('.equals');
    equalsBtn.addEventListener('click', equals);

    // Decimal button
    decimalBtn = document.querySelector('.decimal');
    decimalBtn.addEventListener('click', addDecimal);
});

function calculateSolution() {
    console.log(`memory: ${memory} displayValue: ${displayValue}`)
    solution = operate(operator, Number(memory), Number(displayValue))
    memory = solution;
    solution = Math.round((solution + Number.EPSILON) * DECIMAL_PLACES) / DECIMAL_PLACES
    if (solution === Infinity) solution = 'SNARKY ERROR';
    updateDisplay(solution);
}

function equals() {
    if (!operator || newNumber) {
        updateDisplay('ERROR');
        return;
    }
    calculateSolution();
    chainedOperators = false;
}

function clear() {
    operator = null;
    memory = null;
    newNumber = false;
    chainedOperators = false;
    updateDisplay('0');
}

function backspace() {
    let value = displayValue.slice(0, -1);
    updateDisplay(value);
}

function addDecimal() {
    if (!displayValue.includes('.')) {
        let value = displayValue + '.';
        updateDisplay(value);
    }
}


function add (a, b) {
    return a + b;
}

function subtract (a, b) {
    return a - b;
}

function multiply (a, b) {
    return a * b;
}

function divide (a, b) {
    return a / b;
}

function operate (operator, a, b) {
    return operator(a, b);
}

function updateDisplay (value = '0') {
    displayValue = value;
    display = document.querySelector('#display');
    display.innerText = value;
}