import './App.css';
import Bird from './bird';
import Square from './inputs/square';
import React from 'react';
import birds from './images.js';

function GetRandomBird() {
  return birds[Math.floor(Math.random() * birds.length)];
}

function rotateTheThing() {
	let boxes = document.querySelectorAll(".input-square");
  [].forEach.call(boxes, function(element, i) {
    setTimeout(function(){ 
    	if (element.classList.contains('correct')) { element.classList.add('rotate-correct')}
    	else if (element.classList.contains('misplaced')) { element.classList.add('rotate-misplaced')}
    	else { element.classList.add('rotate-wrong')}  
    },i*300);
})}

function App() {
  let squares = [];
  let bird = <img id='bird' src={GetRandomBird().image} alt='A bird' onClick={rotateTheThing}/>
  
  for (let i = 0; i < 6; i++) {
    squares.push(<Square key={`squares-${i}`}/>);
  }

  return (
    <div className="App">
      <header className="App-header">
        <h2>Birdle</h2>
        {bird}
        <div id='squares-container'>
          {squares}
        </div>
      </header>
    </div>
  );
}

export default App;
