import React, { Component }from 'react';
import logo from './logo.svg';
import './App.css';
import Yelp  from './components/bizpage/Yelp';
import UserPage from './components/user_page/UserPage';
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
    };
  }


  render(){
    return (
      <Router>
        <MyNav />
        <div className="App-header">
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
