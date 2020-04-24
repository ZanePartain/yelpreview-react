import {createStore, combineReducers, applyMiddleware} from 'redux';
import bizReducer from './reducers/biz.reducer';
import userReducer from "./reducers/user.reducer";
import thunk from 'redux-thunk';

// Creating the redux store for managing application state
// export const history = createBrowserHistory();
const allReducers = combineReducers(
    {
        biz: bizReducer,
        user: userReducer
    }
);

// create store and enable Redux DevTools Chrome extension
const store = createStore(
    allReducers,
    [window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()],
    applyMiddleware(thunk)
);

export default store;  
