import React, { Component } from 'react';
import BizRow from './BizRow';
import { connect } from 'react-redux';


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
        }
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
                                Address
                            </th>
                            <th>
                                City
                            </th>
                            <th>
                                State
                            </th>
                            <th>
                                Distance <br/> (miles)
                            </th>
                            <th>
                                Rating
                            </th>
                            <th>
                                Tips
                            </th>
                            <th>
                                Check-ins
                            </th>
                        </tr>
                        
                        {/** loop over all biz objects */}
                        {this.props.isLoading 
                            ? '...Loading'
                            : (this.props.biz.length == 0) 
                                ? 'No Businesses Found'
                                : this.props.biz.map((val, key) => {
                            /** iterate over all keys in biz object */
                            // console.log(val);
                            return(
                                <BizRow key={key} val={val} />
                            )
                        })}
                    </tbody>
                </table>
            </div>
        );
    }

}

const mapStateToProps = (state) => {
    return {
        biz: state.biz.biz,
    };
};

// We now have to connect our props to the component.
export default connect(mapStateToProps)(Table);