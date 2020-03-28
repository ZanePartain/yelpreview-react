import React, { Component }from 'react';
import logo from './logo.svg';
import './App.css';
import Yelp  from './components/Yelp';
import { Col, Button, Form, FormGroup, Label, Input, FormText, Container, Row } from 'reactstrap';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      name: 'Zane',
      isTrue: false,
      states: ['AK', 'AL', 'AR', 'AZ', 'CA', 'CO', 'CT', 'DE', 'FL', 'GA', 'HI', 'IA', 'ID', 'IL', 'IN', 'KS', 'KY', 'LA', 'MA', 'MD', 'ME', 'MI', 'MN', 'MO', 'MS', 'MT', 'NC', 'ND', 'NE', 'NH', 'NJ', 'NM', 'NV', 'NY', 'OH', 'OK', 'OR', 'PA', 'RI', 'SC', 'SD', 'TN', 'TX', 'UT', 'VA', 'VT', 'WA', 'WI', 'WV', 'WY'],
    };
  }

  toggleIsTrue = (e) =>{
    e.preventDefault();
    this.setState({ isTrue: !this.state.isTrue })
  }

  render(){
    return (
      <div className="App" style={{color: 'black'}}>
        <header className="App-header">
          <Container>
            <Row>
                <Yelp isTrue={this.state.isTrue} toggleBool={this.toggleIsTrue.bind(this)}/>
            </Row>
          </Container>
        </header>
      </div>
    );
  }
}

export default App;
