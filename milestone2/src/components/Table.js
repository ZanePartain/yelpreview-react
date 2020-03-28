import React, { Component } from 'react';
import { ListGroup, ListGroupItem } from 'reactstrap';
import BizRow from './BizRow';


function isEmpty(obj) {
    for(var key in obj) {
        if(obj.hasOwnProperty(key))
            return false;
    }
    return true;
}

class Table extends Component{
    constructor(props){
        super(props);
        this.state = {
            color: "red",
            data: []
        }
    }

    componentDidMount(){
        this.setState({ data: this.props.data })
    }

    render(){
        return(
            
            <div style={{
                width: '100%', 
                height: 'auto',
                backgroundColor: 'eggshell',
                color: 'black',
                display: 'block',
                margin: 'auto',
            }}>
                
                <table style={{width:'100%', borderRadius: '100'}}>
                    <tbody>

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
                        {this.props.isLoading 
                            ? '...Loading'
                            : (this.props.data.length == 0) 
                                ? 'No Businesses Found'
                                : this.props.data.map((val, key) => {
                            /** iterate over all keys in biz object */
                            // console.log(val);
                            return(
                                <BizRow keu={key} val={val} />
                            )
                        })}
                    </tbody>
                </table>
            </div>
        );
    }

}

export default Table;