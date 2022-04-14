import React from "react";
import './overlay.css';

class Overlay extends React.Component {
    render() {
        let overlayText = 'You ' + (this.props.gameWon ? 'win' : 'lose') + '!';

        let correctAnswer = '';

        function toTitleCase(str) {
            return str.replace(
                /\w\S*/g,
                function(txt) {
                return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
                }
            );
        }

        if (!this.props.gameWon) {
            correctAnswer = <div className='ol-answer'>Bird: {toTitleCase(this.props.birdName)}</div>;
        }
        else {
            correctAnswer = <div className='ol-answer'>Come back tomorrow for another bird!</div>;
        }

        return <div id={this.props.id} className='overlay'>
            <div className="ol-bg">
                <div className="ol-text">{overlayText}</div>
                {correctAnswer}
            </div>            
        </div>      
    }
}

export default Overlay;