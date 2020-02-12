import React, { Component, ReactDOM } from 'react';


class BizRow extends Component{
    constructor(props){
        super(props);
        this.state = {
            isSelected: false,
            biz: {}
        }
    }

    componentDidMount(){
        this.setState({biz: this.props.val});
    }

    handleUpdate(){
        this.setState({biz: this.props.val});

    }
    // fetch the indivdual business data based on the business ID.
    handleBizClickFetch = (e) => {
        if(this.state.biz["id"]){
            const url = 'http://localhost:3000/business_detail/' + this.props.val["id"];
    
            fetch(url, {
                method: "GET",
            })
            .then(response => {
                return response.json();
            })
            .then( myJSON => {
                console.log(myJSON);
            })
            .catch(err => {
                console.log(err);
            })
        }

    }

    render(){
        return(
            <tr className="data-row" onClick={this.handleBizClickFetch.bind(this)}>
                <td  title="name" className="td-data">
                    {this.props.val["name"]}
                </td>
                <td  title="state"className="td-data" >
                    {this.props.val["state"]}
                </td>
                <td title="city" className="td-data"  style={{paddingRight: '50px'}}>
                    {this.props.val["city"]}
                </td>
            </tr>
        )
    }

}

export default BizRow;