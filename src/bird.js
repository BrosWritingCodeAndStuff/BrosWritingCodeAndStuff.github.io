import birds from './images.js';
import React from 'react';
import './bird.css';

function GetRandomBird() {
    return birds[Math.floor(Math.random() * birds.length)];
}

function rotateTheThing() {
	let boxes = document.querySelectorAll(".elem");
  [].forEach.call(boxes, function(element, i) {
    setTimeout(function(){ 
    	if (element.classList.contains('correct')) { element.classList.add('rotate-correct')}
    	if (element.classList.contains('wrong')) { element.classList.add('rotate-wrong')}
    	if (element.classList.contains('misplaced')) { element.classList.add('rotate-misplaced')}  
    },i*300);
})}

function Bird() {
    return (
        <img id='bird' src={GetRandomBird().image} alt='A bird' onClick={rotateTheThing()}/>
    );
}

export default Bird;