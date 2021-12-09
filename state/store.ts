import { createStore, applyMiddleware } from "redux";
import { createWrapper } from 'next-redux-wrapper';
import reducers from "./index";
import thunk from "redux-thunk";
import { persistStore, persistReducer } from 'redux-persist'
import storage from './sync_storage'
//import storage from 'redux-persist/lib/storage'

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

// const defaultRootState: RootState = {
//   data: {
//     rawdata: [],
//     count: {},
//     averages: {}
//   }
// }

let reduxStore: any

const makeStore = ({ isServer }: { isServer?: any }) => {

  if (isServer) {
    reduxStore = createStore(reducers, applyMiddleware(thunk))
    return reduxStore
  } else {
    const persistConfig = {
      key: 'trace',
      storage
    }

    const persistedReducer = persistReducer(persistConfig, reducers)

    reduxStore = createStore(
      persistedReducer,
      applyMiddleware(thunk)
    )

    reduxStore.__persistor = persistStore(reduxStore);

    return reduxStore
  }

}

export const wrapper = createWrapper(makeStore as any)

export type AppDispatch = typeof reduxStore.dispatch