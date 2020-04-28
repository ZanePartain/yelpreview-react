import {createStore, combineReducers, applyMiddleware} from 'redux';
import bizReducer from './reducers/biz.reducer';
import userReducer from './reducers/user.reducer';
import {composeWithDevTools} from "redux-devtools-extension";
import thunk from 'redux-thunk';


// Creating the redux store for managing application state
// export const history = createBrowserHistory();
const allReducers = combineReducers(
  {
    biz: bizReducer,
    user: userReducer,
  }
);

// create store and enable Redux DevTools Chrome extension
const store = createStore(
  allReducers,
  composeWithDevTools(
      applyMiddleware(thunk)
  )
);

export default store;  
