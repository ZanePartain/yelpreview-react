import React, { Component } from "react";
import Filters from "./Filters";
import Table from "./Table";
import { Button, Form, FormGroup, Label, Input, FormText, Container, Row, Col } from "reactstrap";
import axios from "axios";

function isEmpty(obj) {
    for(var key in obj) {
        if(obj.hasOwnProperty(key))
            return false;
    }
    return true;
}

const url = "http://localhost:3000/business";

class Yelp extends Component{
    constructor(props){
        super(props);
        this.state = {
            selectedState: [],
            selectedCity: null,
            selectedPostalCode: null,
            states: [],
            city: [],
            postalCodes: [],
            bizQuery: [],
            isLoading: false,
        }
    }

    componentDidMount(){
        this.fetchBusinessStates();
    }

    fetchBusinessStates(){
        fetch(url + '/states',{
            method: "GET",
        })
        .then(resp =>{
            return resp.json();
        })
        .then( myJSON => {
            for (let i = 0; i < myJSON.length; i++){
                this.setState({states: [...this.state.states, myJSON[i]["state"]]});
            }
        })
        .catch( err => {
            console.log(err);
        })

    }

    handleSelectPostalCode = (e) =>{
        e.preventDefault();
        this.setState({ selectedPostalCode: e.target.value });
    }

    handleSelectCityCode = (e) => {
        e.preventDefault();
        this.setState({ 
            selectedCity: e.target.value,
            postalCodes: [],
            selectedPostalCode: null,
        }, () =>{
            this.handlePostalCodeFetchReq();
        });
    }

    handleStateSelect = (e) => {
        e.preventDefault();
        // new state was selected so repopulate the available cities
        let states = []
        for (let i = 0; i < e.target.selectedOptions.length; i++){
            states.push(e.target.selectedOptions[i]["value"]);
        }

        // set state and fetchthe cities of the given states
        this.setState({
            selectedState: states,
            selectedCity: null, 
            postalCodes: [],  // reset postal codes
            selectedPostalCode: null,  // reset select code
        }, () => {
            this.handleCityFetchReq();
        });
    }

    handlePostalCodeFetchReq(){
        if (this.state.selectedCity !== null){
            let newUrl = url
            newUrl += "/" + this.state.selectedCity;
    
            fetch(newUrl, {
                method: "GET",
            })
            .then( resp => {
                return resp.json();
            })
            .then( myJSON => {
                console.log(myJSON);
                let p_codes = []
                for (let i = 0; i < myJSON.length; i++){
                    p_codes.push(myJSON[i]["postal_code"]);
                }

                this.setState({postalCodes: p_codes});
            })
            .catch(err =>{
                console.log(err);
            })
        }
    }

    handleBusinessFetchReq() {
        this.setState({ isLoading: true });
        if (this.state.selectedCity !== null)
        {
            url += "?state=" + this.state.selectedState + "&city=" + this.state.selectedCity;
        }
    }

    handleCityFetchReq() {
        this.setState({ isLoading: true });

        console.log({"selected states": this.state.selectedState});

        fetch(url, {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({"states": this.state.selectedState})
        })
        .then(response => {
            return response.json();
        })
        .then( myJSON => {
            // unpack the cities, and set that city state
            let cities = []
            for (let i = 0; i < myJSON.length; i++){
                cities.push(myJSON[i]["city"]);
            }

            this.setState({ 
                city: cities,
                isLoading: false
             });
        })
        .catch(err => {
            console.log(err);
        })
    }
    
    handleSearchBusiness = (e) =>{
        e.preventDefault();
        if (this.state.postalCodes.length == 1){
            this.setState({selectedPostalCode: this.state.postalCodes[0]}, ()=>{
                console.log(this.state.selectedPostalCode);
                // TODO handle fetch for business in the area.
            })
        }
    }

    render(){
        return(
            <div>
                <Container>
                    <Row>
                        <Form>
                            {/** STATE MULTI-SELECT */}
                            <FormGroup style={{display: 'inline-block', margin: 20, marginTop: 0, width: 200}}>
                                <Label for="selectMultipleStates">Select States</Label>
                                <Input type="select" name="selectedState" id="exampleSelectMulti" multiple style={{height: '170px'}} onChange={this.handleStateSelect.bind(this)}>
                                    {this.state.states.map((item, key) => {
                                        return <option key={key} value={item} id={item}>{item}</option>
                                    })}
                                </Input>
                            </FormGroup>
                            <Container>

                                <Row>
                                    {/** CITY SELECT */}
                                    <FormGroup style={{display: 'block', margin: 20, marginTop: 0, width: 200}}>
                                        <Label for="selectCity">Select City</Label>
                                        <Input placeholder="City" type="select" name="selectedCity" id="exampleSelect" style={{height: 'auto'}} onChange={this.handleSelectCityCode.bind(this)}>
                                            {this.state.city.map((item, key) => {
                                                return <option key={key} value={item} id={item}>{item}</option>
                                            })}
                                        </Input>
                                    </FormGroup>
                                </Row>

                                <Row>
                                    {/** POSTAL CODE SELECT */}
                                    <FormGroup style={{display: 'block', margin: 20, marginTop: 0, width: 200}}>
                                        <Label for="selectPostcalCode">Select Postal Code</Label>
                                        <Input placeholder="Postal Code" type="select" name="selectedPostalCode" id="exampleSelect" style={{height: 'auto'}} onChange={this.handleSelectPostalCode.bind(this)}>
                                            {this.state.postalCodes.map((item, key) => {
                                                return <option key={key} value={item} id={item}>{item}</option>
                                            })}
                                        </Input>
                                    </FormGroup>
                                </Row>

                                <Button color="success" style={{width: '100%'}} onClick={this.handleSearchBusiness.bind(this)}>Search</Button>
                            </Container>
                        </Form>

                        <div style={{
                            width: "600px", 
                            height: "600px",
                            backgroundColor: "whitesmoke", 
                            border: "1px solid transparent",
                            borderRadius: 10,
                            color: "black",
                            padding: 5,
                            display: "inline-block"
                        }}>

                            {/* {JSON.stringify(this.state.selectedCity)} */}
                            {/* {JSON.stringify(this.state.selectedState)} */}
                            {/* {JSON.stringify(this.state.bizQuery)} */}
                            {/* {JSON.stringify(this.state.city)} */}
                            {/* {JSON.stringify(this.state.postalCodes)} */}

                            <Table data={this.state.bizQuery} isLoading={this.state.isLoading}/>
                        </div>
                    </Row>

                </Container>
            </div>

        );
    }

}

export default Yelp;