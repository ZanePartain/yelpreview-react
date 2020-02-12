import React, { Component } from 'react';
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';

class Filters extends Component{
    constructor(props){
        super(props);
        this.state = {
            color: "red",
            cities: ['redmond', 'seattle'],
            states: ['AK', 'AL', 'AR', 'AZ', 'CA', 'CO', 'CT', 'DE', 'FL', 'GA', 'HI', 'IA', 'ID', 'IL', 'IN', 'KS', 'KY', 'LA', 'MA', 'MD', 'ME', 'MI', 'MN', 'MO', 'MS', 'MT', 'NC', 'ND', 'NE', 'NH', 'NJ', 'NM', 'NV', 'NY', 'OH', 'OK', 'OR', 'PA', 'RI', 'SC', 'SD', 'TN', 'TX', 'UT', 'VA', 'VT', 'WA', 'WI', 'WV', 'WY'],
            selected: 'AZ',
        }
    }

    handleChangeColor = (e) => {
        e.preventDefault();
        console.log(e.target.value);
    }
    
    handleCitiesSelect = (e) => {
        console.log(e.target.id);
    }


    render(){
        return(
            <div style={{backgroundColor: 'blue', padding: 10}}>
                <Form>
                    <FormGroup>
                        <Label for="stateSelect">Select</Label>
                        <Input type="select" name="select" id="exampleSelect" onChange={this.handleChangeColor.bind(this)}>
                            {this.state.states.map((item, key) => {
                                return <option key={key} value={item} >{item}</option>
                            })}
                        </Input>
                      
                    </FormGroup>
                    <FormGroup>
                        <Label for="stateSelect">City</Label>
                        <div style={{height: '100px', width: '100%', overflow: 'scroll', backgroundColor:'lightgreen'}}>
                            {this.state.cities.map((item) => {
                                return (
                                    <div style={{
                                        height: '30px',
                                        width: '100%',
                                        backgroundColor: 'whitesmoke',
                                        border: '1px solid black',
                                        fontSize: '18px',
                                        textAlign: 'left',
                                    }} 
                                    id={item}
                                    onClick={this.handleCitiesSelect.bind(this)}
                                    >
                                        {item}
                                    </div>
                                )
                            })}
                        </div>
                    </FormGroup>
                </Form>
            </div>
        );
    }

}

export default Filters;