const numbers = [
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
		display: '.',
		operation: 'dot',
	},
	{
		display: '/',
		operation: 'divide',
	},
	{
		display: '*',
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

// numbers and operators have the same class of keypad input?
// no numbers and operator separate classes have the same style.

const numberBtns = numbers.map(number => (
	`<button data-name=${number.name} data-value=${number.value} class="keypad__button keypad__button--input">${number.value}</button>`
)).join('');

const operationBtns = operators.map(operator => (
	`<button data-name=${operator.operation} class="keypad__button keypad__button--operation">${operator.display}</button>`
)).join('');

const controlBtns = controls.map(control => (
	`<button data-name=${control.name} class="keypad__button keypad__button--control">${control.display}</button>`
)).join('');

keypad.innerHTML = numberBtns + operationBtns + controlBtns;


// Operator functions

function add(num1, num2) {
	return num1 + num2;
}

function subtract(num1, num2) {
	return num1 - num2;
}

function multiply(num1, num2) {
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

console.log(operate(add, 1, -9));