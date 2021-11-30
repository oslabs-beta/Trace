import { createStore, applyMiddleware } from "redux";
import reducers from "./index";
import thunk from "react-redux";
 
export const store = createStore(
  reducers,
  {},
  applyMiddleware(thunk)
);
