import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import rootReducer from '../rootReducer/rootReducer';

const initialState = {};
const middleWare = [thunk];

export default () => { 
    const store = createStore(
        rootReducer, initialState, composeWithDevTools(applyMiddleware(...middleWare))
    );
    return store;
};