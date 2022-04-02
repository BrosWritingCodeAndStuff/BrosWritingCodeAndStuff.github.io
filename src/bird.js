import birds from './images.js';
import React from 'react';
import './bird.css';

function GetRandomBird() {
    return birds[Math.floor(Math.random() * birds.length)];
}

function Bird() {
    return (
        <img id='bird' src={GetRandomBird().image} alt='A bird'/>
    );
}

export default Bird;