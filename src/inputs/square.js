import React from 'react';
import './square.css';

class Square extends React.Component {
    render() {
        return <div className={this.props.character === ' ' ? 'input-space' : ' input-square'}></div>
    }
}

export default Square;