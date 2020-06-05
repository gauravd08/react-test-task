  
import { combineReducers } from "redux";
import TagReducer from "../modules/tags/reducer";
const reducers = combineReducers({
  tags: TagReducer
});

export default reducers;