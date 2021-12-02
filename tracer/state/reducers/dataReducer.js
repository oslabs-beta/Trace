import * as types from '../constants/actionTypes'

const initialState = {
  rawdata: {},
  averages: {},
  count: {}
}

const dataReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.UPDATE_DATA:
      const newData = action.payload;
      console.log('1. data reducer', newData);
      const stateClone = {...state};
      console.log('2. original state: ', stateClone)

      const newRawData = newData.formattedData;
      // see which keys are new and which already exist in state.rawdata
      for (let key in newRawData) {
        if (state.rawdata[key] === undefined) {
          stateClone.rawdata[key] = newRawData[key];
        } else {
          stateClone.rawdata[key].concat(newRawData[key]);
        }
      }

      console.log('3. new state after rawdata', stateClone);

      // new count
      for (let key in newData.count) {
        if (!stateClone.count[key]) stateClone.count[key] = 0;
        stateClone.count[key] += newData.count[key];
      }

      console.log('4. new state after count', stateClone);
      
      // new averages
      for (let key in newData.average) {
        const newAverage = newData.average[key];
        const newCount = newData.count[key];
        const oldAverage = state.averages[key] ? stateClone.averages[key] : 0;
        const oldCount = state.count[key] ? state.count[key] : 0;
        
        const newStateAverage = ((oldAverage * oldCount) + (newAverage * newCount)) / newCount;

        stateClone.averages[key] = newStateAverage;
      }

      console.log('5. new state after averages', stateClone);
      return stateClone;

    case types.DELETE_DATA:
      return initialState;
    
    default:
      return state;
  }
};

export default dataReducer;