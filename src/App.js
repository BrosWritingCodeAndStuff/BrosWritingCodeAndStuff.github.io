import Square from './inputs/square';
import React from 'react';
import birds from './images.js';
import Bird from './bird';
import Keyboard from './inputs/keyboard';
import Watermark from './inputs/watermark';
import './App.css';

var bird = <Bird />;
var birdName = '';
var birdWords = []
var guessNumber = 0;
var guesses = ['','','','','',''];
var uniqueCharacters = [];
var uniqueCharacterCounts = [];
var gameOver = false;

function GetRandomBird() {
  return birds.forEach(b => {
      Array.from(b.dates).forEach(date => {
        if ((new Date(date)).getTime() === (new Date(new Date().toDateString())).getTime()){
          bird = <Bird image={b.image}/>;
          birdName = b.name;

          for (let i = 0; i < birdName.length; i++) {
            if (!uniqueCharacters.includes(birdName[i])) {
              uniqueCharacters.push(birdName[i]);
              uniqueCharacterCounts.push((birdName.split(birdName[i])).length - 1);
            }
          }

          birds.map(b => { 
            return b.name.split(' ').map(word => { 
              return word; 
            });
          }).forEach(array => {
            array.forEach(item => {
              if (!birdWords.includes(item)) {
                birdWords.push(item);
              }
            });
          });
        }
      });
  });
}

function RefreshGuess() {
  let guessObjs = document.getElementsByName(`guess-${guessNumber}`);
  if (guessObjs.length > 0 && !gameOver) {
    let boxes = guessObjs[0].querySelectorAll('.input-square, .input-space');
    for (let i = 0; i < boxes.length; i++) {
      boxes[i].innerHTML = guesses[guessNumber][i] || ' ';
    }
  }
}

function KeyboardEnterCallback() {
  let guessObjs = document.getElementsByName(`guess-${guessNumber}`);
  if (guessObjs.length > 0 && guesses[guessNumber].length === birdName.length && ([...new Set(birdWords)].filter(x => (new Set(Array.from(guesses[guessNumber].split(' '))).has(x)))) && !gameOver) {
    guessNumber++;
    let boxes = guessObjs[0].querySelectorAll('.input-square, .input-space');
    if (boxes.length === guesses[guessNumber - 1].length) {
      let foundCharactersCount = uniqueCharacterCounts.map(() => { return 0; });
      [].forEach.call(boxes, function(element, i) {
        setTimeout(function(){ 
          if (!element.classList.contains('input-space')) {
            element.innerHTML = `<div>${guesses[guessNumber - 1][i]}</div>`;
            let index = uniqueCharacters.indexOf(birdName[i]);

            if (birdName[i] === guesses[guessNumber - 1][i] && foundCharactersCount[index] < uniqueCharacterCounts[index]) {
              foundCharactersCount[index]++;
              gameOver = true;
              element.classList.add('rotate-correct');
            }
            else if (birdName.includes(guesses[guessNumber - 1][i]) && foundCharactersCount[index] < uniqueCharacterCounts[index]) {
              gameOver = false;
              element.classList.add('rotate-misplaced');
            }
            else {
              gameOver = false;
              element.classList.add('rotate-wrong');
            }
          }
        },i*200);
      });
    }    
  }
}

function KeyboardLetterCallback(letter) {
  if (guesses[guessNumber].length < birdName.length) {
    guesses[guessNumber] += letter;
    RefreshGuess();
  }
}

function KeyboardDeleteCallback() {
  if (guesses[guessNumber].length > 0) {
    let guessChars = Array.from(guesses[guessNumber]);
    guesses[guessNumber] = guessChars.slice(0, guessChars.length - 1).join('');
    RefreshGuess();
  }
}

function App() {
  GetRandomBird();

  if (birdName === '') {
    return (
      <div className='App'>
        <header className='App-header'>
          <h2>Looks like there are no more birds!</h2>
          <p>Birdle was intended as a joke, and was only designed to run on 268 birds selected from the RSPB website.</p>
          <p>If you want more info on birds you can visit them here: {<a href='https://www.rspb.org.uk/birds-and-wildlife/wildlife-guides/bird-a-z/'>RSBP</a>}</p>
          <p>If you want to see more of our stuff head over to Github here: {<a href='https://github.com/BrosWritingCodeAndStuff/'>BrosWritingCodeAndStuff</a>}</p>
        </header>
      </div>
    )
  }
  else {
    let squares = [];
    for (let i = 0; i < birdName.length; i++) {
      squares.push(<Square character={birdName[i]} key={`squares-${i}-char-${birdName[i]}`} />);
    }

    let zoom = squares.length > 8 ? (100 - (birdName.length * 2.4)) : 100;

    return (
      <div className='App'>
        <header className='App-header'>
          <h2>Birdle</h2>
        </header>
        <div className='App-body'>
          {bird}
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
        <footer className='App-footer'>
          <Keyboard 
            letterCallback={KeyboardLetterCallback}
            deleteCallback={KeyboardDeleteCallback}
            enterCallback={KeyboardEnterCallback}
          />
        </footer>
          <Watermark />
      </div>
    );
  }
}

export default App;
