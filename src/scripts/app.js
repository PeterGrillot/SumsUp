// "use strict";

// import React from "react";
// import ReactDOM from "react-dom";
// import ReactApp from "./ReactApp.js";

// ReactDOM.render(
//     React.createElement(ReactApp),
//     document.getElementById("root")
// );
(function() {
	// Vars
	const inputDisplay = document.getElementById('js-inputDisplay');
	const outputDisplay = document.getElementById('js-outputDisplay');
	const savedDisplay = document.getElementById('js-savedDisplay');
	const buttonExecute = document.getElementById('js-execute');
	const buttonRemember = document.getElementById('js-remember');
	const buttonRecall = document.getElementById('js-recall');
	const buttonClear = document.getElementById('js-clear');
	const buttonAllClear = document.getElementById('js-allClear');
	const buttonNum = document.querySelectorAll('.button__num');
	const buttonOperant = document.querySelectorAll('.button__operant');
	let mem = '';

	//Functions
	const evaluate = function(fn) {
		return new Function('return ' + fn)();
	}
	const display = function(num) {
		inputDisplay.value = inputDisplay.value + num;
	}
	const remember = function() {
		mem = outputDisplay.innerHTML;
	}
	const recall = function() {
		inputDisplay.value = inputDisplay.value + mem;
	}
	const clear = function(){
		inputDisplay.value = '';
	}
	const allClear = function(){
		inputDisplay.value = '';
		savedDisplay.innerHTML = '';
	}
	const backspace = function() {
		inputDisplay.value = inputDisplay.value.slice(0, -1);
	}
	const execute = function() {
		if (inputDisplay.value !== '') {
			if (inputDisplay.value[0] === '*' ||
				inputDisplay.value[0] === '/' ||
				inputDisplay.value[0] === '+' ||
				inputDisplay.value[0] === '-') {
				outputDisplay.innerHTML = evaluate(outputDisplay.innerHTML + inputDisplay.value)
			} else {
				outputDisplay.innerHTML = evaluate(inputDisplay.value);
			}
			savedDisplay.innerHTML = `<li>${inputDisplay.value} = ${outputDisplay.innerHTML}</li>${savedDisplay.innerHTML}`;
			inputDisplay.value = '';
		}

	}

	for (let i = 0; i < buttonNum.length; i++) {
		buttonNum[i].addEventListener('click', function(event) {
			display(event.toElement.dataset.num)
		});
	}
	for (let i = 0; i < buttonOperant.length; i++) {
		buttonOperant[i].addEventListener('click', function(event) {
			display(event.toElement.dataset.operant)
		});
	}
	buttonExecute.addEventListener('click', function() {
		execute()
	});
	buttonRemember.addEventListener('click', function() {
		remember()
	});
	buttonRecall.addEventListener('click', function() {
		recall()
	});
	buttonClear.addEventListener('click', function() {
		clear()
	});
	buttonAllClear.addEventListener('click', function() {
		allClear()
	});
	var turnOnKeyboard = function(){
		document.addEventListener("keydown", function(evt){
			console.log(evt)
		});
		document.onkeypress = function(e) {
			// console.log(e.key)
			e = e || window.event;
			if (
				(e.which >= 46 && e.which <= 57) ||
				(e.which >= 96 && e.which <= 105) ||
				e.which == 43 ||
				e.which == 45 ||
				e.which == 42 ||
				e.which == 61) {
				display(e.key);
			}
			if (e.which == 13) {
				e.preventDefault;
				execute();
			}
			if (e.which == 44){
				backspace();
			}
		}
	}
	turnOnKeyboard();
	inputDisplay.addEventListener('blur', function(){
		turnOnKeyboard();
	})
	inputDisplay.addEventListener('focus', function(){
		document.onkeypress = function(e) {
			if (e.which == 13) {
				e.preventDefault;
				execute();
			}else{
				e.preventDefault;
			}
			
		}
	})
})();