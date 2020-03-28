import React, { Component } from "react";
import Filters from "./Filters";
import Table from "./Table";
import { Button, Form, FormGroup, Label, Input, FormText, Container, Row } from "reactstrap";
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
            states: [],
            cities: {},
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
            // this.setState({states: [...myJSON]})
        })
        .catch( err => {
            console.log(err);
        })

    }

    handleSelect = (e) => {
        e.preventDefault();
        if (e.target.name === "selectedState"){
            // new state was selected so repopulate the available cities
            let states = []
            for (let i = 0; i < e.target.selectedOptions.length; i++){
                states.push(e.target.selectedOptions[i]["value"]);
            }
            this.setState({
                selectedState: states,
                selectedCity: null, 
                cities: {}
            }, () => {
                this.handleFetchRequest();
            });
            
        }
        else{
            this.setState({ [e.target.name]: e.target.value }, () =>{
                this.handleFetchRequest();
            });
        }

    }

    handleFetchRequest() {
        this.setState({ isLoading: true });
        if (this.state.selectedCity !== null)
        {
            url += "?state=" + this.state.selectedState + "&city=" + this.state.selectedCity;
        }

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
            // unpack the arre of JSON into bizQuery
            this.setState({bizQuery: [...myJSON]}, () => {
                // if cities is empty then populate the cities 
                if (isEmpty(this.state.cities)){
                    var citiesArray = {}
                    for (let i = 0; i < this.state.bizQuery.length; i++){
                        Object.keys(this.state.bizQuery[i]).forEach((key) => {
                            if (key === "city"){
                                citiesArray[this.state.bizQuery[i][key]] = i;
                            }
                        })
                    }
                    this.setState({cities: citiesArray});
                }
                console.log(this.state.bizQuery);
            })

            this.setState({ isLoading: false });
        })
        .catch(err => {
            console.log(err);
        })
    }
    

    render(){

        return(
            <div>
                <Container>
                    <Row>

                        {/**STATE MULTI-SELECT */}
                        <Form>
                            <FormGroup style={{display: 'inline-block', margin: 20, marginTop: 0, width: 200}}>
                                <Label for="selectMultipleStates">Select States</Label>
                                <Input type="select" name="selectedState" id="exampleSelectMulti" multiple style={{height: 200}} onChange={this.handleSelect.bind(this)}>
                                    {this.state.states.map((item, key) => {
                                        return <option key={key} value={item} id={item}>{item}</option>
                                    })}
                                </Input>
                            </FormGroup>
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
                            {/* {JSON.stringify(this.state.cities)} */}
                            

                            <div style={{backgroundColor: "eggshell", padding: 10}}>
                                <Form>

                                    <FormGroup>
                                        <Label for="stateSelect">City</Label>
                                        <div style={{height: "100px", width: "100%", overflow: "scroll", backgroundColor:"eggshell", border: "1px solid black", borderRadius: 10}}>
                                            {this.state.isLoading 
                                                ? "...Loading" 
                                                : isEmpty(this.state.cities) 
                                                    ? "No Cities Found"
                                                    : Object.keys(this.state.cities).map( key => 
                                                        <button style={{
                                                            height: "30px",
                                                            width: "100%",
                                                            backgroundColor: "whitesmoke",
                                                            borderTop: "none",
                                                            borderBottom: "1px solid black",
                                                            fontSize: "18px",
                                                            textAlign: "left",
                                                            margin: "none",
                                                            padding: "none",
                                                        }}
                                                        name="selectedCity"
                                                        value={key}
                                                        onClick={this.handleSelect.bind(this)}
                                                        >
                                                            {key}
                                                        </button>
                                                        //<div style={{ height: "30px", width: "100%",color: "black"}}>{key} {console.log(key)}</div>
                                                    )}
                                        </div>
                                    </FormGroup>
                                </Form>
                            </div>

                            <Table data={this.state.bizQuery} isLoading={this.state.isLoading}/>
                        </div>
                    </Row>

                </Container>
            </div>

        );
    }

}

export default Yelp;