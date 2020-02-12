import React, { Component } from 'react';

class Yelp extends Component{
    constructor(props){
        super(props);
        this.state = {
            color: "red",
        }
    }

    handleChangeColor = (e) => {
        e.preventDefault();
        this.setState({ color: "blue" });
        this.props.toggleBool(e);
    }

    render(){
        return(
            <div style={{width: '500px', height: '100px', backgroundColor: this.state.color, color: 'black'}}>
                <button onClick={this.handleChangeColor.bind(this)}>
                    Change Color
                </button>
                {JSON.stringify(this.props.isTrue)}
            </div>
        );
    }

}

export default Yelp;