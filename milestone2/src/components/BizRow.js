import React, { Component, ReactDOM } from 'react';
import ModalExample from './BizDetailModal';

class BizRow extends Component{
    constructor(props){
        super(props);
        this.state = {
            isSelected: false,
            biz: {},
            biz_count: {},
            modal: false,
        }
    }

    // fetch the indivdual business data based on the business ID.
    handleBizClickFetch = (e) => {
        if(this.props.val["id"]){
            const url = 'http://localhost:3000/business_detail/' + this.props.val["id"];
    
            fetch(url, {
                method: "GET",
            })
            .then(response => {
                return response.json();
            })
            .then( myJSON => {
                this.setState({biz_count: myJSON})
            })
            .catch(err => {
                console.log(err);
            })
        }

        this.setState({modal: true});
    }

    setModal(){
        this.setState({ modal: !this.state.modal })
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

                {/** Modal view for business detail */}
                {
                    this.state.modal 
                        ?  <ModalExample modal={this.state.modal} setModal={this.setModal.bind(this)} details={this.props.val} biz_count={this.state.biz_count}/> 
                        : ''
                }
            </tr>
        )
    }

}

export default BizRow;