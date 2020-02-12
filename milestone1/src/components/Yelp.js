import React, { Component } from 'react';
import Filters from './Filters';
import Table from './Table';
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import axios from 'axios';


class Yelp extends Component{
    constructor(props){
        super(props);
        this.state = {
            selectedState: 'AK',
            selectedCity: null,
            states: ['AK', 'AL', 'AR', 'AZ', 'CA', 'CO', 'CT', 'DE', 'FL', 'GA', 'HI', 'IA', 'ID', 'IL', 'IN', 'KS', 'KY', 'LA', 'MA', 'MD', 'ME', 'MI', 'MN', 'MO', 'MS', 'MT', 'NC', 'ND', 'NE', 'NH', 'NJ', 'NM', 'NV', 'NY', 'OH', 'OK', 'OR', 'PA', 'RI', 'SC', 'SD', 'TN', 'TX', 'UT', 'VA', 'VT', 'WA', 'WI', 'WV', 'WY'],
            cities: {},
            bizQuery: [],
        }
    }


    handleSelect = (e) => {
        console.log(e.target.name);
        this.setState({ [e.target.name]: e.target.value }, () =>{
            this.handleAxiosRequest();
        });
    }

    handleAxiosRequest() {
        let url = 'http://localhost:3000/business';
        if (this.state.selectedCity !== null)
        {
            url += '?state=' + this.state.selectedState + '&city=' + this.state.selectedCity;
        }
        else 
        {
            url += '?state=' + this.state.selectedState;
        }

        fetch(url, {
            method: "GET",
        })
        .then(response => {
            return response.json();
        })
        .then( myJSON => {
            this.setState({bizQuery: [...myJSON]}, () => {
                var citiesArray = {}
                for (let i = 0; i < this.state.bizQuery.length; i++){
                    Object.keys(this.state.bizQuery[i]).forEach((key) => {
                        if (key === "city"){
                            citiesArray[this.state.bizQuery[i][key]] = i;
                        }
                    })
                }
                this.setState({cities: citiesArray});
            })
        })
        .catch(err => {
            console.log(err);
        })
    }
    

    render(){
        
        return(
            <div style={{
                width: '500px', 
                minHeight: 'fit-content',
                backgroundColor: 'whitesmoke', 
                color: 'black',
                padding: 5,
            }}>
                {JSON.stringify(this.state.selectedCity)}
                {JSON.stringify(this.state.selectedState)}
                {/* {JSON.stringify(this.state.bizQuery)} */}
                {JSON.stringify(this.state.cities)}


                <div style={{backgroundColor: 'blue', padding: 10}}>
                    <Form>
                        <FormGroup>
                            <Label for="stateSelect">Select</Label>
                            <Input type="select" name="selectedState" id="exampleSelect" onChange={this.handleSelect.bind(this)}>
                                {this.state.states.map((item, key) => {
                                    return <option key={key} value={item} id={item}>{item}</option>
                                })}
                            </Input>
                        
                        </FormGroup>
                        <FormGroup>
                            <Label for="stateSelect">City</Label>
                            <div style={{height: '100px', width: '100%', overflow: 'scroll', backgroundColor:'lightgreen'}}>
                                {/* {this.state.cities.map((item) => {
                                    return (
                                        <button style={{
                                            height: '30px',
                                            width: '100%',
                                            backgroundColor: 'whitesmoke',
                                            border: '1px solid black',
                                            fontSize: '18px',
                                            textAlign: 'left',
                                        }}
                                        name="selectedCity"
                                        value={item}
                                        onClick={this.handleSelect.bind(this)}
                                        >
                                            {item}
                                        </button>
                                    )
                                })} */}
                            </div>
                        </FormGroup>
                    </Form>
                </div>

                <Table data={this.state.bizQuery}/>
            </div>
        );
    }

}

export default Yelp;