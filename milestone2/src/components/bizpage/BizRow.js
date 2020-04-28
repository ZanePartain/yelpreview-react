import React, { Component } from 'react';
import ModalExample from './BizDetailModal';

function distance(lat1,lon1,lat2,lon2) {
	var R = 6371; // km (change this constant to get miles)
	var dLat = (lat2-lat1) * Math.PI / 180;
	var dLon = (lon2-lon1) * Math.PI / 180;
	var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
		Math.cos(lat1 * Math.PI / 180 ) * Math.cos(lat2 * Math.PI / 180 ) *
		Math.sin(dLon/2) * Math.sin(dLon/2);
	var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
	var d = R * c;
	if (d>1) return Math.round(d)+"km";
	else if (d<=1) return Math.round(d*1000)+"m";
	return d;
}

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
            const url = 'http://localhost:3000/business/detail/' + this.props.val["id"];
    
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

        //console.log(distance(this.props.biz["latitude"], this.props.biz["longitude"],1,2 ))
        return(
            <tr className="data-row" onClick={this.handleBizClickFetch.bind(this)}>
               <td  title="name" className="td-data">
                    {this.props.val["name"]}
                </td>
                <td title="address" className="td-data"  style={{paddingRight: '50px'}}>
                    {this.props.val["address"]}
                </td>
                <td title="city" className="td-data"  style={{paddingRight: '50px'}}>
                    {this.props.val["city"]}
                </td>
                <td title="state" className="td-data"  style={{paddingRight: '50px'}}>
                    {this.props.val["state"]}
                </td>
                <td title="distance" className="td-data"  style={{paddingRight: '50px'}}>
                    {this.props.val["distance"]}
                </td>
                <td title="rating" className="td-data"  style={{paddingRight: '50px'}}>
                    {this.props.val["stars"]}
                </td>
                <td title="tips" className="td-data"  style={{paddingRight: '50px'}}>
                    {this.props.val["num_tips"]}
                </td>
                <td title="checkins" className="td-data"  style={{paddingRight: '50px'}}>
                    {this.props.val["num_checkins"]}
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