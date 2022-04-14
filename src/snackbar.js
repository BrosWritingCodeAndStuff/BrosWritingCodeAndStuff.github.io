import React from "react";
import './snackbar.css';

class Snackbar extends React.Component {
    render() {
        return <div id={this.props.id} className='snackbar'>{this.props.message}</div>
    }
}

export default Snackbar;