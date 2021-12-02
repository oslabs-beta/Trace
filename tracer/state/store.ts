import { createStore, applyMiddleware } from "redux";
import reducers from "./index";
import thunk from "redux-thunk";

export type RootState = {
  data: Data
}

interface Data {
  rawdata: RawData;
  count: Count;
  averages: Averages;
}

interface RawData {
  [key: string]: Object[]
}

interface Count {
  [key: string]: []
}

interface Averages {
  [key: string]: number
}

const defaultRootState: RootState = {
  data: {
    rawdata: {},
    count: {},
    averages: {}
  }
}
 
export const store = createStore(
  reducers,
  defaultRootState,
  applyMiddleware(thunk)
);

export type AppDispatch = typeof store.dispatch