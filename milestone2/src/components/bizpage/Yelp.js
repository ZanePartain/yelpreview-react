import React, { Component } from "react";
import Table from "./Table";
import { Button, Form, FormGroup, Label, Input, FormText, Container, Row, Col } from "reactstrap";

// REDUX ACTIONS AND CONNECT IMPORTS
import { setBiz } from '../../redux/reducers/biz.reducer';
import { connect } from 'react-redux';

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
            category: [],
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

    handleCategorySelect = (e) => {
        e.preventDefault();
        let cats = []
        for (let i = 0; i < e.target.selectedOptions.length; i++){
            cats.push(e.target.selectedOptions[i]["value"]);
        }
        console.log('selected cats', cats);

        let newurl = url;
        newurl += '/categoryFilter';
        console.log(newurl);
        
        fetch(newurl, {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({"categories": cats, "postalCode": this.state.selectedPostalCode})
        })
        .then(response => {
            return response.json();
        })
        .then( myJSON => {
            // unpack the businesses that abide by the category filters
            console.log('CAT FILTER BIZ', myJSON)
            this.setState({ bizQuery: myJSON }, () => {

                /** HERE I AM DISPATCHING THE ACTION 'SETBIZ'
                 * AND I AM PASSING IN THE NEW bizQuery ARRAY */

                 // NOTE: I am only doing it in as an async func rn,
                 //       because I do not want to affect any of the
                 //       existing logic regarding 'bizQuery'.
                this.props.handleSetBiz(this.state.bizQuery);
            });
        })
        .catch(err => {
            console.log(err);
        })
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
            newUrl += "/postalCodesInCity/" + this.state.selectedCity;
    
            fetch(newUrl, {
                method: "GET",
            })
            .then( resp => {
                return resp.json();
            })
            .then( myJSON => {
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

    handleCityFetchReq() {
        this.setState({ isLoading: true });

        fetch(url + '/byStates', {
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

    businessFetchReq() {
        let newUrl = url;
        newUrl += '/inPostalCode/' + this.state.selectedPostalCode;
        
        fetch(newUrl, {
            method: "GET",
        })
        .then( resp => {
            return resp.json();
        })
        .then( myJSON => {
            this.setState({ bizQuery: myJSON }, () => {
                /** HERE I AM DISPATCHING THE ACTION 'SETBIZ'
                 * AND I AM PASSING IN THE NEW bizQuery ARRAY */

                 // NOTE: I am only doing it in as an async func rn,
                 //       because I do not want to affect any of the
                 //       existing logic regarding 'bizQuery'.
                this.props.handleSetBiz(this.state.bizQuery);
            });
        })
        .catch(err =>{
            console.log(err);
        });

    }
    
    handleSearchBusiness = (e) =>{
        this.setState({category: []})
        e.preventDefault();
        if (this.state.postalCodes.length == 1){
            this.setState({selectedPostalCode: this.state.postalCodes[0]}, ()=>{
                // TODO handle fetch for business in the area.
                this.businessFetchReq();
                this.handleBusinessCategoryFetchReq();

            });
        }
        if (this.state.postalCodes == null){
            // TODO grab DOM element postal select
        }
        this.businessFetchReq();
        this.handleBusinessCategoryFetchReq();

    }

    handleBusinessCategoryFetchReq() {
        let newUrl = 'http://localhost:3000/category/byPostalCode/' + this.state.selectedPostalCode;
        console.log('BUSINESS CATEGORY FETCH REQ', this.state.selectedPostalCode);
        console.log(newUrl);
        
        fetch(newUrl, {
            method: "GET",
        })
        .then( resp => {
            return resp.json();
        })
        .then( myJSON => {
            console.log("CATEGORY", myJSON);
            let cats = []
            for (let i = 0; i < myJSON.length; i++){
                cats.push(myJSON[i]['type']);
            }
            this.setState({ category: cats });
        })
        .catch(err =>{
            console.log(err);
        });
    }

    handleClearCategory = (e) =>{
        e.preventDefault();
        this.setState({category: []}, () => {
            this.businessFetchReq();
            this.handleBusinessCategoryFetchReq();
        });
    }

    render(){
        return(
            <div style={{marginTop: "5%"}}>
                <Container>
                    <Row>
                        <Col>
                        <Form>
                            <Container style={{width: '500px'}}>
                                <Row>
                                    <Col>
                                        <Row>
                                            {/** STATE MULTI-SELECT */}
                                            <FormGroup style={{display: 'inline-block', margin: 20, marginTop: 0, width: 200}}>
                                                <Label for="selectMultipleStates">Select States</Label>
                                                <Input type="select" name="selectedState" id="exampleSelectMulti" multiple style={{height: '170px'}} onChange={this.handleStateSelect.bind(this)}>
                                                    {this.state.states.map((item, key) => {
                                                        return <option key={key} value={item} id={item}>{item}</option>
                                                    })}
                                                </Input>
                                            </FormGroup>
                                        </Row>

                                        <Row>
                                            {/** CITY SELECT */}
                                            <FormGroup style={{display: 'block', margin: 20, marginTop: 0, width: '100%'}}>
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
                                            <FormGroup style={{display: 'block', margin: 20, marginTop: 0, width: '100%'}}>
                                                <Label for="selectPostcalCode">Select Postal Code</Label>
                                                <Input placeholder="Postal Code" type="select" name="selectedPostalCode" id="exampleSelect" style={{height: 'auto'}} onChange={this.handleSelectPostalCode.bind(this)}>
                                                    {this.state.postalCodes.map((item, key) => {
                                                        return <option key={key} value={item} id={item}>{item}</option>
                                                    })}
                                                </Input>
                                            </FormGroup>
                                        </Row>
                                    </Col>
                                    <Col>
                                        <Row>
                                            {/** CATEGORY MULTI-SELECT */}
                                            <FormGroup style={{display: 'inline-block', margin: 20, marginTop: 0, width: 200}}>
                                                <Label for="selectMultipleCategories">Select Category</Label>
                                                <Input type="select" name="selectedCategories" id="exampleSelectMulti" multiple style={{height: '170px'}} onChange={this.handleCategorySelect.bind(this)}>
                                                    {this.state.category.map((item, key) => {
                                                        return <option key={key} value={item} id={item}>{item}</option>
                                                    })}
                                                </Input>
                                               
                                            </FormGroup>
                                        </Row>
                                        <Row>
                                            <Col style={{ width: "100%"}}>
                                                    <Button color="info" style={{width: '100%', height: 30, padding: 0}} onClick={this.handleClearCategory.bind(this)}>Clear Filter</Button>
                                            </Col>
                                        </Row>
                                    </Col>
                                    <Col>
                                        <Button color="success" style={{width: '45%'}} onClick={this.handleSearchBusiness.bind(this)}>Search</Button>
                                    </Col>
                                </Row>
                            </Container>
                        </Form>
                        </Col>

                        <Col>
                            <Container style={{width: '100%'}}>
                                <div style={{
                                    width: "inherit",
                                    height: "600px",
                                    backgroundColor: "whitesmoke", 
                                    border: "1px solid transparent",
                                    borderRadius: 5,
                                    color: "black",
                                    padding: 5,
                                    display: "inline-block",
                                    overflow: "scroll"
                                }}>

                                    {/* {JSON.stringify(this.state.selectedCity)} */}
                                    {/* {JSON.stringify(this.state.selectedState)} */}
                                    {/* {JSON.stringify(this.state.bizQuery)} */}
                                    {/* {JSON.stringify(this.state.city)} */}
                                    {/* {JSON.stringify(this.state.postalCodes)} */}
                                    {/* {JSON.stringify(this.state.category)} */}

                                    <Table data={this.state.bizQuery} isLoading={this.state.isLoading}/>
                                </div>
                            </Container>
                        </Col>
                    </Row>
                </Container>
            </div>

        );
    }

}

/** HOW TO CONNECT A COMPONENT TO THE STORE */
// Mapping store state to component props
//
// Each coponent can have properties passed to them from a parent
// component. The child component can then access those properties,
// through the 'this.state.props' variable. What we are doing below
// is mapping the BizState reducer attribute 'biz []' to a property
// named 'biz'. So this component will be able to use the biz[] in 
// store (inside the biz reducer) through 'this.state.props.biz'
const mapStateToProps = (state) => {
    return {
        biz: state.biz.biz,
    };
};

// Mapping dispatch actions to component props
//
// Again we are now passing actions to be dispatched
// as properties this time. The action setBiz which is
// defined in the biz.reducer, will be passed in as a
// property named 'handleSetBiz'. This method takes in
// business, and then the business [] get sent as the
// payload to the reducer. The reducer will then handle 
// mutating state.
const mapDispatchToProps = (dispatch) => {
    return {
        handleSetBiz: (newBiz) => dispatch(setBiz(newBiz)),
    };
}

// We now have to connect our props to the component.
export default connect(mapStateToProps, mapDispatchToProps)(Yelp);