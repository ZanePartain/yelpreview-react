import React, { Component } from 'react';
import { ListGroup, ListGroupItem } from 'reactstrap';
import axios from 'axios';
import BizRow from './BizRow';

class Table extends Component{
    constructor(props){
        super(props);
        this.state = {
            color: "red",
            data: []
        }
    }

    componentDidMount(){
        console.log(this.state.data)
        this.setState({ data: this.props.data })
    }

    handleChangeColor = (e) => {
        e.preventDefault();
        this.setState({ color: "blue" });
        this.props.toggleBool(e);
    }

    handleClickBiz = (e) => {
        console.log(e.target);
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
                        <tr style={{textAlign: 'left'}}>
                            <th>
                                Business Name
                            </th>
                            <th>
                                State
                            </th>
                            <th>
                                City
                            </th>
                        </tr>
                        
                        {/** loop over all biz objects */}
                        {this.props.data.map((val, key) => {
                            /** iterate over all keys in biz object */
                            // console.log(val);
                            return(
                                <BizRow  val={val} />
                               
                            )
                        })}
                </table>
            </div>
        );
    }

}

export default Table;