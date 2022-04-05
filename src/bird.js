import React from 'react';
import './bird.css';

class Bird {
    constructor(image, callback) {
        return <img id='bird' src={image} alt='A bird' onClick={callback}/>
    }    
}

export default Bird;