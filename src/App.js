import './App.css';
// import Bird from './bird';
import Square from './inputs/square';
import Space from './inputs/space';
import React from 'react';
import birds from './images.js';
import './bird.css';

var guessNumber = 0;

function GetRandomBird() {
  return birds[Math.floor(Math.random() * birds.length)];
}

function rotateTheThing() {
  let guesses = document.getElementsByName(`guess-${guessNumber}`);
  if (guesses.length > 0) {
    let boxes = guesses[0].getElementsByClassName("input-square");
    [].forEach.call(boxes, function(element, i) {
      setTimeout(function(){ 
        if (element.classList.contains('correct')) { element.classList.add('rotate-correct')}
        else if (element.classList.contains('misplaced')) { element.classList.add('rotate-misplaced')}
        else { element.classList.add('rotate-wrong')}  
      },i*300);
    });
    guessNumber++;
  }
}

function App() {
  let squares = [];
  let bird = GetRandomBird();
  let birdObj = <img id='bird' src={bird.image} alt='A bird' onClick={rotateTheThing}/>
  
  for (let i = 0; i < bird.name.length; i++) {
    if (bird.name[i] === ' ') {
      squares.push(<Space data-character={`${bird.name[i]}`} key={`spaces-${i}-char-${bird.name[i]}`}/>);
    }
    else {
      squares.push(<Square data-character={`${bird.name[i]}`} key={`squares-${i}-char-${bird.name[i]}`}/>);
    }
  }

  return (
    <div className="App">
      <header className="App-header">
        <h2>Birdle</h2>
        {birdObj}
        <view name={`guess-${0}`} style={{ display: 'flex', flexDirection: 'row', marginTop: '10px' }}>
          {squares}
        </view>
        <view name={`guess-${1}`} style={{ display: 'flex', flexDirection: 'row', padding: '0px' }}> 
          {squares}
        </view>
        <view name={`guess-${2}`} style={{ display: 'flex', flexDirection: 'row', padding: '0px' }}>
          {squares}
        </view>
        <view name={`guess-${3}`} style={{ display: 'flex', flexDirection: 'row', padding: '0px' }}>
          {squares}
        </view>
        <view name={`guess-${4}`} style={{ display: 'flex', flexDirection: 'row', padding: '0px' }}>
          {squares}
        </view>
        <view name={`guess-${5}`} style={{ display: 'flex', flexDirection: 'row', padding: '0px' }}>
          {squares}
        </view>
      </header>
    </div>
  );
}

export default App;
