import React from "react";
import './keyboard.css';

class Key extends React.Component {
    constructor(props) {
        super(props);
        this.callback = this.callback.bind(this);
    }

    callback(e) {
        this.props.callback(e.target.innerHTML);
    }

    render() {
        return <button className={this.props.isWide ? 'wide-key' : this.props.isUltra ? 'ultra-thicc' : 'key'} onClick={this.callback}>{this.props.letter}</button>
    }
}

export default Key;