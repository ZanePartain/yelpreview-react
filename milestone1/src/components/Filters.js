import React, { Component } from 'react';
// import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';

class Filters extends Component{
    constructor(props){
        super(props);
        this.state = {
            color: "red",
        }
    }

    handleChangeColor = (e) => {
        e.preventDefault();
        this.setState({ color: "blue" });
    }

    render(){
        return(
            <div style={{width: '500px', height: '100px', maxHeight: 'fit-content', backgroundColor: this.state.color, color: 'black', padding: '2px'}}>
                <div style={{width: '100%', height: '200px'}}>

                </div>
            </div>
        );
    }

}

export default Filters;