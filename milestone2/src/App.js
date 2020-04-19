import React, { Component }from 'react';
import logo from './logo.svg';
import './App.css';
import Yelp  from './components/Yelp';
import UserPage from './components/UserPage';
import MyNav from './components/Navbar';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      states: ['AK', 'AL', 'AR', 'AZ', 'CA', 'CO', 'CT', 'DE', 'FL', 'GA', 'HI', 'IA', 'ID', 'IL', 'IN', 'KS', 'KY', 'LA', 'MA', 'MD', 'ME', 'MI', 'MN', 'MO', 'MS', 'MT', 'NC', 'ND', 'NE', 'NH', 'NJ', 'NM', 'NV', 'NY', 'OH', 'OK', 'OR', 'PA', 'RI', 'SC', 'SD', 'TN', 'TX', 'UT', 'VA', 'VT', 'WA', 'WI', 'WV', 'WY'],
    };
  }


  render(){
    return (
      <Router>
        <MyNav />
        <div className="App" style={{color: 'black'}}>
        <Switch>
          <Route exact path="/" component={Yelp}/>
          <Route exact path="/user" component={UserPage}/>
        </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
