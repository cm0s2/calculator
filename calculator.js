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

    // Sign button
    signBtn = document.querySelector('.sign');
    signBtn.addEventListener('click', sign);

    // Percentage button
    percentBtn = document.querySelector('.percent');
    percentBtn.addEventListener('click', percent);

    // Equals button
    equalsBtn = document.querySelector('.equals');
    equalsBtn.addEventListener('click', equals);

    // Decimal button
    decimalBtn = document.querySelector('.decimal');
    decimalBtn.addEventListener('click', addDecimal);

    
    // Keybinds
    const buttons = document.querySelectorAll('.operator, .operand, .decimal, .percent');
    buttons.forEach(btn => {
        const key = btn.innerText;
        Mousetrap.bind(key, function() {
            btn.click();
        });
        console.log(btn.innerText);
    })

    Mousetrap.bind(["del", "backspace"], backspace);
    Mousetrap.bind(['enter', '='], equals);
    Mousetrap.bind('esc', clear);
    Mousetrap.bind('c', sign);
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

function sign() {
    const value = displayValue * -1;
    updateDisplay(value);
}

function percent() {
    const value = displayValue / 100;
    updateDisplay(value);
}

function backspace() {
    let value = displayValue.slice(0, -1);
    if (value === '') value = '0';
    console.log('backspace was pressed');
    updateDisplay(value);
}

function addDecimal() {
    if (!displayValue.includes('.')) {
        let value = displayValue + '.';
        updateDisplay(value);
    }
}

function updateDisplay (value = '0') {
    displayValue = value;
    display = document.querySelector('#display');
    display.innerText = value;
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