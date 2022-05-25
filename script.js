const numbers = [
	{
		value: '.',
		name: 'dot',
	},
	{
		value: 0,
		name: 'zero',
	},
	{
		value: 1,
		name: 'one',
	},
	{
		value: 2,
		name: 'two',
	},
	{
		value: 3,
		name: 'three',
	},
	{
		value: 4,
		name: 'four',
	},
	{
		value: 5,
		name: 'five',
	},
	{
		value: 6,
		name: 'six',
	},
	{
		value: 7,
		name: 'seven',
	},
	{
		value: 8,
		name: 'eight',
	},
	{
		value: 9,
		name: 'nine',
	}
];

const operators = [

	{
		display: '/',
		operation: 'divide',
	},
	{
		display: 'x',
		operation:  'mult',
	},
	{
		display: '-',
		operation: 'minus',
	},
	{
		display: '+',
		operation: 'plus',
	}
];

const controls = [
	{
		display: 'DEL',
		name: 'del',
	},
	{
		display: 'RESET',
		name: 'reset',
	},
	{
		display: '=',
		name: 'equal',
	}
];

const keypad = document.getElementById('keypad');
const screen = document.getElementById('screen');

// numbers and operators have the same class of keypad input?
// no numbers and operator separate classes have the same style.

let currentNumber = screen.innerText;
let equation = [];

numbers.forEach(number => {
	const numberBtn = document.createElement('button');
	numberBtn.classList.add('keypad__button', 'keypad__button--input');
	numberBtn.dataset.name = number.name;
	numberBtn.dataset.value = number.value;
	numberBtn.innerText = number.value;

	numberBtn.onclick = () => inputValues(event.target);


	keypad.append(numberBtn);
})

operators.forEach(operator => {
	const operatorBtn = document.createElement('button');
	operatorBtn.classList.add('keypad__button', 'keypad__button--operation');
	operatorBtn.dataset.name = operator.operation;
	operatorBtn.innerText = operator.display;

	operatorBtn.onclick = () => addOperator(event.target);

	keypad.append(operatorBtn);
})

controls.forEach(control => {
	const controlBtn = document.createElement('button');
	controlBtn.classList.add('keypad__button', 'keypad__button--control');
	controlBtn.dataset.name = control.name;
	controlBtn.innerText = control.display;
	controlBtn.id = control.name;

	keypad.append(controlBtn);
})

// The equal button
const equal = document.getElementById('equal');
equal.onclick = () => {
	// Check if everything is ready
	if (equation[0]) {
		solveEquation();
	}

}

// Reset button
const resetBtn = document.getElementById('reset');
resetBtn.onclick = reset;

// Delete button
const deleteBtn = document.getElementById('del');
deleteBtn.onclick = del;

// Operator functions

function plus(num1, num2) {
	return num1 + num2;
}

function minus(num1, num2) {
	return num1 - num2;
}

function mult(num1, num2) {
	return num1 * num2;
}

function divide(num1, num2) {
	if (num2 === 0) {
		return 'This is impossible';
	}
	return num1 / num2;
}

// Call an operation function along with two numbers
function operate(operation, num1, num2) {
	// make sure only call operate on two numbers
	if (typeof(num1) != 'number' || typeof(num2) != 'number') {
		return 'ERROR';
	}

	return operation(num1, num2);
}


function inputValues(input) {
	const digit = input.dataset.value;

	// check if the value is 0 first
	if (currentNumber === '0' && digit != '.') {
		// replace the 0 with the first digit
		currentNumber = digit;
	} else {
		// add the new digit at the end of current number

		// currentNumber += digit;
		// screen.innerText = new Intl.NumberFormat().format(currentNumber)
		// console.log(new Intl.NumberFormat().format(currentNumber));

		// set a max number of digits
		if (currentNumber.length <= 10) {
			currentNumber += digit;
		}
	}
	screen.innerText = currentNumber;

	if (currentNumber.includes('.')) {
		keypad.querySelector('[data-name=dot]').setAttribute('disabled', '');
	} else {
		keypad.querySelector('[data-name=dot').removeAttribute('disabled');
	}
}

function addOperator(operator) {
	const operation =  operator.dataset.name;

	// check if another operator was already added first
	if (equation[0]) {
		solveEquation();
	}

	equation[0] = window[operation];
	equation[1] = Number(currentNumber);
	currentNumber = '0';
}

function solveEquation() {
	equation[2] = Number(currentNumber);
	const solution = Math.round(operate(...equation) * 1000) / 1000;
	currentNumber = solution.toString();
	equation[1] = solution;
	equation.pop();
	equation[0] = null;
	screen.innerText = currentNumber;
}

function reset() {
	currentNumber = '0';
	equation = [];
	screen.innerText = currentNumber;
}

function del() {
	if (currentNumber != '0') {
		let newNumber = currentNumber.slice(0, -1)
		currentNumber = newNumber;
		if (!currentNumber.length) {
			currentNumber = '0';
		}
		screen.innerText = currentNumber;
	}
	console.log(currentNumber);
}