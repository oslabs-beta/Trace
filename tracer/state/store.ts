import { createStore, applyMiddleware } from "redux";
import reducers from "./index";
import thunk from "redux-thunk";

// persist redux state using local storage
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
// for shallow merging two levels
// import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2'

const persistConfig = {
  key: 'root',
  storage,
  // stateReconciler: autoMergeLevel2,
}

const persistedReducer = persistReducer(persistConfig, reducers);


export type RootState = {
  data: Data
}

interface Data {
  rawdata: [];
  count: Count;
  averages: Averages;
}

interface Count {
  [key: string]: []
}

interface Averages {
  [key: string]: number
}

const defaultRootState: RootState = {
  data: {
    rawdata: [],
    count: {},
    averages: {}
  }
}
 
export const preStore = createStore(
  persistedReducer,
  defaultRootState,
  applyMiddleware(thunk)
);

const persistedStore = () => {
  let store = preStore;
  let persistor = persistStore(store);
  return { store, persistor };
}

export default persistedStore

export type AppDispatch = typeof preStore.dispatch