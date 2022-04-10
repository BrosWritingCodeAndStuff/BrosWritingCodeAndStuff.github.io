import React from "react";
import Key from "./key";

class Keyboard extends React.Component {
    render() {
        return (
            <div className="keyboard">
                <div>
                    <Key key='q' callback={this.props.letterCallback} letter='q' />
                    <Key key='w' callback={this.props.letterCallback} letter='w' />
                    <Key key='e' callback={this.props.letterCallback} letter='e' />
                    <Key key='r' callback={this.props.letterCallback} letter='r' />
                    <Key key='t' callback={this.props.letterCallback} letter='t' />
                    <Key key='y' callback={this.props.letterCallback} letter='y' />
                    <Key key='u' callback={this.props.letterCallback} letter='u' />
                    <Key key='i' callback={this.props.letterCallback} letter='i' />
                    <Key key='o' callback={this.props.letterCallback} letter='o' />
                    <Key key='p' callback={this.props.letterCallback} letter='p' />
                </div>
                <div>
                    <Key key='a' callback={this.props.letterCallback} letter='a' />
                    <Key key='s' callback={this.props.letterCallback} letter='s' />
                    <Key key='d' callback={this.props.letterCallback} letter='d' />
                    <Key key='f' callback={this.props.letterCallback} letter='f' />
                    <Key key='g' callback={this.props.letterCallback} letter='g' />
                    <Key key='h' callback={this.props.letterCallback} letter='h' />
                    <Key key='j' callback={this.props.letterCallback} letter='j' />
                    <Key key='k' callback={this.props.letterCallback} letter='k' />
                    <Key key='l' callback={this.props.letterCallback} letter='l' />
                </div>
                <div>
                    <Key key='del' callback={this.props.deleteCallback} letter='DEL' isWide={true} />
                    <Key key='z' callback={this.props.letterCallback} letter='z' />
                    <Key key='x' callback={this.props.letterCallback} letter='x' />
                    <Key key='c' callback={this.props.letterCallback} letter='c' />
                    <Key key='v' callback={this.props.letterCallback} letter='v' />
                    <Key key='b' callback={this.props.letterCallback} letter='b' />
                    <Key key='n' callback={this.props.letterCallback} letter='n' />
                    <Key key='m' callback={this.props.letterCallback} letter='m' />
                    <Key key='enter' callback={this.props.enterCallback} letter='&#9166;' isWide={true} />
                </div>
                <div>
                    <Key key='space' callback={this.props.letterCallback} letter=' ' isUltra={true} />
                </div>
            </div>
        );
    }
}

export default Keyboard;