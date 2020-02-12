import React, { Component }from 'react';
import logo from './logo.svg';
import './App.css';
import Yelp  from './components/Yelp';

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

        <Yelp isTrue={this.state.isTrue} toggleBool={this.toggleIsTrue.bind(this)}/>
        <button onClick={this.toggleIsTrue.bind(this)}>
          change is True
        </button>

        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
      </div>
    );
  }
}

export default App;
