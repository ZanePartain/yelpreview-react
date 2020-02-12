import React, { Component }from 'react';
import logo from './logo.svg';
import './App.css';
import Yelp  from './components/Yelp';
import { Button } from 'reactstrap';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      name: 'Zane',
      isTrue: false,
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
          <Yelp isTrue={this.state.isTrue} toggleBool={this.toggleIsTrue.bind(this)}/>
          <Button onClick={this.toggleIsTrue.bind(this)}>
            change is True
          </Button>
        </header>
      </div>
    );
  }
}

export default App;
