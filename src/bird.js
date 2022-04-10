import React from 'react';
import './bird.css';

class Bird extends React.Component {
    render() { 
        return <img id='bird' src={this.props.image} alt='A bird' />
    }
}

export default Bird;