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
      /*
      {
        formattedData,
        count,
        average
      }
      */
      const stateClone = {...state};

      const newRawData = newData.formattedData;
      // see which keys are new and which already exist in state.rawdata
      for (let key in newRawData) {
        if (state.rawdata[key] === undefined) {
          stateClone.rawdata[key] = newRawData[key];
        } else {
          stateClone.rawdata[key].push(newRawData[key]);
        }
      }

      // new count
      for (let key in newData.count) {
        if (!stateClone.count[key]) stateClone.count[key] = 0;
        stateClone.count[key] += newData.count[key];
      }
      
      // new averages
      console.log('newData: ', newData);
      for (let key in newData.average) {
        const newAverage = newData.average[key];
        const newCount = newData.count[key];
        const oldAverage = stateClone.averages[key] ? stateClone.averages[key] : 0;
        const oldCount = state.count[key] ? state.count[key] : 0;
        
        const newStateAverage = ((oldAverage * oldCount) + (newAverage * newCount)) / newCount;

        stateClone.averages[key] = newStateAverage;
      }
      console.log('stateClone: ', stateClone)
      return stateClone;


    case types.DELETE_DATA:
      return initialState;
    
    default:
        return state;
  }
};

export default dataReducer;