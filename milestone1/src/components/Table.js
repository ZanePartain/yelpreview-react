import React, { Component } from 'react';
import { ListGroup, ListGroupItem } from 'reactstrap';
import axios from 'axios';

class Table extends Component{
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
                width: '100%', 
                height: '325px',
                backgroundColor: 'green', 
                color: 'black',
                overflow: 'scroll',
            }}>
                 <ListGroup>
                    <ListGroupItem color="info">Cras justo odio</ListGroupItem>
                    <ListGroupItem color="info">Dapibus ac facilisis in</ListGroupItem>
                    <ListGroupItem color="info">Morbi leo risus</ListGroupItem>
                    <ListGroupItem color="info">Porta ac consectetur ac</ListGroupItem>
                </ListGroup>
            </div>
        );
    }

}

export default Table;