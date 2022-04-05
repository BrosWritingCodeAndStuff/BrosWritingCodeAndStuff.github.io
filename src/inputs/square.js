import React from 'react';
import './square.css';

class Square {
    constructor(character, data, key) {        
        this.class = character === ' ' ? 'input-space' : ' input-square';
        return <div className={this.class} data-character={`${data}`} key={`${key}`}></div>
    }
}

export default Square;