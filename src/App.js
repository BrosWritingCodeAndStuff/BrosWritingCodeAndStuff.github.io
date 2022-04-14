import Square from './inputs/square';
import React from 'react';
import birds from './images.js';
import Bird from './bird';
import Keyboard from './inputs/keyboard';
import Watermark from './watermark';
import Snackbar from './snackbar';
import Overlay from './overlay';
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
      boxes[i].classList.remove('input-active');
    }

    if (guesses[guessNumber].length > 0) {
      boxes[guesses[guessNumber].length - 1].classList.add('input-active');
    }
  }
}

function KeyboardEnterCallback() {
  let guessObjs = document.getElementsByName(`guess-${guessNumber}`);
  let guessedWords = Array.from(guesses[guessNumber].split(' '));
  if (guessObjs.length > 0 && guesses[guessNumber].length === birdName.length & ([...new Set(birdWords)].filter(x => (new Set(guessedWords).has(x)))).length === guessedWords.length && !gameOver) {
    let guessNum = guessNumber;
    guessNumber++;
    gameOver = guesses[guessNum] === birdName || guessNumber > 5;
    if (gameOver) {
      document.getElementById(guesses[guessNum] === birdName ? 'ol-win' : 'ol-lose').style.display = 'block';
    }
    
    let boxes = guessObjs[0].querySelectorAll('.input-square, .input-space');    
    Array.from(boxes).map(box => {
      box.classList.remove('input-active');
    });
    if (boxes.length === guesses[guessNum].length) {
      let foundCharactersCount = uniqueCharacterCounts.map(() => { return 0; });
      [].forEach.call(boxes, function(element, i) {
        setTimeout(function(){ 
          if (!element.classList.contains('input-space')) {
            element.innerHTML = `<div>${guesses[guessNum][i]}</div>`;
            let kbKey = document.getElementById(`kb-${guesses[guessNum][i]}`);
            let index = uniqueCharacters.indexOf(birdName[i]);

            if (birdName[i] === guesses[guessNum][i] && foundCharactersCount[index] < uniqueCharacterCounts[index]) {
              foundCharactersCount[index]++;
              element.classList.add('rotate-correct');
              kbKey.classList.add('kb-correct');
            }
            else if (birdName.includes(guesses[guessNum][i]) && foundCharactersCount[index] < uniqueCharacterCounts[index]) {
              element.classList.add('rotate-misplaced');
              kbKey.classList.add('kb-misplaced');
            }
            else {
              element.classList.add('rotate-wrong');
              kbKey.classList.add('kb-wrong');
            }
          }
        },i*200);
      });
    }    
  }
  else if (guesses[guessNumber].length === birdName.length) {
    ToggleSnackbar('sb-error');
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

function ToggleSnackbar(id) {
  let sb = document.getElementById(id);

  if (sb) {
    sb.classList.add('show');

    setTimeout(function() {
      sb.classList.remove('show');
    }, 3000);
  }
}

function App() {
  GetRandomBird();

  if (birdName === '') {
    return (
      <div className='App'>
        <header className='App-header'>
          <h2 style={{lineHeight: '30px'}}>Looks like there are no more birds!</h2>
          <p style={{lineHeight: '20px'}}>Birdle was intended as a joke, and was only designed to run on 268 birds selected from the RSPB website.</p>
          <p style={{lineHeight: '20px'}}>If you want more info on birds you can visit them here: {<a href='https://www.rspb.org.uk/birds-and-wildlife/wildlife-guides/bird-a-z/'>RSBP</a>}</p>
          <p style={{lineHeight: '20px'}}>If you want to see more of our stuff head over to Github here: {<a href='https://github.com/BrosWritingCodeAndStuff/'>BrosWritingCodeAndStuff</a>}</p>
        </header>
        <footer style={{verticalAlign: 'baseline'}}>
          <Watermark />
        </footer>
      </div>
    )
  }
  else {
    let squares = [];
    for (let i = 0; i < birdName.length; i++) {
      squares.push(<Square character={birdName[i]} key={`squares-${i}-char-${birdName[i]}`} />);
    }

    let zoom = squares.length > 8 ? (100 - (birdName.length * 2.7)) : 100;

    return (
      <>
        <Overlay id='ol-win' gameWon={true}/>
        <Overlay id='ol-lose' gameWon={false} birdName={birdName}/>
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
          <Snackbar id='sb-error' key='error' message={'Not in bird list.'} />
          <footer className='App-footer'>
            <Keyboard 
              letterCallback={KeyboardLetterCallback}
              deleteCallback={KeyboardDeleteCallback}
              enterCallback={KeyboardEnterCallback}
            />
          </footer>
            <Watermark />
        </div>
      </>
    );
  }
}

export default App;
