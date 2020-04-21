import React, { Component }from 'react';
import logo from './logo.svg';
import './App.css';
import Yelp  from './components/bizpage/Yelp';
import UserPage from './components/UserPage';
import MyNav from './components/Navbar';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import { connect } from 'react-redux';

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
        {JSON.stringify(this.props.biz)}
      </Router>
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
  };
  // this.props.handleSetBiz(newBiz[])
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
