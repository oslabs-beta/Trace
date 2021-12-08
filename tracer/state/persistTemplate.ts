import { createStore } from 'redux'
import { persistStore, persistReducer } from 'redux-persist' // need to install new dependency
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';
import rootReducer from './reducers/dataReducer'
 
const persistConfig = {
  key: 'root',
  storage,
  stateReconciler: autoMergeLevel2
}
 
const persistedReducer = persistReducer(persistConfig, rootReducer)
 
export default () => {
  let store = createStore(persistedReducer)
  let persistor = persistStore(store)
  return { store, persistor }
}