let displayElement = document.getElementById('display');
let historyElement = document.getElementById('history');
let historyListElement = document.getElementById('historyList');
let currentInput = '';
let history = [];

const operators = {
    '+': { precedence: 1, associativity: 'left', operation: (a, b) => a + b },
    '-': { precedence: 1, associativity: 'left', operation: (a, b) => a - b },
    '*': { precedence: 2, associativity: 'left', operation: (a, b) => a * b },
    '/': { precedence: 2, associativity: 'left', operation: (a, b) => a / b }
};

function appendNumber(number) {
    currentInput += number;
    displayElement.textContent = currentInput;
}

function appendOperator(operator) {
    if (currentInput === '' || /[\+\-\*\/]$/.test(currentInput)) {
        return;
    }
    currentInput += operator;
    displayElement.textContent = currentInput;
}

function clearDisplay() {
    currentInput = '';
    displayElement.textContent = '';
}

function deleteLast() {
    currentInput = currentInput.slice(0, -1);
    displayElement.textContent = currentInput;
}

function infixToPostfix(infix) {
    const output = [];
    const operatorStack = [];
    const tokens = infix.match(/(\d+\.?\d*|\+|\-|\*|\/)/g);
    tokens.forEach(token => {
        if (!isNaN(token)) {
            output.push(parseFloat(token));
        } else {
            while (operatorStack.length && operators[operatorStack[operatorStack.length - 1]].precedence >= operators[token].precedence) {
                output.push(operatorStack.pop());
            }
            operatorStack.push(token);
        }
    });
    while (operatorStack.length) {
        output.push(operatorStack.pop());
    }
    return output;
}

function evaluatePostfix(postfix) {
    const stack = [];
    postfix.forEach(token => {
        if (!isNaN(token)) {
            stack.push(token);
        } else {
            const b = stack.pop();
            const a = stack.pop();
            stack.push(operators[token].operation(a, b));
        }
    });
    return stack[0];
}

function calculate() {
    try {
        const postfix = infixToPostfix(currentInput);
        const result = evaluatePostfix(postfix);
        if (isFinite(result)) {
            displayElement.textContent = result;
            history.push(currentInput + '=' + result);
            updateHistory();
            currentInput = result.toString();
        } else {
            throw new Error('Invalid result');
        }
    } catch (e) {
        displayElement.textContent = 'Error';
        currentInput = '';
    }
}

function updateHistory() {
    historyListElement.innerHTML = '';
    history.forEach(entry => {
        let li = document.createElement('li');
        li.textContent = entry;
        historyListElement.appendChild(li);
    });
}

function toggleHistory() {
    if (historyElement.style.display === 'none') {
        historyElement.style.display = 'block';
    } else {
        historyElement.style.display = 'none';
    }
}
