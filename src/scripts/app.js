"use strict"
import getChar from './char'

// Vars
const inputDisplay = document.getElementById('js-inputDisplay')
const outputDisplay = document.getElementById('js-outputDisplay')
const savedDisplay = document.getElementById('js-savedDisplay')
const buttonExecute = document.getElementById('js-execute')
const buttonRemember = document.getElementById('js-remember')
const buttonRecall = document.getElementById('js-recall')
const buttonClear = document.getElementById('js-clear')
const buttonAllClear = document.getElementById('js-allClear')
const buttonNum = document.querySelectorAll('.button__num')
const buttonOperant = document.querySelectorAll('.button__operant')
let mem = ''

//Functions
const evaluate = function(fn) {
	return new Function('return ' + fn)()
}
const display = function(num) {
	inputDisplay.value = inputDisplay.value + num
}
const remember = function() {
	mem = outputDisplay.innerHTML
}
const recall = function() {
	inputDisplay.value = inputDisplay.value + mem
}
const clear = function() {
	inputDisplay.value = ''
}
const allClear = function() {
	inputDisplay.value = ''
	savedDisplay.innerHTML = ''
}
const backspace = function() {
	inputDisplay.value = inputDisplay.value.slice(0, -1)
}
const execute = function() {
	if (inputDisplay.value !== '') {
		if (inputDisplay.value[0] === '*' ||
			inputDisplay.value[0] === '/' ||
			inputDisplay.value[0] === '+' ||
			inputDisplay.value[0] === '-') {
			outputDisplay.innerHTML = evaluate(outputDisplay.innerHTML + inputDisplay.value)
		} else {
			outputDisplay.innerHTML = evaluate(inputDisplay.value)
		}
		savedDisplay.innerHTML = `<li>${inputDisplay.value} = ${outputDisplay.innerHTML}</li>${savedDisplay.innerHTML}`
		inputDisplay.value = ''
	}

}

for (let i = 0; i < buttonNum.length; i++) {
	buttonNum[i].addEventListener('click', function(event) {
		display(event.toElement.dataset.num)
	})
}
for (let i = 0; i < buttonOperant.length; i++) {
	buttonOperant[i].addEventListener('click', function(event) {
		display(event.toElement.dataset.operant)
	})
}
buttonExecute.addEventListener('click', function() {
	execute()
})
buttonRemember.addEventListener('click', function() {
	remember()
})
buttonRecall.addEventListener('click', function() {
	recall()
})
buttonClear.addEventListener('click', function() {
	clear()
})
buttonAllClear.addEventListener('click', function() {
	allClear()
})
savedDisplay.addEventListener('click', function(evt) {
	this.select()
})
var turnOnKeyboard = function() {
	document.addEventListener("keydown", function(evt) {
		evt = evt || window.event
		let key = getChar(evt.shiftKey, evt.which)
		if (key) {
			display(key)
		}
		if (evt.which == 13) {
			evt.preventDefault
			execute()
		}
		if (evt.which == 8) {
			backspace()
		}
	})
}
turnOnKeyboard()
