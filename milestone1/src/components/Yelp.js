import React, { Component } from 'react';
import Filters from './Filters';
import Table from './Table';
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';


class Yelp extends Component{
    constructor(props){
        super(props);
        this.state = {
            selectedState: 'AK',
            selectedCity: null,
            states: ['AK', 'AL', 'AR', 'AZ', 'CA', 'CO', 'CT', 'DE', 'FL', 'GA', 'HI', 'IA', 'ID', 'IL', 'IN', 'KS', 'KY', 'LA', 'MA', 'MD', 'ME', 'MI', 'MN', 'MO', 'MS', 'MT', 'NC', 'ND', 'NE', 'NH', 'NJ', 'NM', 'NV', 'NY', 'OH', 'OK', 'OR', 'PA', 'RI', 'SC', 'SD', 'TN', 'TX', 'UT', 'VA', 'VT', 'WA', 'WI', 'WV', 'WY'],
            cities: ['Redmond', 'Seattle', 'Olympia']
        }
    }

    handleSelect = (e) => {
        e.preventDefault();
        console.log(e.target.name);
        this.setState({ [e.target.name]: e.target.value });
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
                                {this.state.cities.map((item) => {
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
                                })}
                            </div>
                        </FormGroup>
                    </Form>
                </div>

                <Table />
            </div>
        );
    }

}

export default Yelp;