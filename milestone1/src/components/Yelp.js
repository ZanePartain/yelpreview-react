import React, { Component } from 'react';
import Filters from './Filters';

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
            <div style={{
                width: '500px', 
                height: '600px',
                backgroundColor: 'whitesmoke', 
                color: 'black',
            }}>
                <Filters />
            </div>
        );
    }

}

export default Yelp;