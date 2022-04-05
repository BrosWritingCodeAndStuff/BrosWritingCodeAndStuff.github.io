import Square from './inputs/square';
import React from 'react';
import birds from './images.js';
import './bird.css';
import './App.css';

const bird = GetRandomBird();
var guessNumber = 0;
var guess = 'baltic duck';

function GetRandomBird() {
  //return birds[1];
  return birds[Math.floor(Math.random() * birds.length)];
}

function rotateTheThing() {
  let guesses = document.getElementsByName(`guess-${guessNumber}`);
  if (guesses.length > 0) {
    let boxes = guesses[0].querySelectorAll('.input-square, .input-space');
    if (boxes.length === guess.length) {
      [].forEach.call(boxes, function(element, i) {
        setTimeout(function(){ 
          if (!element.classList.contains('input-space')) {
            element.innerHTML = guess[i];

            if (bird.name[i] === guess[i]) {
              element.classList.add('rotate-correct');
            }
            else if (bird.name.includes(guess[i])) {
              element.classList.add('rotate-misplaced');
            }
            else {
              element.classList.add('rotate-wrong');
            }
          }
        },i*200);
      });
      guessNumber++;
    }    
  }
}

function App() {
  let squares = [];
  let birdObj = <img id='bird' src={bird.image} alt='A bird' onClick={rotateTheThing}/>
  
  for (let i = 0; i < bird.name.length; i++) {
    squares.push(new Square(bird.name[i], `${bird.name[i]}`, `squares-${i}-char-${bird.name[i]}`));
  }

  let zoom = squares.length > 8 ? (100 - (bird.name.length * 2.4)) : 100;
  return (
    <div className='App'>
      <header className='App-header'>
        <h2>Birdle</h2>
        {birdObj}
      </header>
      <div className='App-body'>
        <div name={`guess-${0}`} style={{ display: 'flex', flexDirection: 'row', marginTop: '10px', zoom: `${zoom}%` }}>
          {squares}
        </div>
        <div name={`guess-${1}`} style={{ display: 'flex', flexDirection: 'row', padding: '0px', zoom: `${zoom}%` }}> 
          {squares}
        </div>
        <div name={`guess-${2}`} style={{ display: 'flex', flexDirection: 'row', padding: '0px', zoom: `${zoom}%` }}>
          {squares}
        </div>
        <div name={`guess-${3}`} style={{ display: 'flex', flexDirection: 'row', padding: '0px', zoom: `${zoom}%` }}>
          {squares}
        </div>
        <div name={`guess-${4}`} style={{ display: 'flex', flexDirection: 'row', padding: '0px', zoom: `${zoom}%` }}>
          {squares}
        </div>
        <div name={`guess-${5}`} style={{ display: 'flex', flexDirection: 'row', padding: '0px', zoom: `${zoom}%` }}>
          {squares}
        </div>
      </div>
    </div>
  );
}

export default App;
