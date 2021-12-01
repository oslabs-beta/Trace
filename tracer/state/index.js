import { combineReducers } from "redux";
import dataReducer from './reducers/dataReducer';

const reducers = combineReducers({
  data: dataReducer
});

export default reducers;