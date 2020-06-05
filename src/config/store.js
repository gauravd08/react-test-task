  
import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import reducers from './rootReducer';
import thunk from 'redux-thunk';

const composedMiddlewares = applyMiddleware(thunk);
  

const storeEnhancers = composeWithDevTools({
    name: "test"
  })(composedMiddlewares);

const makeStore = createStore(reducers, storeEnhancers);

export default makeStore;