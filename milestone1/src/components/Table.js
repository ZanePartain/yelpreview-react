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
                <table style={{width:'100%'}}>
                    <tr>
                        <th>
                            Business Name
                        </th>
                        <th>
                            state
                        </th>
                        <th>
                            city
                        </th>
                    </tr>
                    
                        {/** loop over all biz objects */}
                        {this.props.data.map((val, key) => {
                            /** iterate over all keys in biz object */
                            return(
                                <tr key={key}>
                                    <td>
                                        {val["name"]}
                                    </td>
                                    <td>
                                        {val["state"]}
                                    </td>
                                    <td>
                                        {val["city"]}
                                    </td>
                                </tr>
                            )
                        })}
                </table>
            </div>
        );
                // <ListGroup>
                //     {/** loop over all biz objects */}
                //     {this.props.data.map((val, key) => {
                //         /** iterate over all keys in biz object */
                //         Object.keys(val).map((key, index) => {
                //            return <ListGroupItem key={index} color="info">{key}</ListGroupItem>
                //         })
                //     })}
                // </ListGroup>
    }

}

export default Table;